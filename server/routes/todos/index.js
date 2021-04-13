const express = require('express');
const router = express.Router();
const pool = require('./../../db')

const QUERY = "INSERT INTO todo (time, description, type, comment) VALUES($1, $2, $3, $4) RETURNING *"

//get all todos
router.get('/', async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo ORDER BY todo_id")
        res.json(allTodos.rows)
        console.log('Был получен запрос заметок')
        
    } catch (err) {
        console.error(err)        
    }
})
router.get('/test', async (req, res) => {
    console.log('test ok')
    res.json('test ok')
})
//add new todo
router.post('/', async ({description, type, comment}, res) => {
    try {
        const now = new Date()
        // const time = `${now.getFullYear()}-${now.getDate()}-${now.getMonth()+1} ${now.getHours()}:${now.getMinutes().toString().length > 1 ? now.getMinutes() : '0' + now.getMinutes()}:${now.getSeconds().toString().length > 1 ? now.getSeconds() : '0' + now.getSeconds()}`
        const time = `${now.getDate()}...`/* now.getFullYear() + "-" + 
            (now.getDate().toString().length > 1 ? now.getDate() : '0' + now.getDate()) + "-" + // TODO: Убрать toString
            (now.getMonth().toString().length > 1 ? (now.getMonth() + 1) : '0' + (now.getMonth() + 1)) + " " + 
            (now.getHours().toString().length > 1 ? now.getHours() : '0' + now.getHours()) + ":" + 
            (now.getMinutes().toString().length > 1 ? now.getMinutes() : '0' + now.getMinutes()) + ":" + 
            (now.getSeconds().toString().length > 1 ? now.getSeconds() : '0' + now.getSeconds())
*/
        const newTodo = await pool.query(QUERY, [time, description, type, comment])
        res.json(newTodo.rows[0])
        console.log(newTodo.rows[0])
    } catch (err) {
        console.error(err.message)        
    }
})
//update todos
router.put('/:id', async (req, res) => {
    const {id} = req.params
    const {description, type} = req.body
    const updateTodo = await pool.query(
        "UPDATE todo SET description = $1, type = $2 WHERE todo_id = $3",
        [description, type, id])
    res.json("Обновлено")
})
//update todo to done
router.put('/done/:id', async (req, res) => {
    const {id} = req.params
    const updateTodo = await pool.query(
        "UPDATE todo SET done = TRUE WHERE todo_id = $1",
        [id])
    res.json("Выполнено")
})
//update todo to deleted
router.put('/to_trash/:id', async (req, res) => {
    const {id} = req.params
    const updateTodo = await pool.query(
        "UPDATE todo SET deleted = TRUE WHERE todo_id = $1",
        [id])
    res.json("Выполнено")
})
//restore from trash
router.put('/restore/:id', async (req, res) => {
    const {id} = req.params
    await pool.query(
        "UPDATE todo SET deleted = FALSE WHERE todo_id = $1",
        [id])
    res.json(`Заметка с id ${id} восстановлена из корзины`)
})
//delete todo
router.delete('/:id', async (req, res) => {
    try {
        console.log(req.params)
        const {id} = req.params
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
            id
        ])

        res.json(`Todo with id = ${id} was deleted`)
        
    } catch (err) {
        console.error(err.message)
        
    }
})

module.exports = router;