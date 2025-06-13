import { readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Client } from 'pg';
import dotenv from 'dotenv';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function runMigrations(folder) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();

  const migrationOrder = [
    'users.js',
    'address.js',
    'events.js'
  ];

  const dirPath = path.join(__dirname, folder);

  for (const fileName of migrationOrder) {
    const filePath = path.join(dirPath, fileName);

    try {
      const module = await import(`file://${filePath}`);
      console.log(`Executando: ${fileName}`);
      await module.default(client);
      if (['enderecos.js', 'edificios.js', 'projetos.js'].includes(fileName)) {
        console.log(`Aguardando commit de ${fileName}...`);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 segundo de delay
      }
      console.log(`✓ ${fileName} executado com sucesso`);
    } catch (error) {
      if (error.code === 'ERR_MODULE_NOT_FOUND') {
        console.log(`⚠ Arquivo não encontrado: ${fileName} - pulando...`);
      } else {
        console.error(`✗ Erro ao executar ${fileName}:`, error.message);
        throw error;
      }
    }
  }

  await client.end();
}

const env = process.argv[2] || 'production';
runMigrations(env)
  .then(() => {
    console.log('Migrações concluídas.');
  })
  .catch((err) => {
    console.error('Erro ao executar migrações:', err);
  });
