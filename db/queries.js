const pool = require('./pool');
// Place Game title and release in same table but Developer and Publisher in their own tables

exports.getAllGenres = async () => {
  const { rows } = await pool.query('SELECT name FROM genres');
};

exports.getAllGames = async (sort) => {
  const { rows } = await pool.query(
    `SELECT games.name, games.date, genres.name, developers.name, publishes.name FROM games JOIN game_genre ON games.id = game_genre.gameId JOIN genres ON game_genre.gameId = genres.id JOIN game_developer ON games.id = game_developer.gameId JOIN developers ON game_developers.developerId = developers.id JOIN game_publisher ON games.id = game_publisher.gameId JOIN publishers ON game_publisher.publisherId = publishers.id ORDER BY games.date ${sort}`,
  );
  return rows;
};

exports.getAllGamesByGenre = async (sort, genre) => {
  const { rows } = await pool.query(
    `SELECT games.name, games.date, genres.name, developers.name, publishes.name FROM games JOIN game_genre ON games.id = game_genre.gameId JOIN genres ON game_genre.gameId = genres.id JOIN game_developer ON games.id = game_developer.gameId JOIN developers ON game_developers.developerId = developers.id JOIN game_publisher ON games.id = game_publisher.gameId JOIN publishers ON game_publisher.publisherId = publishers.id WHERE genre.name = ${genre} ORDER BY games.date ${sort}`,
  );
  return rows;
};
