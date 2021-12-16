const express = require('express')
const path = require('path')


const Rollbar = require('rollbar')
const rollbar = new Rollbar({
    accessToken: 'a3731a1ae5c746b291ec78142b286476',
    captureUncaught: true,
    captureUnhandledRejections: true,
})

let students = []

const app =  express()
app.use(express.json())


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('HTML file served successfully')
})

app.post('/api/student', (req,res) => {
    let {name} = req.body
    name = name.trim()

    students.push(name)
    rollbar.log('Student added successfully', {author: 'Connor', type: 'manual'})

    res.status(200).send(students)
})
app.use(rollbar.errorHandler())
const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Take us to warp ${port}`))