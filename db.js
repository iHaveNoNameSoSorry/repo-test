const connect = async() =>
{
    if(global.connection)
    {
        return global.connection.connect();
    }

    const { Pool } = require('pg');
    const pool = new Pool ({ connectionString: process.env.DatabaseConnectionString });

    console.log("Database connected");

    global.connection = pool;
    return pool.connect();
}

const select = async() =>
{
    const client = await connect();
    let res = await client.query('SELECT * FROM logs');
    return res.rows;
}

const insert = async(log) =>
{
    const client = await connect();
    const sql = 'INSERT INTO logs(raw_data, timestamp) VALUES($1, $2);';
    const values = [log.data, log.timestamp];
    return await client.query(sql, values);
}

module.exports = {insert, select};
