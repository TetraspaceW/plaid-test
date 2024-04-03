import express from 'express'
import { createLinkTokenForIDVerification, getIdentityVerificationInfo } from './plaid'
import cors from 'cors'

const app = express()

app.use(cors())

// create link token for ID verification
app.get('/plaid/token', (_req, res) => {
    const userID = _req.query.user_id;

    if (typeof userID !== 'string') {
        res.status(400).send('Missing or invalid user_id query parameter')
        return
    }
    createLinkTokenForIDVerification(userID).then((data) => {
        res.send(data)
    })
})

// get identity verification data corresponding to link session id
app.get('/plaid/verify', (_req, res) => {
    const linkSessionId = _req.query.link_session_id;

    if (typeof linkSessionId !== 'string') {
        res.status(400).send('Missing or invalid link_session_id query parameter')
        return
    }

    getIdentityVerificationInfo(linkSessionId).then((data) => {
        res.send(data)
    })
})

// start server
app.listen(3000, () => {
    console.log('Server is running on port 3000')
})  