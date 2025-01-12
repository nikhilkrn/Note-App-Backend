import {Router} from 'express'
import { verifyToken }  from '../middlewares/user.middlewares.js'
import { AddNote, DeleteNote, GetNote, UpdateNote } from '../controllers/todos.controllers.js'


const routes = Router()

// //Post Note ==>Add Note 
routes.route('/addnote').post(verifyToken,AddNote)

// //PUT Note ==> To Update 
routes.route('/updatenote/:_id').put(verifyToken,UpdateNote)

// //GET Note ==>Get note
routes.route('/getnotes').get(verifyToken,GetNote)

// //DELETE Note ==>Delete Note
routes.route('/delete').delete(verifyToken,DeleteNote)

export default routes