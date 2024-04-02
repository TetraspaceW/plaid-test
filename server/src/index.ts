import express from 'express'
import { createLinkTokenForIDVerification } from './plaid'

const app = express()

app.get('/', (_req, res) => {
    res.send('Hello World!')
})

app.get('/token', (_req, res) => {
    createLinkTokenForIDVerification().then((data) => {
        res.send(data)
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})  