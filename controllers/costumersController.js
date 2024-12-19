
const Costumer = require('../models/costumerModel');

class CostumerController {
  async createCostumer(req, res) {
    const { nombres, apellido_paterno, apellido_materno, domicilio, correo } = req.body;
    try {
      const costumer = await Costumer.createCostumer(nombres, apellido_paterno, apellido_materno, domicilio, correo);
      res.status(201).json(costumer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllCostumers(req, res) {
    try {
      const costumers = await Costumer.getAllCostumers();
      res.status(200).json(costumers);
    } catch (error) {
      res.status(400).json({ status:false, message: error.message });
    }
  }

  async updateCustomer(req, res) {
    const { nombres, apellido_paterno, apellido_materno, domicilio, correo, id } = req.body;
    try {
      const costumer = await Costumer.updateCustomer(nombres, apellido_paterno, apellido_materno, domicilio, correo, id);
      res.status(201).json(costumer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteCustomer(req, res) {
    const { id } = req.query;
    try {
      const costumer = await Costumer.deleteCustomer(id);
      res.status(201).json(costumer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new CostumerController();