import dotenv from 'dotenv'

dotenv.config()

import express, { Response } from "express"
import { useRoutes } from './routes/indexRoute'
import bodyParser from 'body-parser'

const PORT = process.env.SERVER_PORT || 3333
const app = express()

app.use(bodyParser.json())
useRoutes(app)

app.get('/', (res: Response)=> {
    const sortedItem = Math.floor(Math.random() * 100)

    res.status(200).json({
        message: 'API OK! ' + sortedItem
    })
})

app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}/api`);
})