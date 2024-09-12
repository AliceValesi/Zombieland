const { Message } = require('../models');

exports.createMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).send(message);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.status(200).send(messages);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (message) {
      res.status(200).send(message);
    } else {
      res.status(404).send({ message: 'Message non trouvé' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (message) {
      await message.update(req.body);
      res.status(200).send(message);
    } else {
      res.status(404).send({ message: 'Message non trouvé' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (message) {
      await message.destroy();
      res.status(204).send({ message: 'Message supprimé' });
    } else {
      res.status(404).send({ message: 'Message non trouvé' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};