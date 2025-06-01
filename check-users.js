const db = require('./config/db');

async function checkUsers() {
  try {
    console.log('🔍 Verificando usuários no banco...');

    const client = await db.connect();

    // Verificar usuários
    const users = await client.query(
      'SELECT id, name, email, password, role FROM users'
    );
    console.log('\n👥 Usuários encontrados:');
    users.rows.forEach((user) => {
      console.log(`  - ID: ${user.id}`);
      console.log(`    Nome: ${user.name}`);
      console.log(`    Email: ${user.email}`);
      console.log(`    Senha: ${user.password}`);
      console.log(`    Role: ${user.role}`);
      console.log('    ---');
    });

    client.release();
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

checkUsers();
