const { Client } = require('pg');
const connection_string =
  'postgresql://neondb_owner:npg_qvCTS5O7DpfZ@ep-small-lab-ay5a4kae-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const SQL = `CREATE TABLE IF NOT EXISTS games (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR (255),
date VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS genres (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS game_genre (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
gameId INTEGER,
genreId INTEGER
);

CREATE TABLE IF NOT EXISTS developers (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS game_developer (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
gameId INTEGER,
developerId INTEGER
);

CREATE TABLE IF NOT EXISTS publishers (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS game_publisher (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
gameId INTEGER,
publisherId INTEGER
);

INSERT INTO genres (name) VALUES ('JRPG'), ('RPG'), ('Action'), ('Survival Horror'), ('FPS'), ('RTS'), ('Card Game'), ('Platformer');

INSERT INTO games (name, date) VALUES ('Kingdom Hearts', '2002-03-28');
INSERT INTO game_genre (gameId, genreId) SELECT id, 1 FROM games WHERE name = 'Kingdom Hearts';
INSERT INTO developers (name) VALUES ('Square Enix');
INSERT INTO game_developer (gameId, developerId) SELECT id, 1 FROM games WHERE name = 'Kingdom Hearts';
INSERT INTO publishers (name) VALUES ('Square Enix');
INSERT INTO game_publisher (gameId, publisherId) SELECT id, 1 FROM games WHERE name = 'Kingdom Hearts';

INSERT INTO games (name, date) VALUES ('Kingdom Hearts II', '2005-12-22');
INSERT INTO game_genre (gameId, genreId) SELECT id, 1 FROM games WHERE name = 'Kingdom Hearts II';
INSERT INTO game_developer (gameId, developerId) SELECT id, 1 FROM games WHERE name = 'Kingdom Hearts II';
INSERT INTO game_publisher (gameId, publisherId) SELECT id, 1 FROM games WHERE name = 'Kingdom Hearts II';

INSERT INTO games (name, date) VALUES ('Kingdom Hearts III', '2019-01-25');
INSERT INTO game_genre (gameId, genreId) SELECT id, 1 FROM games WHERE name = 'Kingdom Hearts III';
INSERT INTO game_developer (gameId, developerId) SELECT id, 1 FROM games WHERE name = 'Kingdom Hearts III';
INSERT INTO game_publisher (gameId, publisherId) SELECT id, 1 FROM games WHERE name = 'Kingdom Hearts III';

INSERT INTO games (name, date) VALUES ('StarCraft', '1998-03-31');
INSERT INTO game_genre (gameId, genreId) SELECT id, 6 FROM games WHERE name = 'StarCraft';
INSERT INTO developers (name) VALUES ('Blizzard Entertainment');
INSERT INTO game_developer (gameId, developerId) SELECT id, 2 FROM games WHERE name = 'StarCraft';
INSERT INTO publishers (name) VALUES ('Blizzard Entertainment');
INSERT INTO game_publisher (gameId, publisherId) SELECT id, 2 FROM games WHERE name = 'StarCraft';

INSERT INTO games (name, date) VALUES ('StarCraft II', '2010-07-27');
INSERT INTO game_genre (gameId, genreId) SELECT id, 6 FROM games WHERE name = 'StarCraft II';
INSERT INTO game_developer (gameId, developerId) SELECT id, 2 FROM games WHERE name = 'StarCraft II';
INSERT INTO game_publisher (gameId, publisherId) SELECT id, 2 FROM games WHERE name = 'StarCraft II';

INSERT INTO games (name, date) VALUES ('Halo: Combat Evolved', '2001-11-15');
INSERT INTO game_genre (gameId, genreId) SELECT id, 5 FROM games WHERE name = 'Halo: Combat Evolved';
INSERT INTO developers (name) VALUES ('Bungie');
INSERT INTO game_developer (gameId, developerId) SELECT id, 3 FROM games WHERE name = 'Halo: Combat Evolved';
INSERT INTO publishers (name) VALUES ('Microsoft Game Studios');
INSERT INTO game_publisher (gameId, publisherId) SELECT id, 3 FROM games WHERE name = 'Halo: Combat Evolved';

INSERT INTO games (name, date) VALUES ('Resident Evil', '1996-03-22');
INSERT INTO game_genre (gameId, genreId) SELECT id, 4 FROM games WHERE name = 'Resident Evil';
INSERT INTO developers (name) VALUES ('Capcom');
INSERT INTO game_developer (gameId, developerId) SELECT id, 4 FROM games WHERE name = 'Resident Evil';
INSERT INTO publishers (name) VALUES ('Capcom');
INSERT INTO game_publisher (gameId, publisherId) SELECT id, 4 FROM games WHERE name = 'Resident Evil';

INSERT INTO games (name, date) VALUES ('Resident Evil 2', '1998-01-21');
INSERT INTO game_genre (gameId, genreId) SELECT id, 4 FROM games WHERE name = 'Resident Evil 2';
INSERT INTO game_developer (gameId, developerId) SELECT id, 4 FROM games WHERE name = 'Resident Evil 2';
INSERT INTO game_publisher (gameId, publisherId) SELECT id, 4 FROM games WHERE name = 'Resident Evil 2';

INSERT INTO games (name, date) VALUES ('Undertale', '2015-09-15');
INSERT INTO game_genre (gameId, genreId) SELECT id, 2 FROM games WHERE name = 'Undertale';
INSERT INTO developers (name) VALUES ('Toby Fox');
INSERT INTO game_developer (gameId, developerId) SELECT id, 5 FROM games WHERE name = 'Undertale';
INSERT INTO publishers (name) VALUES ('Toby Fox');
INSERT INTO game_publisher (gameId, publisherId) SELECT id, 5 FROM games WHERE name = 'Undertale';


INSERT INTO games (name, date) VALUES ('Celeste', '2018-01-25');
INSERT INTO game_genre (gameId, genreId) SELECT id, 8 FROM games WHERE name = 'Celeste';
INSERT INTO developers (name) VALUES ('Maddy Makes Games');
INSERT INTO game_developer (gameId, developerId) SELECT id, 6 FROM games WHERE name = 'Celeste';
INSERT INTO publishers (name) VALUES ('Maddy Makes Games');
INSERT INTO game_publisher (gameId, publisherId) SELECT id, 6 FROM games WHERE name = 'Celeste';

INSERT INTO games (name, date) VALUES ('Granblue Fantasy: Relink', '2024-02-01');
INSERT INTO game_genre (gameId, genreId) SELECT id, 3 FROM games WHERE name = 'Granblue Fantasy: Relink';
INSERT INTO developers (name) VALUES ('Osaka Cygames');
INSERT INTO game_developer (gameId, developerId) SELECT id, 7 FROM games WHERE name = 'Granblue Fantasy: Relink';
INSERT INTO publishers (name) VALUES ('Cygames');
INSERT INTO game_publisher (gameId, publisherId) SELECT id, 7 FROM games WHERE name = 'Granblue Fantasy: Relink';

INSERT INTO games (name, date) VALUES ('Persona 5', '2016-09-15');
INSERT INTO game_genre (gameId, genreId) SELECT id, 1 FROM games WHERE name = 'Persona 5';
INSERT INTO developers (name) VALUES ('P-Studio');
INSERT INTO game_developer (gameId, developerId) SELECT id, 8 FROM games WHERE name = 'Persona 5';
INSERT INTO publishers (name) VALUES ('Atlus');
INSERT INTO game_publisher (gameId, publisherId) SELECT id, 8 FROM games WHERE name = 'Persona 5';

INSERT INTO games (name, date) VALUES ('Persona 4', '2008-07-10');
INSERT INTO game_genre (gameId, genreId) SELECT id, 1 FROM games WHERE name = 'Persona 4';
INSERT INTO developers (name) VALUES ('Atlus');
INSERT INTO game_developer (gameId, developerId) SELECT id, 9 FROM games WHERE name = 'Persona 4';
INSERT INTO game_publisher (gameId, publisherId) SELECT id, 8 FROM games WHERE name = 'Persona 4';

INSERT INTO games (name, date) VALUES ('Bastion', '2011-07-20');
INSERT INTO game_genre (gameId, genreId) SELECT id, 3 FROM games WHERE name = 'Bastion';
INSERT INTO developers (name) VALUES ('Supergiant Games');
INSERT INTO game_developer (gameId, developerId) SELECT id, 10 FROM games WHERE name = 'Bastion';
INSERT INTO publishers (name) VALUES ('Warner Bros. Interactive Entertainment');
INSERT INTO game_publisher (gameId, publisherId) SELECT id, 9 FROM games WHERE name = 'Bastion';

INSERT INTO games (name, date) VALUES ('Hades', '2020-09-17');
INSERT INTO game_genre (gameId, genreId) SELECT id, 3 FROM games WHERE name = 'Hades';
INSERT INTO game_developer (gameId, developerId) SELECT id, 10 FROM games WHERE name = 'Hades';
INSERT INTO publishers (name) VALUES ('Supergiant Games');
INSERT INTO game_publisher (gameId, publisherId) SELECT id, 10 FROM games WHERE name = 'Hades';

INSERT INTO games (name, date) VALUES ('Slay the Spire', '2019-01-23');
INSERT INTO game_genre (gameId, genreId) SELECT id, 7 FROM games WHERE name = 'Slay the Spire';
INSERT INTO developers (name) VALUES ('Mega Crit');
INSERT INTO game_developer (gameId, developerId) SELECT id, 11 FROM games WHERE name = 'Slay the Spire';
INSERT INTO publishers (name) VALUES ('Mega Crit');
INSERT INTO game_publisher (gameId, publisherId) SELECT id, 11 FROM games WHERE name = 'Slay the Spire';

INSERT INTO games (name, date) VALUES ('Balatro', '2019-01-23');
INSERT INTO game_genre (gameId, genreId) SELECT id, 7 FROM games WHERE name = 'Balatro';
INSERT INTO developers (name) VALUES ('LocalThunk');
INSERT INTO game_developer (gameId, developerId) SELECT id, 12 FROM games WHERE name = 'Balatro';
INSERT INTO publishers (name) VALUES ('Playstack');
INSERT INTO game_publisher (gameId, publisherId) SELECT id, 12 FROM games WHERE name = 'Balatro';

INSERT INTO games (name, date) VALUES ('Super Mario Bros.', '1985-09-13');
INSERT INTO game_genre (gameId, genreId) SELECT id, 8 FROM games WHERE name = 'Super Mario Bros.';
INSERT INTO developers (name) VALUES ('Nintendo');
INSERT INTO game_developer (gameId, developerId) SELECT id, 13 FROM games WHERE name = 'Super Mario Bros.';
INSERT INTO publishers (name) VALUES ('Nintendo');
INSERT INTO game_publisher (gameId, publisherId) SELECT id, 13 FROM games WHERE name = 'Super Mario Bros.';

INSERT INTO games (name, date) VALUES ('Silent Hill', '1999-02-23');
INSERT INTO game_genre (gameId, genreId) SELECT id, 4 FROM games WHERE name = 'Silent Hill';
INSERT INTO developers (name) VALUES ('Team Silent');
INSERT INTO game_developer (gameId, developerId) SELECT id, 14 FROM games WHERE name = 'Silent Hill';
INSERT INTO publishers (name) VALUES ('Konami');
INSERT INTO game_publisher (gameId, publisherId) SELECT id, 14 FROM games WHERE name = 'Silent Hill';

INSERT INTO games (name, date) VALUES ('Silent Hill 2', '2001-09-25');
INSERT INTO game_genre (gameId, genreId) SELECT id, 4 FROM games WHERE name = 'Silent Hill 2';
INSERT INTO game_developer (gameId, developerId) SELECT id, 14 FROM games WHERE name = 'Silent Hill 2';
INSERT INTO game_publisher (gameId, publisherId) SELECT id, 14 FROM games WHERE name = 'Silent Hill 2'; 
`;

const fullGameInfo = `SELECT games.id AS id, games.name AS name, games.date AS date, genres.name AS genre, developers.name AS developer, publishers.name AS publisher, developers.id AS developerId, publishers.id AS publisherId, genres.id AS genreId FROM games LEFT JOIN game_genre ON games.id = game_genre.gameId LEFT JOIN genres ON game_genre.genreId = genres.id LEFT JOIN game_developer ON games.id = game_developer.gameId LEFT JOIN developers ON game_developer.developerId = developers.id LEFT JOIN game_publisher ON games.id = game_publisher.gameId LEFT JOIN publishers ON game_publisher.publisherId = publishers.id`;
const testInfo = `SELECT games.id AS id, games.name AS name, games.date AS date, genres.name AS genre FROM games LEFT JOIN game_genre ON games.id = game_genre.gameId LEFT JOIN genres ON game_genre.genreId = genres.id`;
const tableCheck = `SELECT * FROM developers`;
const deleteItem = `DELETE FROM games WHERE id = 23;
DELETE FROM game_genre WHERE gameId = 23;
DELETE FROM game_developer WHERE gameId = 23;`;
const deleteTable = `DROP TABLE games;
DROP TABLE genres;
DROP TABLE game_genre;
DROP TABLE developers;
DROP TABLE game_developer;
DROP TABLE publishers;
DROP TABLE game_publisher;
`;
async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: connection_string,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  await client.connect();
  // await client.query(deleteItem);
  const { rows } = await client.query(tableCheck);
  console.log(rows);
  await client.end();
  console.log('done');
}

main();
