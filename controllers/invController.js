const { body, validation, matchedData, validationResult } = require('express-validator');
const db = require('../db/queries');

const lengthError = ' must be between 1 and 255 characters!';

const validateEntry = [
  body('gameName')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(`Game title` + lengthError),
  body('gameDeveloper')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(`Developer name` + lengthError),
  body('gamePublisher')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(`Publisher name` + lengthError),
  body('gameDate').trim().isDate().withMessage(`Release Date must be a valid date!`),
];

async function allGamesGet(req, res) {
  // route: '/'
  // Sample sorted route: '/?sort=DESC&genre=FPS

  const sort = req.query.sort;
  const genre = req.query.genre;
  const genreList = await db.getAllLists('genres');
  const gamesInfo = await db.getAllGames(sort, genre);

  res.render('home', {
    title: 'All Games',
    gamesInfo: gamesInfo,
    genreList: genreList,
    page: `/`,
  });
}

async function studiosListGet(req, res) {
  // route = '/:type/list'
  // sample route = '/developers/list'
  // studios value in link must be either developers or publishers

  const type = req.params.type;
  const studiosList = await db.getAllLists(type);

  res.render('studios', {
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
  const genreList = await db.getAllLists('genres');
  const gamesInfo = await db.getAllGamesByStudio(type, studio, sort, genre);

  res.render('home', {
    title: `All Games from ${studio}`,
    gamesInfo: gamesInfo,
    genreList: genreList,
    page: `/${studio}/${type}/games`,
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

async function newGameGet(req, res) {
  // route = '/new'
  const genreList = await db.getAllLists('genres');

  res.render('createForm', {
    title: 'New Game Entry ',
    genreList: genreList,
  });
}

const newGamePost = [
  // route = '/new'

  validateEntry,
  async (req, res) => {
    const errors = validationResult(req);
    const genreName = req.body.genre;
    const genreId = req.body[genreName];
    const genreList = await db.getAllLists('genres');

    if (!errors.isEmpty()) {
      return res.status(404).render('createForm', {
        title: 'New Game Entry ',
        genreList: genreList,
        errors: errors.array(),
      });
    }

    const { gameName, gameDate, gameDeveloper, gamePublisher } = matchedData(req);
    const nameDuplicate = await db.searchItemByName('name', 'games', gameName);
    const devDuplicate = await db.searchItemByName('name', 'developers', gameDeveloper);
    const pubDuplicate = await db.searchItemByName('name', 'publishers', gamePublisher);

    if (nameDuplicate) {
      return res.status(404).render('createForm', {
        title: 'New Game Entry',
        genreList: genreList,
        errors: [{ msg: 'Game already exists! Please use another name' }],
      });
    }
    await db.postNewGame(
      gameName,
      gameDate,
      genreId,
      gameDeveloper,
      gamePublisher,
      devDuplicate,
      pubDuplicate,
    );
    res.redirect('/');
  },
];

async function gameUpdateGet(req, res) {
  // route = '/:gameId/update'

  const gameId = req.params.gameId;
  const game = await db.getGameById(gameId);
  const genreList = await db.getAllLists('genres');

  res.render('updateForm', {
    title: 'Edit Game Entry',
    game: game,
    genreList: genreList,
  });
}

const updateGamePost = [
  // route = '/:gameId/update'

  validateEntry,
  async (req, res) => {
    const errors = validationResult(req);
    const gameId = req.body.gameId;
    const genreName = req.body.genre;
    const genreId = req.body[genreName];
    const game = await db.getGameById(gameId);
    const genreList = await db.getAllLists('genres');

    if (!errors.isEmpty()) {
      return res.status(404).render('updateForm', {
        title: 'Edit Game Entry',
        game: game,
        genreList: genreList,
        errors: errors.array(),
      });
    }

    const { gameName, gameDate, gameDeveloper, gamePublisher } = matchedData(req);
    const nameDuplicate = await db.updateNameCheck('games', gameName, gameId);
    const devDuplicate = await db.searchItemByName('name', 'developers', gameDeveloper);
    const pubDuplicate = await db.searchItemByName('name', 'publishers', gamePublisher);

    if (nameDuplicate) {
      return res.status(404).render('updateForm', {
        title: 'Edit Game Entry',
        game: game,
        genreList: genreList,
        errors: [{ msg: 'Game already exists! Please use another name' }],
      });
    }

    await db.updateGamePost(
      gameId,
      gameName,
      gameDate,
      genreId,
      gameDeveloper,
      gamePublisher,
      devDuplicate,
      pubDuplicate,
    );
    res.redirect('/');
  },
];

async function deleteGameGet(req, res) {
  const gameId = req.params.gameId;
  await db.deleteGame(gameId);
  res.redirect('/');
}

module.exports = {
  allGamesGet,
  studiosListGet,
  allGamesByStudioGet,
  gameDetailsGet,
  newGameGet,
  newGamePost,
  gameUpdateGet,
  updateGamePost,
  deleteGameGet,
};
