import { DataSource } from 'typeorm';
import { Usuario } from '../model/usuario';
import { Blacklist } from '../model/blacklist';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Usuario],
  synchronize: true,
});

export const BlacklistDataSource = new DataSource({
  type: 'postgres',
  host: process.env.BLACKLIST_DB_HOST || 'localhost',
  port: Number(process.env.BLACKLIST_DB_PORT) || 5433,
  username: process.env.BLACKLIST_DB_USER,
  password: process.env.BLACKLIST_DB_PASSWORD,
  database: process.env.BLACKLIST_DB_NAME,
  entities: [Blacklist],
  synchronize: true,
});
