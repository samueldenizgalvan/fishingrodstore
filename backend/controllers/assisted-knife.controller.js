const db = require("../models");
const AssistedKnife = db.assistedKnives;
const Op = db.Sequelize.Op; // Operador para realizar consultas mas avanzadas

exports.create = (req, res) => {
    if (!req.body.price || !req.body.code || !req.body.brand || !req.body.photoUrl || !req.body.color) {
        return res.status(400).send({ message: "Content can not be Empty!" });
    }

    const assistedKnife = {
        price: req.body.price,
        code: req.body.code,
        brand: req.body.brand,
        photoUrl: req.body.photoUrl,
        color: req.body.color
    };

    AssistedKnife.create(assistedKnife)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the AssistedKnife."
            });
        });
};

exports.findAll = (req, res) => {
    AssistedKnife.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving AssistedKnife."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    AssistedKnife.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find AssistedKnife with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving AssistedKnife with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    AssistedKnife.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "AssistedKnife was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update AssistedKnife with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating AssistedKnife with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    AssistedKnife.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "AssistedKnife was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete AssistedKnife with id=${id}. Maybe AssistedKnife was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete AssistedKnife with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    AssistedKnife.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} AssistedKnives were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all AssistedKnives."
            });
        });
};

exports.findAllPublished = (req, res) => {
    AssistedKnife.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving AssistedKnives."
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