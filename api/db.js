const { Pool } = require('pg')

const dbConfig = {
    host: 'motty.db.elephantsql.com',
    user: 'tinuvlmn',
    password: 'fx2v1I8WBFCJYISJzlPoZUf4cVIiiyxR',
    database: 'tinuvlmn',
    port: 5432
}

const pool = new Pool(dbConfig)

async function deleteUser(email) {
    await pool.query('DELETE FROM users WHERE email = $1', [email])
}

async function insertUser(user) {
    const sql = 'INSERT INTO users (name, email, password, is_shaver) VALUES ($1, $2, $3, $4) RETURNING id'
    const data = [user.name, user.email, user.password, user.is_shaver]

    const result = await pool.query(sql, data)
    const { id } = result.rows[0]

    return id
}

async function findToken(email) {
    const sql = 'SELECT B.token FROM ' +
        'users A INNER JOIN user_tokens B ' +
        'ON A.id = B.user_id ' +
        'WHERE A.email = $1 ' +
        'ORDER BY B.created_at DESC LIMIT 1'

    const result = await pool.query(sql, [email])
    
    console.log(result.rows[0])

    return result.rows[0]
}

module.exports = {
    deleteUser,
    insertUser,
    findToken
}