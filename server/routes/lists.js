const express = require('express');
const router = express.Router();
const pool = require('./../db')

//get all lists
router.get('/', async (req, res) => {    
    try {
        const allLists = await pool.query("SELECT * FROM lists ORDER BY list_id")
        res.json(allLists.rows)
        console.log('Был получен запрос списков')
    } catch (err) {
        console.error(err)        
    }
})

//add new list
router.post('/', async (req, res) => {
    try {
        const {title, description, type} = req.body
        const newList = await pool.query("INSERT INTO lists (title, description, type) VALUES($1, $2, $3) RETURNING *",
        [title, description, type])
        res.json(newList.rows[0])
    } catch (err) {
        console.error(err)       
    }
})

//edit list
router.put('/:id', async (req, res) => {
    const {id} = req.params
    const {title, description, type} = req.body
    await pool.query(
        "UPDATE lists SET title = $1, description = $2, type = $3 WHERE list_id = $4", [title, description, type, id])
    res.json("Обновлено")
})

//delete list
router.delete('/:id', async (req, res) => {
    const {id} = req.params
    await pool.query("DELETE FROM lists WHERE list_id = $1", [
        id
    ])
})

module.exports = router;