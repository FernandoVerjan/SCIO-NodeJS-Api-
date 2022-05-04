const mongoose = require('mongoose');
const Curso = mongoose.model('Cursos');


exports.getAll = async function(req, res) {
        try {
            const cursos = await Curso.find()
            return res.json({ cursos });
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

exports.findOne = async function(req, res) {
    const id = req.params.id;
    const cursos = await Curso.findById(id)
    if (!cursos) {
        return res.status(404).json({ err: 'Not found' });
    }

    return res.json({ cursos });    
}

exports.createCurso = function(req, res) {
    const newCurso = new Curso(req.body);

    newCurso.save(function(err, curso) {
        if (err) {
            return res.status(400).json({ err });
        }

        return res.json({ curso });
    });
}

exports.updateCurso = function(req, res) {
    const id = req.params.id;
    const body = req.body;
    Curso.findByIdAndUpdate(id, body, function(err, curso){
        if (err) {
            return res.status(400).json({ err });
        }
        if (!curso) {
            return res.status(404).json({ err: 'Not found' });
        }
        
        return res.json({ curso });
    });
}

exports.deleteCurso = function(req, res) {
    const id = req.params.id;

    
    Curso.findById(id, async function(err, curso) {
            if (err) {
                return res.status(400).json({ err });
            }
            if (!curso) {
                return res.status(404).json({ err: 'Not found' });
            }
            await  Curso.findByIdAndDelete(id)
            return res.json({ message: "Course has been deleted" });
        });
}