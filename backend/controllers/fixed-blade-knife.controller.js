const db = require("../models");
const FixedBladeKnife = db.fixedBladeKnives;
const Op = db.Sequelize.Op; // Operador para realizar consultas mas avanzadas

exports.create = (req, res) => {
    if (!req.body.price || !req.body.code || !req.body.brand || !req.body.photoUrl || !req.body.color) {
        return res.status(400).send({ message: "Content can not be Empty!" });
    }

    const fixedBladeKnife = {
        price: req.body.price,
        code: req.body.code,
        brand: req.body.brand,
        photoUrl: req.body.photoUrl,
        color: req.body.color
    };

    FixedBladeKnife.create(fixedBladeKnife)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the FixedBladeKnife."
            });
        });
};

exports.findAll = (req, res) => {
    FixedBladeKnife.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving FixedBladeKnife."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    FixedBladeKnife.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find FixedBladeKnife with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving FixedBladeKnife with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    FixedBladeKnife.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "FixedBladeKnife was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update FixedBladeKnife with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating FixedBladeKnife with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    FixedBladeKnife.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "FixedBladeKnife was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete FixedBladeKnife with id=${id}. Maybe FixedBladeKnife was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete FixedBladeKnife with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    FixedBladeKnife.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} FixedBladeKnives were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all FixedBladeKnives."
            });
        });
};

exports.findAllPublished = (req, res) => {
    FixedBladeKnife.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving FixedBladeKnife."
            });
        });
};

/*
Este controlador se puede modificar un poco para devolver la respuesta de paginación:
{
    "totalItems": 8,
    "tutorials": [...],
    "totalPages": 3,
    "currentPage": 1
}
    
*/