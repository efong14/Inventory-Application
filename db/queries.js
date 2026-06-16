const pool = require('./pool');
// Place Game title and release in same table but Developer and Publisher in their own tables

exports.getAllGenres = async () => {
  const { rows } = await pool.query('SELECT name FROM genres');
  return rows;
};

exports.getAllStudios = async (type) => {
  const { rows } = await pool.query(`SELECT name FROM ${type}`);
};

exports.getAllGames = async (sort, genre) => {
  if (!sort) {
    const { rows } = await pool.query(
      `SELECT games.name, games.date, genres.name, developers.name, publishes.name FROM games JOIN game_genre ON games.id = game_genre.gameId JOIN genres ON game_genre.gameId = genres.id JOIN game_developer ON games.id = game_developer.gameId JOIN developers ON game_developers.developerId = developers.id JOIN game_publisher ON games.id = game_publisher.gameId JOIN publishers ON game_publisher.publisherId = publishers.id ORDER BY games.date ASC`,
    );
    return rows;
  } else if (!genre) {
    const { rows } = await pool.query(
      `SELECT games.name, games.date, genres.name, developers.name, publishes.name FROM games JOIN game_genre ON games.id = game_genre.gameId JOIN genres ON game_genre.gameId = genres.id JOIN game_developer ON games.id = game_developer.gameId JOIN developers ON game_developers.developerId = developers.id JOIN game_publisher ON games.id = game_publisher.gameId JOIN publishers ON game_publisher.publisherId = publishers.id ORDER BY games.date ${sort}`,
    );
    return rows;
  } else {
    const { rows } = await pool.query(
      `SELECT games.name, games.date, genres.name, developers.name, publishes.name FROM games JOIN game_genre ON games.id = game_genre.gameId JOIN genres ON game_genre.gameId = genres.id JOIN game_developer ON games.id = game_developer.gameId JOIN developers ON game_developers.developerId = developers.id JOIN game_publisher ON games.id = game_publisher.gameId JOIN publishers ON game_publisher.publisherId = publishers.id WHERE genre.name = '${genre}' ORDER BY games.date ${sort}`,
    );
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

exports.getAllGamesByStudio = async (type, studio, sort, genre) => {
  if (!sort) {
    const { rows } = await pool.query(
      `SELECT games.name, games.date, genres.name, developers.name, publishes.name FROM games JOIN game_genre ON games.id = game_genre.gameId JOIN genres ON game_genre.gameId = genres.id JOIN game_developer ON games.id = game_developer.gameId JOIN developers ON game_developers.developerId = developers.id JOIN game_publisher ON games.id = game_publisher.gameId JOIN publishers ON game_publisher.publisherId = publishers.id WHERE ${type}.name = '${studio}' ORDER BY games.date ASC`,
    );
    return rows;
  } else if (!genre) {
    const { rows } = await pool.query(
      `SELECT games.name, games.date, genres.name, developers.name, publishes.name FROM games JOIN game_genre ON games.id = game_genre.gameId JOIN genres ON game_genre.gameId = genres.id JOIN game_developer ON games.id = game_developer.gameId JOIN developers ON game_developers.developerId = developers.id JOIN game_publisher ON games.id = game_publisher.gameId JOIN publishers ON game_publisher.publisherId = publishers.id WHERE ${type}.name = '${studio}' ORDER BY games.date ${sort}`,
    );
    return rows;
  } else {
    const { rows } = await pool.query(
      `SELECT games.name, games.date, genres.name, developers.name, publishes.name FROM games JOIN game_genre ON games.id = game_genre.gameId JOIN genres ON game_genre.gameId = genres.id JOIN game_developer ON games.id = game_developer.gameId JOIN developers ON game_developers.developerId = developers.id JOIN game_publisher ON games.id = game_publisher.gameId JOIN publishers ON game_publisher.publisherId = publishers.id WHERE ${type}.name = '${studio}' AND genre.name = '${genre}' ORDER BY games.date ${sort}`,
    );
    return rows;
  }
};
