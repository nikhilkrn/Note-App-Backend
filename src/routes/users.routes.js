import {Router} from 'express'
import { verifyToken }  from '../middlewares/user.middlewares.js'
import { 
    AddUsers,
    SigninUser,
    SignOut,
 }  from '../controllers/users.controllers.js'

const routes = Router()



//User Signup
routes.route('/signup').post(AddUsers)
routes.route('/signin').post(SigninUser)
routes.route('/signout').post(verifyToken,SignOut)


export default routes