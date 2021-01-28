const express = require('express');
const router = express.Router();
const pool = require('./../db')

router.get('/', async (req, res) => {
    try {
        const calendar = await pool.query("SELECT * FROM calendar ORDER BY calendar_id")
        res.json(calendar.rows)
        console.log('Был получен запрос календаря')
    } catch (err) {
        console.error(err)        
    }
})

router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {todo} = req.body
        await pool.query(
        "UPDATE calendar SET todo = $1 WHERE calendar_id = $2",
        [todo, id])
    res.json("Обновлено")
    console.log(id, todo);
    } catch (err) {
        console.error(err.message)
    }
})

// router.post('/', async (req, res) => {
//     try {
//         const {title, link, description, type} = req.body
//         const newLink = await pool.query("INSERT INTO links (title, link, description, type) VALUES($1, $2, $3, $4) RETURNING *",
//         [title, link, description, type])
//         res.json(newLink.rows[0])

//     } catch (err) {
//         console.error(err.message)
//     }
// })

module.exports = router;