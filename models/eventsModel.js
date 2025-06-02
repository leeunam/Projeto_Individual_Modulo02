const db = require('../config/db');

class Events {
  static async getAllWithDetails() {
    const result = await db.query(`
      SELECT 
        e.id,
        e.name,
        e.event_date,
        e.event_time,
        e.description,
        u.name as organizer_name,
        a.street,
        a.number,
        a.district,
        a.cep
      FROM events e
      LEFT JOIN users u ON e.user_id = u.id
      LEFT JOIN address a ON e.address_id = a.id
      ORDER BY e.event_date ASC, e.event_time ASC
    `);
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM events WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async getByIdWithDetails(id) {
    const result = await db.query(
      `
      SELECT 
        e.id,
        e.name,
        e.event_date,
        e.event_time,
        e.description,
        e.user_id,
        e.address_id,
        u.name as organizer_name,
        a.street,
        a.number,
        a.district,
        a.cep
      FROM events e
      LEFT JOIN users u ON e.user_id = u.id
      LEFT JOIN address a ON e.address_id = a.id
      WHERE e.id = $1
    `,
      [id]
    );
    return result.rows[0];
  }

  static async getByUserId(userId) {
    const result = await db.query(
      `
      SELECT 
        e.id,
        e.name,
        e.event_date,
        e.event_time,
        e.description,
        u.name as organizer_name,
        a.street,
        a.number,
        a.district,
        a.cep
      FROM events e
      LEFT JOIN users u ON e.user_id = u.id
      LEFT JOIN address a ON e.address_id = a.id
      WHERE e.user_id = $1
      ORDER BY e.event_date ASC, e.event_time ASC
    `,
      [userId]
    );
    return result.rows;
  }

  static async create(data) {
    const result = await db.query(
      'INSERT INTO events (name, user_id, address_id, event_time, event_date, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [
        data.name,
        data.user_id,
        data.address_id,
        data.event_time,
        data.event_date,
        data.description,
      ]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const result = await db.query(
      'UPDATE events SET name = $1, user_id = $2, address_id = $3, event_time = $4, event_date = $5, description = $6 WHERE id = $7 RETURNING *',
      [
        data.name,
        data.user_id,
        data.address_id,
        data.event_time,
        data.event_date,
        data.description,
        id,
      ]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query(
      'DELETE FROM events WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rowCount > 0;
  }
}

module.exports = Events;
