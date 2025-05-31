import fs from 'fs'
import path from 'path'

const getHtml = (req, res) => {
  const filePath = path.resolve('index.html')
  res.sendFile(filePath)
}

const getCanciones = (req, res) => {
  try {
    const repertorio = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'))
    res.json(repertorio)
  } catch (error) {
    console.error('Error al cargar el repertorio:', error)
  }
}

export { getHtml, getCanciones }
