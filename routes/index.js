const router = require('express').Router();

const cursoRoutes = require('./cursosRoutes');
router.use('/cursos', cursoRoutes);

module.exports = router;