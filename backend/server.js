const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')

const PORT = process.env.PORT || 8080;

const AuthRouter = require('./Routes/AuthRouter')
const expenseRoutes = require("./Routes/ExpenseRoutes");

require('./Models/db')

app.use(express.json())
app.use(cors());


app.use('/auth',AuthRouter)
app.use("/expense", expenseRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:8080`)
})
