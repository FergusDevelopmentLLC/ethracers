const router = require('express-promise-router')();
const RacerController = require('../controllers/racer');
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/')
  .get(RacerController.index)
  .post(RacerController.newRacer);

router.route('/:racerid')
  .get(validateParam(schemas.idSchema, 'racerid'), RacerController.getRacer)
  .put([validateParam(schemas.idSchema, 'racerid'),
    validateBody(schemas.racerSchema)],
    RacerController.replaceRacer)
  .patch([validateParam(schemas.idSchema, 'racerid'),
    validateBody(schemas.racerOptionalSchema)],
    RacerController.updateRacer)
  .delete(validateParam(schemas.idSchema, 'racerid'),
    RacerController.deleteRacer);

module.exports = router;
