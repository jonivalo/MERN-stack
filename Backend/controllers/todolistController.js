const Todolist = require('../models/todolistModel')
const mongoose = require('mongoose')

//GET ALL LISTS
const getLists = async (req, res) => {
    const user_id = req.user._id

    const todolists = await Todolist.find({ user_id }).sort({createAt: -1})

    res.status(200).json(todolists)
}

//GET A SINGLE LIST
const getList = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such todolist'})
    }

    const todolist = await Todolist.findById(id)

    if (!todolist) {
        return res.status(404).json({error: 'No such todolist'})
    }
    res.status(200).json(todolist)
}


//create new list
const createList = async (req, res) => {
    const {title, mpost} = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!mpost) {
        emptyFields.push('mpost')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }

    // add list to db
    try {
        const user_id = req.user._id
        const todolist = await Todolist.create({title, mpost, user_id})
        res.status(200).json(todolist)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}



//DELETE a list
const deleteList = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such todolist'})
    }

    const todolist = await Todolist.findOneAndDelete({_id: id})

    if (!todolist) {
        return res.status(400).json({error: 'No such todolist'})
    }
    
    res.status(200).json(todolist)
}

//UPDATE a list

const updateList = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such todolist'})
    }

    const todolist = await Todolist.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!todolist) {
        return res.status(400).json({error: 'No such todolist'})
    }

    res.status(200).json(todolist)
}


module.exports = {
    getLists,
    getList,
    createList,
    deleteList,
    updateList
}