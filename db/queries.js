const pool = require('./pool');
const fullGameInfo = `SELECT games.id AS id, games.name AS name, games.date AS date, genres.name AS genre, developers.name AS developer, publishers.name AS publisher, developers.id AS developerId, publishers.id AS publisherId, genres.id AS genreId FROM games JOIN game_genre ON games.id = game_genre.gameId JOIN genres ON game_genre.gameId = genres.id JOIN game_developer ON games.id = game_developer.gameId JOIN developers ON game_developers.developerId = developers.id JOIN game_publisher ON games.id = game_publisher.gameId JOIN publishers ON game_publisher.publisherId = publishers.id`;

exports.getAllLists = async (type) => {
  const { rows } = await pool.query(`SELECT id, name FROM ${type}`);
  return rows;
};

exports.getAllGames = async (sort, genre) => {
  if (!sort) {
    const { rows } = await pool.query(fullGameInfo + ` ORDER BY games.date ASC;`);
    return rows;
  } else if (!genre) {
    const { rows } = await pool.query(fullGameInfo + ` ORDER BY games.date ${sort};`);
    return rows;
  } else {
    const genres = Array.isArray(genre) ? "'" + genre.join("','") + "'" : genre;
    const { rows } = await pool.query(
      fullGameInfo + ` WHERE genre IN (${genres}) ORDER BY games.date ${sort};`,
    );
    // possible error here due to genres (if array) having an extra "" wrapping the joined string? Also with single genre, check that too
    return rows;
  }
};

// IN CASE THE ABOVE DOES NOT WORK:
// exports.getAllGamesByGenre = async (sort, genre) => {
//   const { rows } = await pool.query(
//     `SELECT games.name, games.date, genres.name, developers.name, publishes.name FROM games JOIN game_genre ON games.id = game_genre.gameId JOIN genres ON game_genre.gameId = genres.id JOIN game_developer ON games.id = game_developer.gameId JOIN developers ON game_developers.developerId = developers.id JOIN game_publisher ON games.id = game_publisher.gameId JOIN publishers ON game_publisher.publisherId = publishers.id WHERE genre.name = ${genre} ORDER BY games.date ${sort}`,
//   );
//   return rows;
// };

// Possible error below from not wrapping ${studio} in ''
exports.getAllGamesByStudio = async (type, studio, sort, genre) => {
  if (!sort) {
    const { rows } = await pool.query(
      fullGameInfo + ` WHERE ${type} = ${studio} ORDER BY games.date ASC;`,
    );
    return rows;
  } else if (!genre) {
    const { rows } = await pool.query(
      fullGameInfo + ` WHERE ${type} = ${studio} ORDER BY games.date ${sort};`,
    );
    return rows;
  } else {
    const genres = Array.isArray(genre) ? "'" + genre.join("','") + "'" : genre;
    const { rows } = await pool.query(
      fullGameInfo +
        ` WHERE ${type}.name = '${search}' AND genre IN (${genres}) ORDER BY games.date ${sort};`,
    );
    return rows;
  }
};

exports.getGameById = async (gameId) => {
  const { rows } = await pool.query(fullGameInfo + ` WHERE games.id = ${gameId};`);
  return rows[0];
};

exports.searchItemByName = async (column, table, name) => {
  const { rows } = await pool.query(`SELECT ${column} FROM $1 WHERE name = $2;`, [table, name]);
  return rows[0];
};

exports.updateNameCheck = async (table, name, id) => {
  const { rows } = await pool.query(`SELECT name FROM $1 WHERE name = $2 AND id = ${id};`, [
    table,
    name,
  ]);
  return rows[0];
};

exports.postNewGame = async (
  gameName,
  gameDate,
  genreId,
  gameDeveloper,
  gamePublisher,
  devDuplicate,
  pubDuplicate,
) => {
  await pool.query(
    `INSERT INTO games (name, date) VALUES ($1, $2);
    INSERT INTO game_genre (gameId, genreId) SELECT id, $3 AS genreId FROM games WHERE name = $1;`,
    [gameName, gameDate, genreId],
  );

  if (!devDuplicate) {
    await pool.query(`INSERT INTO developers (name) VALUES ($1);`, [gameDeveloper]);
  }

  await pool.query(
    `INSERT INTO game_developer (gameId, developerId) SELECT games.id, developers.id FROM games, developers WHERE games.name = $1 AND developers.name = $2;`,
    [gameName, gameDeveloper],
  );

  if (!pubDuplicate) {
    await pool.query(`INSERT INTO publishers (name) VALUES ($1);`, [gamePublisher]);
  }

  await pool.query(
    `INSERT INTO game_developer (gameId, publisherId) SELECT games.id, publishers.id FROM games, publishers WHERE games.name = $1 AND publishers.name = $2;`,
    [gameName, gamePublisher],
  );
};

exports.updateGameGet = async (gameId) => {
  const { rows } = await pool.query(fullGameInfo + ` WHERE games.id = ${gameId};`);
  return rows[0];
};

exports.updateGamePost = async (
  gameId,
  gameName,
  gameDate,
  genreId,
  gameDeveloper,
  gamePublisher,
  devDuplicate,
  pubDuplicate,
) => {
  await pool.query(
    `UPDATE games SET name = $1 WHERE id = ${gameId} AND name != $1;
    UPDATE games SET date = $2 WHERE id = ${gameId} AND date != $2;
    UPDATE game_genre SET genreId = $3 WHERE gameId = ${gameId} AND genreId != $3;`,
    [gameName, gameDate, genreId],
  );

  if (!devDuplicate) {
    await pool.query(`INSERT INTO developers (name) VALUES ($1);`, [gameDeveloper]);
  }

  const newDevId = await pool.query(`SELECT id FROM developers WHERE name = $1`, [gameDeveloper]);

  await pool.query(
    `UPDATE game_developer SET developerId = ${newDevId.rows[0].id} WHERE gameId = ${gameId} AND developerId != ${newDevId.rows[0].id}`,
  );

  if (!pubDuplicate) {
    await pool.query(`INSERT INTO publishers (name) VALUES ($1);`, [gamePublisher]);
  }

  const newPubId = await pool.query(`SELECT id FROM publishers WHERE name  = $1`, [gamePublisher]);

  await pool.query(
    `UPDATE game_publisher SET publisherId = ${newPubId.rows[0].id} WHERE gameId = ${gameId} AND publisherId != ${newPubId.rows[0].id}`,
  );
};

exports.deleteGame = async (gameId) => {
  await pool.query(
    `DELETE FROM games WHERE id = ${gameId};
    DELETE FROM game_genre WHERE gameId = ${gameId};
    DELETE FROM game_developer WHERE gameId = ${gameId};
    DELETE FROM game_publisher WHERE gameId = ${gameId};
    `,
  );
};
