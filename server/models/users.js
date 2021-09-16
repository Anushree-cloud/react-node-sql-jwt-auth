const mysql = require('mysql2')
const bcrypt = require('bcrypt')

const saltRounds = 10

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'user_login_authentication'
})

db.connect((error) => {
    if(error) throw error
    console.log('Connected => Table: users');
})

//get all users
const getAll = (callback) => {
    let sqlQuery = 'SELECT * FROM users'
    db.query(sqlQuery, (error, users) => {
        if(error) throw error
        callback(users)
    })
}

//get a single by id
const getById = (userId, callback) => {
    let sqlQuery = `SELECT * FROM users WHERE id=${userId}`
    db.query(sqlQuery, (error, user) => {
        if(error) throw error
        callback(user)
    })
}

//get a user by username and password
const getByUserNamePassword = (session, data, callback) => {
    let sqlQuery = `SELECT * FROM users WHERE email='${data.email}'`
    db.query(sqlQuery, (error, user) => {
        // if(error) throw error
        // callback(user)
        if(error) {
            callback(error)
        }
        else {
            if(user.length > 0) {
                bcrypt.compare(data.password, user[0].password, (error, response) => {
                    if(response){
                        session = user
                        callback(user)
                    }
                    else {
                        callback(error)
                    }
                })
            }
        }
    })
}

//add a user
const register = (data, callback) => {
    bcrypt.hash(data.password, saltRounds, (error, hash) => {
        let sqlQuery = 'INSERT INTO users( name, email, password) VALUES (?,?,?)'
        db.query(sqlQuery, [data.name, data.email, hash], (error, results) => {
            if(error) throw error
            callback()
        })
    })
}

//update a user
const updateById = (updatedData, userId, callback) => {
    let sqlQuery = `UPDATE users SET name='${updatedData.name}', email='${updatedData.email}', password='${updatedData.password}' WHERE id=${userId}`
    db.query(sqlQuery, (error, user) => {
        if(error) throw error
        callback()
    })
}

//delete a user
const deleteById = (userId, callback) => {
    let sqlQuery = `DELETE FROM users WHERE id=${userId}`
    db.query(sqlQuery, (error, user) => {
        if(error) throw error
        callback()
    })
}


module.exports = {
    getAll, getById, getByUserNamePassword, register, updateById, deleteById
}