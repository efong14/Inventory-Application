const { body, validation, matchedData, validationResult } = require('express-validator');
const db = require('../db/queries');

const lengthError = 'must be between 1 and 255 characters';

const validateEntry = [
  body(gameName).trim().isLength({ min: 1, max: 255 }).withMessage(`Game title`),
  body(gameDeveloper).trim().isLength({ min: 1, max: 255 }).withMessage(`Game title`),
];

// IN CASE THE BELOW DOESNT WORK:
// async function allGamesGet(req, res) {
//   // route: '/'
//   // Sample sorted route: '/?sort=DESC&genre=FPS

//   const genreList = await db.getAllGenres();

//   if (!req.query) {
//     const gamesInfo = await db.getAllGames('ASC');
//   } else if (req.query.sort && req.query.genre) {
//     const gamesInfo = await db.getAllGamesByGenre(req.query.sort, req.query.genre);
//   } else if (req.query.genre) {
//     const gamesInfo = await db.getAllGamesByGenre('ASC', req.query.genre);
//   } else if (req.query.sort) {
//     const gamesInfo = await db.getAllGames(req.query.sort);
//   }

//   res.render('displayAllGames', {
//     title: 'All Games',
//     gamesInfo: gamesInfo,
//     genreList: genreList,
//   });
// }

async function allGamesGet(req, res) {
  // route: '/'
  // Sample sorted route: '/?sort=DESC&genre=FPS

  const sort = req.query.sort;
  const genre = req.query.genre;
  const genreList = await db.getAllLists(genre);
  const gamesInfo = await db.getAllGames(sort, genre);

  res.render('displayAllGames', {
    title: 'All Games',
    gamesInfo: gamesInfo,
    genreList: genreList,
  });
}

async function studiosListGet(req, res) {
  // route = '/:type/list'
  // sample route = '/developers/list'
  // studios value in link must be either developers or publishers

  const type = req.params.type;
  const studiosList = await db.getAllStudios(type);

  res.render('displayCategory', {
    title: `All ${type}`,
    type: type,
    studiosList: studiosList,
  });
}

async function allGamesByStudioGet(req, res) {
  // route =  '/:studio/:type/games'
  // sample route: '/Sega/developers/games?&sort=DESC&genre=FPS'

  const studio = req.params.studio;
  const type = req.params.type;
  const sort = req.query.sort;
  const genre = req.query.genre;
  const genreList = await db.getAllGenres(genre);

  const gamesInfo = await db.getAllGamesByGenre(type, studio, sort, genre);

  res.render('displayAllGames', {
    title: `All Games from ${studio}`,
    gamesInfo: gamesInfo,
    genreList: genreList,
  });
}

async function gameDetailsGet(req, res) {
  // route = '/:gameId/details'

  const gameId = req.params.gameId;
  const game = await db.getGameById(gameId);

  res.render('gameDetails', {
    game: game,
  });
}

module.exports = {
  allGamesGet,
  studiosListGet,
  allGamesByStudioGet,
  gameDetailsGet,
};
