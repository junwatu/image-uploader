'use strict'

const express = require('express')
const path = require('path')
const formidable = require('formidable')
const server = express()
const fs = require('fs')
const mime = require('mime')
const PORT = 5005
const upload_dir = path.join(__dirname, 'uploads')

server.use(express.static(path.join(__dirname, 'public')))
server.use(express.static(upload_dir))

const filetypes = ['image/png', 'image/jpeg']

server.get('/', (req, res) => {
  res.sendFile('index.html')
})
server.get('/service/images', (req, res) => {
  let images = []
  fs.readdir(upload_dir, (err, files) => {
    if (!err) {
      for (let imageIndex = 0; imageIndex < files.length; imageIndex++) {
        let ftype = mime.lookup(path.join(upload_dir, files[imageIndex]))
        if (filetypes.indexOf(ftype) !== -1) {
          let data = {}
          data.ImageId = imageIndex
          data.ImageName = files[imageIndex]
          images.push(data)
        }
      }
      res.json(images)
    } else {
      res.end()
    }
  })
})

server.post('/upload', (req, res) => {
  let form = new formidable.IncomingForm()
  form.uploadDir = path.join(__dirname, 'uploads')
  form.hash = true
  form.multiples = false
  form.keepExtensions = true

  form.parse(req, (err, fields, files) => {
    if (!err) {
      console.log(files.file.name)
      console.log(files.file.path)
      console.log(files.file.type)
    }
    res.end()
  })
})

server.listen(PORT, () => {
  console.log(`App berjalan pada port ${PORT}`)
})
