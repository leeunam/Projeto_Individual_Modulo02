exports.up = function(knex) {
  return knex.schema
    .createTable('users', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.string('role').notNullable();
    })
    .createTable('address', function(table) {
      table.increments('id').primary();
      table.string('street').notNullable();
      table.integer('number').notNullable();
      table.string('district').notNullable();
      table.string('cep', 10).notNullable();
    })
    .createTable('events', function(table) {
      table.increments('id').primary();
      table.string('name', 100).notNullable();
      table.integer('user_id').unsigned().notNullable()
        .references('id').inTable('users').onDelete('CASCADE');
      table.integer('address_id').unsigned().notNullable()
        .references('id').inTable('address').onDelete('CASCADE');
      table.time('event_time').notNullable();
      table.date('event_date').notNullable();
      table.string('description', 250);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('events')
    .dropTableIfExists('address')
    .dropTableIfExists('users');
};