const express = require('express')
const app = express()
const { renderToString } = require('react-dom/server')
const port = 4000
const Home = require('./home')
const React = require('react')
const prefix = '/api/'

// app.use(express.static('lib'));

const content = renderToString(<Home />)

console.log(content)

app.get('/home', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>hello888</title>
            </head>
            <body>
                ${ content }
            </body>
        </html>
    `)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
