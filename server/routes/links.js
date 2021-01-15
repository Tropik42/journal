const express = require('express');
const router = express.Router();
const pool = require('./../db')

router.get("/", async (req, res) => {
    try {
        const allLinks = await pool.query("SELECT * FROM links ORDER BY link_id")
        res.json(allLinks.rows)
        console.log('Был получен запрос ссылок')
    } catch (err) {
        console.error(err)        
    }
})

module.exports = router;