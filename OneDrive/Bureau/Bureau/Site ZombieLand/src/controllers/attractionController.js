const { Attraction } = require('../models');

exports.createAttraction = async (req, res) => {
  try {
    const newAttraction = await Attraction.create(req.body);
    res.status(201).json(newAttraction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllAttractions = async (req, res) => {
  try {
    const attractions = await Attraction.findAll();
    res.status(200).json(attractions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAttractionById = async (req, res) => {
  try {
    const attraction = await Attraction.findByPk(req.params.id);
    if (attraction) {
      res.status(200).json(attraction);
    } else {
      res.status(404).json({ message: 'Attraction non trouvée' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateAttraction = async (req, res) => {
  try {
    const [updated] = await Attraction.update(req.body, {
      where: { attraction_id: req.params.id }
    });
    if (updated) {
      const updatedAttraction = await Attraction.findByPk(req.params.id);
      res.status(200).json(updatedAttraction);
    } else {
      res.status(404).json({ message: 'Attraction non trouvée' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAttraction = async (req, res) => {
  try {
    const deleted = await Attraction.destroy({
      where: { attraction_id: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Attraction supprimée' });
    } else {
      res.status(404).json({ message: 'Attraction non trouvée' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
