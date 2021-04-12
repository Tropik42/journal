const express = require('express');
const router = express.Router();
const pool = require('./../db')

//get all types
router.get('/', async (req, res) => {
    try {
        const allTypes = await pool.query("SELECT * FROM types ORDER BY type_id")
        res.json(allTypes.rows)
        console.log('Был получен запрос типов заметок')
    } catch (err) {
        console.error(err)        
    }
})

//add new type
router.post('/', async (req, res) => {
    try {
        const {description} = req.body

        const newType = await pool.query("INSERT INTO types (description) VALUES ($1) RETURNING *",
        [description])
        res.json(newType.rows[0])

    } catch (err) {
        console.error(err.message)
        
    }
})

//delete type
router.delete('/delete/:id', async (req, res) => {
    try {
        console.log(req.params)
        const {id} = req.params
        const deleteType = await pool.query("DELETE FROM types WHERE type_id = $1", [
            id
        ])

        res.json(`Type with id = ${id} was deleted`)
    } catch (err) {
        console.error(err.message)
        
    }
})

module.exports = router;