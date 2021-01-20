const express = require('express');
const router = express.Router();
const pool = require('./../db')

router.get('/', async (req, res) => {
    try {
        const allLinks = await pool.query("SELECT * FROM links ORDER BY link_id")
        res.json(allLinks.rows)
        console.log('Был получен запрос ссылок')
    } catch (err) {
        console.error(err)        
    }
})

router.post('/', async (req, res) => {
    try {
        const {title, link, description, type} = req.body
        const newLink = await pool.query("INSERT INTO links (title, link, description, type) VALUES($1, $2, $3, $4) RETURNING *",
        [title, link, description, type])
        res.json(newLink.rows[0])

    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router;