const router = require('express').Router();
const cursosController = require('../controllers/cursosController');

router.get('/', cursosController.getAll);
router.get('/:id', cursosController.findOne);
router.post('/', cursosController.createCurso);
router.patch('/:id', cursosController.updateCurso);
router.delete('/:id', cursosController.deleteCurso);

module.exports = router;