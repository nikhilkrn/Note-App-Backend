const express = require('express')
const bodyParser = require('body-parser');
const todos = require('./src/routes/todos.routes.js')

const app = express()
const port = 3000;

app.use(bodyParser.json());
app.use("/todo" ,todos)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})
