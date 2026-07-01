const { Router } = require('express');
const invRouter = Router();
const invController = require('../controllers/invController');

invRouter.get('/', invController.allGamesGet);
invRouter.get('/:type/list', invController.studiosListGet);
invRouter.get('/:studio/:type/games', invController.allGamesByStudioGet);
invRouter.get('/:gameId/details', invController.gameDetailsGet);

module.exports = invRouter;
