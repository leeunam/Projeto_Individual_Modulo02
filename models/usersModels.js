const db = require('../config/db');

class Users {
  static async getAll() {
    const result = await db.query('SELECT * FROM users');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const result = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [data.name, data.email, data.password, data.role]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const result = await db.query(
      'UPDATE users SET name = $1, email = $2, password = $3, role = $4 WHERE id = $5 RETURNING *',
      [data.name, data.email, data.password, data.role, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rowCount > 0;
  }

  static async findByEmail(email) {
    try {
      const result = await db.query('SELECT * FROM users WHERE email = $1', [
        email,
      ]);
      return result.rows[0]; // Retorna o primeiro usuário encontrado ou undefined
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Users;
