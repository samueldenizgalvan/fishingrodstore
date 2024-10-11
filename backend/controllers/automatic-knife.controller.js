const db = require("../models");
const AutomaticKnife = db.automaticKnives;
const Op = db.Sequelize.Op; // Operador para realizar consultas mas avanzadas

exports.create = (req, res) => {
    if (!req.body.price || !req.body.code || !req.body.brand || !req.body.photoUrl || !req.body.color) {
        return res.status(400).send({ message: "Content can not be Empty!" });
    }

    const automaticKnife = {
        price: req.body.price,
        code: req.body.code,
        brand: req.body.brand,
        photoUrl: req.body.photoUrl,
        color: req.body.color
    };

    AutomaticKnife.create(automaticKnife)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the AutomaticKnife."
            });
        });
};

exports.findAll = (req, res) => {
    AutomaticKnife.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving AutomaticKnife."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    AutomaticKnife.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find AutomaticKnife with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving AutomaticKnife with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    AutomaticKnife.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "AutomaticKnife was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update AutomaticKnife with id=${id}. Maybe AutomaticKnife was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating AutomaticKnife with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    AutomaticKnife.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "AutomaticKnife was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete AutomaticKnife with id=${id}. Maybe AutomaticKnife was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete AutomaticKnife with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    AutomaticKnife.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} AutomaticKnives were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all AutomaticKnives."
            });
        });
};

exports.findAllPublished = (req, res) => {
    AutomaticKnife.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving AutomaticKnives."
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