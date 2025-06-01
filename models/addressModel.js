const db = require('../config/db');

class Address {
  static async getAll() {
    const result = await db.query('SELECT * FROM address');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM address WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const result = await db.query(
      'INSERT INTO address (street, number, district, cep) VALUES ($1, $2, $3, $4) RETURNING *',
      [data.street, data.number, data.district, data.cep]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const result = await db.query(
      'UPDATE address SET street = $1, number = $2, district = $3, cep = $4 WHERE id = $5 RETURNING *',
      [data.street, data.number, data.district, data.cep, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query(
      'DELETE FROM address WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rowCount > 0;
  }
}

module.exports = Address;
