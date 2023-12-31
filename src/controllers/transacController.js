import { db } from '../database.js'
import dayjs from 'dayjs'

export async function postTransac(req, res) {
    const { userId } = res.locals.session
    const { tipo } = req.params
    let { valor, descricao } = req.body

    if (tipo !== 'entrada' && tipo !== 'saida')
        return res.sendStatus(422)

    if (tipo == 'saida') {
        valor = valor * -1
    }
    try {
        const date = dayjs().format('DD/MM')
        await db.collection("transacoes").insertOne({ valor, descricao, userId, date })
        res.sendStatus(201)
    } catch (err) {
        return res.status(500).send(err.message)
    }

}

export async function getTransac(req, res) {
    const { userId } = res.locals.session

    try {
        const transacs = await db.collection("transacoes").find({ userId }).sort({ _id: - 1 }).toArray()
        let total = 0
        for (let i = 0; i < transacs.length; i++) {
            const valor = transacs[i].valor
            total = total + valor
        }
        const objResponse = {
            total,
            transacs
        }

        console.log(objResponse);
        res.send(objResponse)


    } catch (err) {
        res.status(500).send(err.message)
    }
}