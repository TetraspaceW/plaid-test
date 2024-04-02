import express from 'express'
import { createLinkTokenForIDVerification } from './plaid'
import cors from 'cors'

const app = express()

app.use(cors())

app.get('/token', (_req, res) => {
    createLinkTokenForIDVerification().then((data) => {
        res.send(data)
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})  