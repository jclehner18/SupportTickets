const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 8000
const path = require('path')


//connect to db
connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))


//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

//serve frontend
if(process.env.NODE_ENV === 'production') { //in production
    //set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (_, res) => res.sendFile(path.join(__dirname, '../frontend/build/index.html')))
} else {
    app.get('/', (_, res) => {
        res.status(200).json({message: 'Welcome to Support Desk'})
    })
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))