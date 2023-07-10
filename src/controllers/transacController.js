import { db } from '../database.js'
import dayjs from 'dayjs'

export async function postTransac(req, res) {
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')
    if (!token) return res.sendStatus(401)

    const session = await db.collection("session").findOne({ token })
    if (!session) return res.sendStatus(401)

    const { userId } = session
    const { tipo } = req.params
    const { valor, descricao } = req.body

    if (tipo !== 'entrada' && tipo !== 'saida')
        return res.sendStatus(422)

    try {
        const date = dayjs().format('DD/MM')
        await db.collection(tipo).insertOne({ valor, descricao, userId, date })
        res.sendStatus(201)
    } catch (err) {
        return res.status(500).send(err.message)
    }

}

export async function getTransac(req, res) {
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')
    if (!token) return res.sendStatus(401)

    const session = await db.collection("session").findOne({ token })
    if (!session) return res.sendStatus(401)

    const { userId } = session

    try {
        const entrada = await db.collection("entrada").find({ userId }).sort({ date: - 1 }).toArray()
        const saida = await db.collection("saida").find({ userId }).sort({ date: - 1 }).toArray()

        const transacs = [...entrada, ...saida]
        res.send(transacs)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

