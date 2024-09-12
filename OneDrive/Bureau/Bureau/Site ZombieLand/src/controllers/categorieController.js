const { Categorie } = require('../models');

exports.createCategorie = async (req, res) => {
  try {
    const categorie = await Categorie.create(req.body);
    res.status(201).send(categorie);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categorie.findAll();
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getCategorieById = async (req, res) => {
  try {
    const categorie = await Categorie.findByPk(req.params.id);
    if (categorie) {
      res.status(200).send(categorie);
    } else {
      res.status(404).send({ message: 'Categorie not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateCategorie = async (req, res) => {
  try {
    const updated = await Categorie.update(req.body, {
      where: { categorie_id: req.params.id }
    });
    if (updated[0] > 0) {
      const updatedCategorie = await Categorie.findByPk(req.params.id);
      res.status(200).send(updatedCategorie);
    } else {
      res.status(404).send({ message: 'Categorie not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteCategorie = async (req, res) => {
  try {
    const deleted = await Categorie.destroy({
      where: { categorie_id: req.params.id }
    });
    if (deleted) {
      res.status(204).send({ message: 'Categorie deleted' });
    } else {
      res.status(404).send({ message: 'Categorie not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};