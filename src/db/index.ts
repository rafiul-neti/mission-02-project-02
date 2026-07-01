import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString: config.connection_string,
});

export const initDB = async () => {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50),
            email VARCHAR (50) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role VARCHAR (15) DEFAULT 'contributor',

            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        )
        `);
    console.log("Database Connected Successfully.");
  } catch (error) {
    console.log(error);
  }
};
