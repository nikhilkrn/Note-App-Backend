import { asyncHandler } from '../utils/asyncHandler.js'
import { apiResponse } from '../utils/apiResponse.js'
import { apiError } from '../utils/apiError.js'
import { Note } from '../models/notes.models.js'



const AddNote = asyncHandler(async (req, res) => {
    const { title, description } = req.body
    const username = req.user.username

    const isTaskPresent = await Note.findOne({
        $and: [{ title: title }, { createdBy: username }]
    })

    if (isTaskPresent) {
        res.status(403).json(
            new apiError(403, "Task already present")
        )
    } else {
        const AddedTask = await Note.create({
            title: title,
            description: description,
            createdBy: username
        })

        const ifTaskAdded = await Note.findById(AddedTask._id)
        if (!ifTaskAdded) {
            res.status(500).json(
                new apiError(500, "Something went wrong while updatind data")
            )
        }
        return res.status(201).json(
            new apiResponse(
                201,
                {
                    data: AddedTask
                },
                "Note Added Successully"
            ))
    }

})

const UpdateNote = asyncHandler(async (req, res) => {
    const { _id } = req.params
    const { title, description } = req.body

    const isAvaliable = await Note.findById({ _id })
    if (!isAvaliable) {
        res.status(403).json(
            new apiError(403, "Note Not Found")
        )
    } else {
        await Note.updateOne({
            _id: _id
        }, {
            "$set": {
                title: title,
                description: description,
            }
        })
        res.json(
            new apiResponse(
                201, {
                title,
                description
            },
                "Task Updated Successfullt"
            )
        )
    }
})


const GetNote = asyncHandler(async (req, res) => {
    const username = req.user.username
    console.log(username)
    const getAllTodos = await Note.find({
        createdBy: username
    })
    if (!getAllTodos) {
        return res.status(404).json(
            new apiError(404, "User Not Found")
        )
    }

    // console.log(getAllTodos)
    return res.status(200).json(
        new apiResponse(
            200,
            {
                "Notes": getAllTodos.map(a => [
                    `Title: ${a.title}`,
                    `Description: ${a.description}`,
                    `Created By: ${a.createdBy}`
                ])
            },
            "Fetched All Todos"
        )
    )
})


const DeleteNote = asyncHandler(async (req, res) => {
    const {title, _id} = req.body;
    const username = req.user.username
    const toDelete = await Note.findOne({
        title: title,
        _id: _id,
        createdBy:username
    })

    if (toDelete) {
        await Note.deleteOne({
            title: title,
            _id: _id
        })
        res.json(
            new apiResponse(200,toDelete,"Note Deleted")
        )
    }
    else {
        res.status(403).json(
            new apiError(403,"Something went wrong")
        )
    }
})

export {
    AddNote,
    UpdateNote,
    GetNote,
    DeleteNote
}