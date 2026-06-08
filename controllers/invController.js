const { body, validation, matchedData, validationResult } = require('express-validator');
const db = require('../db/queries');

const lengthError = 'must be between 1 and 255 characters';

const validateEntry = [
  body(gameName).trim().isLength({ min: 1, max: 255 }).withMessage(`Game title`),
  body(gameDeveloper).trim().isLength({ min: 1, max: 255 }).withMessage(`Game title`),
];

async function allGamesGet(req, res) {
  // route: '/'

  const genreList = await db.SOMETHING();

  if (!req.query) {
    const gamesInfo = await db.SOMETHING('ASC');
  } else if (req.query.sort && req.query.genre) {
    const gamesInfo = await db.SOMETHING(req.query.sort, req.query.genre);
  } else if (req.query.genre) {
    const gamesInfo = await db.SOMETHING('ASC', req.query.genre);
  } else if (req.query.sort) {
    const gamesInfo = await db.SOMETHING(req.query.sort);
  }

  res.render('displayAllGames', {
    title: 'All Games',
    gamesInfo: gamesInfo,
    genreList: genreList,
  });
}

async function studiosListGet(req, res) {
  // route = '/:studios/list'
  // studios value in link must be either Developer or Publisher
  const studios = req.params.creator;
  const studiosList = await db.SOMETHING(studios);

  res.render('displayCategory', {
    title: `All ${studios}`,
    studiosList: studiosList,
  });
}

async function allGamesByStudioGet(req, res) {
  // route =  '/:studio/games'

  const genreList = await db.SOMETHING();
  const studio = req.params.studio;

  if (!req.query) {
    const gamesInfo = await db.SOMETHING(studio, 'ASC');
  } else if (req.query.sort && req.query.genre) {
    const gamesInfo = await db.SOMETHING(studio, req.query.sort, req.query.genre);
  } else if (req.query.genre) {
    const gamesInfo = await db.SOMETHING(studio, 'ASC', req.query.genre);
  } else if (req.query.sort) {
    const gamesInfo = await db.SOMETHING(studio, req.query.sort);
  }

  res.render('displayAllGames', {
    title: 'All Games',
    gamesInfo: gamesInfo,
    genreList: genreList,
  });
}
