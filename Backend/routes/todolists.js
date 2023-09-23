const express = require('express')
const {
    createList,
    getLists,
    getList,
    deleteList,
    updateList
} = require('../controllers/todolistController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()


// requiere auth for all lists
router.use(requireAuth)

//GET ALL
router.get('/', getLists)


//GET SINGLE
router.get('/:id', getList)


//POST
router.post('/', createList)


//DELETE
router.delete('/:id', deleteList)


//UPDATE
router.patch('/:id', updateList)

module.exports = router