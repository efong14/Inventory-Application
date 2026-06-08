const pool = require('./pool');
// Place Game title and release in same table but Developer and Publisher in their own tables
exports.getAllGames = async () => {
  const { rows } = await pool.query('SELECT ');
  return rows;
};
