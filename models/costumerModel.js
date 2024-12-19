const { DataTypes } = require("sequelize");
const database = require("../config/db");

class Costumer {
  constructor() {
    this.model = database.sequelize.define("Costumer", {
      nombres: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido_paterno: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido_materno: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      domicilio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      estatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  }

  async createCostumer(
    nombres,
    apellido_paterno,
    apellido_materno,
    domicilio,
    correo
  ) {
    try {
      const costumer = await this.model.create({
        nombres,
        apellido_paterno,
        apellido_materno,
        domicilio,
        correo,
        estatus: 1,
      });
      return {
        status: true,
        datos: costumer,
        message: "Registrado correctamente.",
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllCostumers() {
    try {
      const costumers = await this.model.findAll({
        where: {
          estatus: 1,
        },
      });
      return costumers.length === 0
        ? { status: true, datos: [], message: "Sin datos por mostrar." }
        : {
            status: true,
            datos: costumers,
            message: "Datos obtenidos con éxito.",
          };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateCustomer(
    nombres,
    apellido_paterno,
    apellido_materno,
    domicilio,
    correo,
    id
  ) {
    try {
      const [rowsUpdated] = await this.model.update(
        {
          nombres: nombres,
          apellido_paterno: apellido_paterno,
          apellido_materno: apellido_materno,
          domicilio: domicilio,
          correo: correo,
        },
        {
          where: {
            id: id,
          },
        }
      );

      return {
        status: true,
        datos: rowsUpdated,
        message: `${rowsUpdated} registros actualizados.`,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteCustomer(id) {
    try {
      const [rowsUpdated] = await this.model.update(
        { estatus: 0 },
        {
          where: {
            id: id,
          },
        }
      );

      return {
        status: true,
        datos: rowsUpdated,
        message: `${rowsUpdated} registros actualizados.`,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new Costumer();
