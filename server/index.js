const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

//middleware
app.use(cors())
app.use(express.json())

//TODOS

//get all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo ORDER BY todo_id")
        res.json(allTodos.rows)
        console.log('Был получен запрос заметок')
        
    } catch (err) {
        console.error(err)        
    }
})

//add new todo
app.post("/todos", async (req, res) => {
    try {
        const {description, type, comment} = req.body

        const now = new Date()
        // const time = `${now.getFullYear()}-${now.getDate()}-${now.getMonth()+1} ${now.getHours()}:${now.getMinutes().toString().length > 1 ? now.getMinutes() : '0' + now.getMinutes()}:${now.getSeconds().toString().length > 1 ? now.getSeconds() : '0' + now.getSeconds()}`
        const time = now.getFullYear() + "-" + 
        (now.getDate().toString().length > 1 ? now.getDate() : '0' + now.getDate()) + "-" + 
        (now.getMonth().toString().length > 1 ? (now.getMonth() + 1) : '0' + (now.getMonth() + 1)) + " " + 

        (now.getHours().toString().length > 1 ? now.getHours() : '0' + now.getHours()) + ":" + 
        (now.getMinutes().toString().length > 1 ? now.getMinutes() : '0' + now.getMinutes()) + ":" + 
        (now.getSeconds().toString().length > 1 ? now.getSeconds() : '0' + now.getSeconds())

        const newTodo = await pool.query("INSERT INTO todo (time, description, type, comment) VALUES($1, $2, $3, $4) RETURNING *",
        [time, description, type, comment])
        res.json(newTodo.rows[0])
        console.log(newTodo.rows[0])
        
    } catch (err) {
        console.error(err.message)        
    }
})

//update todo
app.put("/todos/:id", async (req, res) => {
    const {id} = req.params
    const {description, type} = req.body
    const updateTodo = await pool.query(
        "UPDATE todo SET description = $1, type = $2 WHERE todo_id = $3",
        [description, type, id])
    res.json("Обновлено")
})

//update todo to done
app.put("/todos/done/:id", async (req, res) => {
    const {id} = req.params
    const updateTodo = await pool.query(
        "UPDATE todo SET done = TRUE WHERE todo_id = $1",
        [id])
    res.json("Выполнено")
})

//update todo to deleted
app.put("/todos/to_trash/:id", async (req, res) => {
    const {id} = req.params
    const updateTodo = await pool.query(
        "UPDATE todo SET deleted = TRUE WHERE todo_id = $1",
        [id])
    res.json("Выполнено")
})

//delete todo
app.delete("/todos/:id", async (req, res) => {
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

//TYPES

//get all types
app.get("/types", async (req, res) => {
    try {
        const allTypes = await pool.query("SELECT * FROM types ORDER BY type_id")
        res.json(allTypes.rows)
        console.log('Был получен запрос типов заметок')
    } catch (err) {
        console.error(err)        
    }
})

//add new type
app.post('/types', async (req, res) => {
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
app.delete('/types/delete/:id', async (req, res) => {
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

//LINKS
app.get("/links", async (req, res) => {
    try {
        const allLinks = await pool.query("SELECT * FROM links ORDER BY link_id")
        res.json(allLinks.rows)
        console.log('Был получен запрос ссылок')
    } catch (err) {
        console.error(err)        
    }
})

//LISTS

//get all lists
app.get("/lists", async (req, res) => {
    try {
        const allLists = await pool.query("SELECT * FROM lists ORDER BY list_id")
        res.json(allLists.rows)
        console.log('Был получен запрос списков')
    } catch (err) {
        console.error(err)        
    }
})

//edit list
app.put("/lists/:id", async (req, res) => {
    const {id} = req.params
    const {title, description, type} = req.body
    const updateList = await pool.query(
        "UPDATE lists SET title = $1, description = $2, type = $3 WHERE list_id = $4",
        [title, description, type, id])
    res.json("Обновлено")
})


app.listen(3000, () => {
    console.log('Listening on 3000')    
})