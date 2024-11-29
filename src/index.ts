import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()
const PORT = 5000

app.use(express.json())
app.use(cors({origin: 'http://localhost:5173'}))

app.post('/api', async (req, res) => {
    const {email, name} = req.body

    if (!email || !name) return res.status(400).json({message:'Email and name required fields'})

    try {
        
        const createdRow = await prisma.waitList.create({
            data: {
                email,
                name
            }
        })

        res.json(createdRow)
    } catch (error) {
        res.status(400).json({message: error})
    }
        
    res.json({message:'Hello world'})
})

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})