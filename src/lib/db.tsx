import mariadb from "mariadb";

export const pool = () => {
    mariadb.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        connectionLimit: 5,
    })
};

export default pool;