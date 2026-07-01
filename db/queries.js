const pool = require('./pool');
const fullGameInfo = `SELECT games.id, games.name, games.date, genres.name AS genre, developers.name AS developer, publishers.name AS publisher FROM games JOIN game_genre ON games.id = game_genre.gameId JOIN genres ON game_genre.gameId = genres.id JOIN game_developer ON games.id = game_developer.gameId JOIN developers ON game_developers.developerId = developers.id JOIN game_publisher ON games.id = game_publisher.gameId JOIN publishers ON game_publisher.publisherId = publishers.id`;

exports.getAllLists = async (type) => {
  const { rows } = await pool.query(`SELECT name FROM ${type}`);
  return rows;
};

exports.getAllGames = async (sort, genre) => {
  if (!sort) {
    const { rows } = await pool.query(fullGameInfo + ` ORDER BY games.date ASC`);
    return rows;
  } else if (!genre) {
    const { rows } = await pool.query(fullGameInfo + ` ORDER BY games.date ${sort}`);
    return rows;
  } else {
    const genres = Array.isArray(genre) ? "'" + genre.join("','") + "'" : "'" + genre + "'";
    const { rows } = await pool.query(
      fullGameInfo + ` WHERE IN (${genres}) ORDER BY games.date ${sort}`,
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
      fullGameInfo + ` WHERE ${type}.name = ${studio} ORDER BY games.date ASC`,
    );
    return rows;
  } else if (!genre) {
    const { rows } = await pool.query(
      fullGameInfo + ` WHERE ${type}.name = ${studio} ORDER BY games.date ${sort}`,
    );
    return rows;
  } else {
    const { rows } = await pool.query(
      fullGameInfo +
        ` WHERE ${type}.name = '${search}' AND genre.name = ${studio} ORDER BY games.date ${sort}`,
    );
    return rows;
  }
};

exports.getGameById = async (gameId) => {
  const { rows } = await pool.query(fullGameInfo + ` WHERE games.id = ${gameId}`);
  return rows[0];
};

exports.updateGameGet = async (gameId) => {
  const { rows } = await pool.query(fullGameInfo + ` WHERE games.id = ${gameId}`);
  return rows[0];
};
