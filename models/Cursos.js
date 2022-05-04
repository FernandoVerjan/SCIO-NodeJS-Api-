const mongoose = require('mongoose');
//id, nombre, creditos, descripción y número de alumnos subscriptos en el curso.

const CursosModel = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },
    creditos: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    noAlumnos: {
        type: Number,
        required: true,
        default: 0
    }
});

mongoose.model('Cursos', CursosModel);