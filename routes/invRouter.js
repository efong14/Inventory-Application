const { Router } = require('express');
const invRouter = Router();
const invController = require('../controllers/invController');

invRouter.get('/', invController.allGamesGet);
invRouter.get('/:type/list', invController.studiosListGet);
invRouter.get('/:studio/:type/games', invController.allGamesByStudioGet);
invRouter.get('/:gameId/details', invController.gameDetailsGet);
invRouter.get('/new', invController.newGameGet);
invRouter.post('/new', invController.newGamePost);
invRouter.get('/:gameId/update', invController.gameUpdateGet);
invRouter.post('/:gameId/update', invController.updateGamePost);
invRouter.get('/delete');

module.exports = invRouter;
