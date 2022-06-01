const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes')

//middleware
app.use(cors())
app.use(express.json()) 

//TODOS
app.use('/todos', routes.todos)
//TYPES
app.use('/types', routes.types)
//LISTS
app.use('/lists', routes.lists)
//LINKS
app.use('/links', routes.links)
//CALENDAR
app.use('/calendar', routes.calendar)
//PEOPLES
app.use('/persons', routes.persons)

app.listen(3000, () => {
    console.log('Listening on 3000')    
})