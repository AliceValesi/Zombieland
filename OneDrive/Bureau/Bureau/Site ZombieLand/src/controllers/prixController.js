const { Prix } = require('../models');

exports.createPrix = async (req, res) => {
  try {
    const prix = await Prix.create(req.body);
    res.status(201).send(prix);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllPrix = async (req, res) => {
  try {
    const prix = await Prix.findAll();
    res.status(200).send(prix);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getPrixById = async (req, res) => {
  try {
    const prix = await Prix.findByPk(req.params.id);
    if (prix) {
      res.status(200).send(prix);
    } else {
      res.status(404).send({ message: 'Prix non trouvé' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updatePrix = async (req, res) => {
  try {
    const prix = await Prix.findByPk(req.params.id);
    if (prix) {
      await prix.update(req.body);
      res.status(200).send(prix);
    } else {
      res.status(404).send({ message: 'Prix non trouvé' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deletePrix = async (req, res) => {
  try {
    const prix = await Prix.findByPk(req.params.id);
    if (prix) {
      await prix.destroy();
      res.status(204).send({ message: 'Prix supprimé' });
    } else {
      res.status(404).send({ message: 'Prix non trouvé' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};