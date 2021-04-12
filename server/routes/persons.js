const express = require('express');
const router = express.Router();
const pool = require('../db')

//get all person
router.get('/', async (req, res) => {    
    try {
        const allPersons = await pool.query("SELECT * FROM persons ORDER BY person_id")
        res.json(allPersons.rows)
        console.log('Был получен запрос людей')
    } catch (err) {
        console.error(err)        
    }
})

//add new person
router.post('/', async (req, res) => {
    try {
        const {title, description, type} = req.body
        const newPerson = await pool.query("INSERT INTO persons (title, description, type) VALUES($1, $2, $3) RETURNING *",
        [title, description, type])
        res.json(newPerson.rows[0])
    } catch (err) {
        console.error(err)       
    }
})

//edit person
router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {title, description, type} = req.body
        await pool.query("UPDATE persons SET title = $1, description = $2, type = $3 WHERE person_id = $4", [title, description, type, id])
        res.json("Информация о персоне обновлена")
    } catch (err) {
        console.error(err)        
    }
})

module.exports = router;