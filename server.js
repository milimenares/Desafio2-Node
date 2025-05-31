import express from 'express'
import 'dotenv/config'
import { getHtml, getCanciones } from './src/controllers/canciones.controllers.js'

const app = express()

const PORT = process.env.PORT ?? 3000 // hecho con variables de entorno

app.get('/', getHtml)

app.get('/repertorio', getCanciones)

app.listen(PORT, console.log(`Servidor andando http://localhost:${PORT}`))
