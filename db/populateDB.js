const { Client } = require('pg');
const connection_string =
  'postgresql://postgres:GVNoMJPNKTijqkogvppyPLJTLsHONSLT@zephyr.proxy.rlwy.net:24922/railway';
const SQL = `CREATE TABLE IF NOT EXISTS inventory (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
??? VARCHAR (255)
);

INSERT INTO inventory (???) VALUES ('???')`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: connection_string,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

// main();
