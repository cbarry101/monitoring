const express = require('express')
const path = require('path')

const app =  express()

const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: 'a3731a1ae5c746b291ec78142b286476',
  captureUncaught: true,
  captureUnhandledRejections: true,
})


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('HTML file served successfully')
})

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Take us to warp ${port}`))