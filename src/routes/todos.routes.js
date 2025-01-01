const {Router} = require('express');
const { Note } = require('../models/notes.models.js')
const { User } = require('../models/users.models.js')
const userMiddleware  = require('../middlewares/user.middlewares.js')
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../env.js');
const routes = Router()


//User Signup
routes.post('/signup', async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const notuniqueUser = await User.findOne({username});
    if (notuniqueUser) {
        return res.status(403).json({
            msg: "User Already Exists"
        })
    }else{
        await User.create({
            username: username,
            password: password,
            email : email,
        })
        .then(()=>{
            res.json({
                msg: `User Created successfully`
            })
        })
    }
})

//User Signin
routes.get('/signin', async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const user =await User.findOne({
        username,
        password
    })
    if(user){
        const token = jwt.sign({username}, JWT_SECRET)
        return res.json({
            token
        })
    }else{
        return res.status(403).json({
            msg: "Your Credential are incorrect"
        })
    }

})
//Post Note ==>Add Note 
routes.post('/addnote', userMiddleware,async(req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const username = req.username
    console.log(username);
    
    const isPresent = await Note.findOne({
        title
    })
    console.log(isPresent);
    
    if (isPresent) {
        return res.status(403).json({
            msg: "Task is already Present!"
        })
    } else {     
        await Note.create({
            title : title,
            description : description,
            CreatedAt:`${new Date().toLocaleDateString()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
            createdBy : username
        }).then(()=>{
            res.json({
                msg: "task Added!!"
            })
        })
    }


})

//GET Note ==>Get note
routes.get('/getnotes', userMiddleware,async(req,res)=>{
    const username = req.username
    const notes = await Note.find({
        createdBy:username
    })
    console.log(notes);
    
    return res.json({
        "title": notes.map(a => `Task Title: ${a.title}   :   Description:  ${a.description},    createdBY: ${a.createdBy}`)
    })
})


//PUT Note ==> To Update 

routes.put('/updatenote/:noteid',userMiddleware,async(req,res)=>{
    const nodeId = req.params.noteid;
    const title = req.body.title
    const description = req.body.description

    const avialablenote = await Note.findOne({_id:nodeId})
    if (avialablenote) {
        await Note.updateOne({
            _id:nodeId
        },{
            "$set":{
                title: title,
                description,
                updatedAt: `${new Date().toLocaleDateString()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
            }
        })
        res.json({
            msg:"Task Updated"
        })
    }else{
        res.status(403).json({
            msg: `No task Found with ID: ${nodeId}`
        })
    }
})
//DELETE Note ==>Delete Note
routes.delete('/delete',userMiddleware,async(req,res)=>{
    const title = req.body.title;
    const id = req.body._id;
    
    const toDelete = await Note.findOne({
        title:title,
        _id: id
    })
    if (toDelete) {
        await Note.deleteOne({
            title:title,
            _id:id
        })
        res.json({
            msg:"TASK DELETED !!!"
        })
    }
    else{
        res.status(403).json({
            nsg: "Something went wrong"
        })
    }
})

module.exports = routes