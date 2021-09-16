const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')
const app = express()


app.use(cors())

// app.use(cookieParser)

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// app.use(session({
//     key: "userId",
//     secret: "secret",
//     resave: false,
//     saveUninitialized: false
// }))

app.get('/', (req, res) => {
    res.send('Hello!')
})

app.use(userRouter)
app.use(authRouter)

PORT = process.env.PORT || 8040

app.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`)
})