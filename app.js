import express from 'express'
import bodyParser from 'body-parser'
import todos from './src/routes/todos.routes.js'
import userroutes from './src/routes/users.routes.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cookieParser())
app.use(bodyParser.json());
app.use("/users/todo" ,todos)
app.use('/users',userroutes)


export default app