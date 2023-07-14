const express = require('express')
const app = express()
const fs= require('fs')
const cors = require('cors')

app.listen(3000, console.log("¡Servidor encendido!"))
app.use(cors())
app.use(express.json())

app.get("/home", (req, res) => {
res.send("Hello World Express Js")
})

app.post("/canciones", (req, res) => {
  
    const cancion = req.body

    const canciones = JSON.parse(fs.readFileSync("repertorio.json"))

    canciones.push(cancion)

    fs.writeFileSync("repertorio.json", JSON.stringify(canciones))

    res.send("Cancion agregada con éxito!")
    })

    app.get(
        "/canciones",(req,res)=>{
            const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
            res.json(canciones)
        }
    )

    app.put("/canciones/:id", (req, res) => {
        const { id } = req.params
        const cancion = req.body
        const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
        const index = canciones.findIndex(p => p.id == id)
        canciones[index] = cancion
        fs.writeFileSync("repertorio.json", JSON.stringify(canciones))
        res.send("Cancion modificada con éxito")
        })

        app.delete("/canciones/:id", (req, res) => {
            const { id } = req.params
            const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
            const index = canciones.findIndex(p => p.id == id)
            canciones.splice(index, 1)
            fs.writeFileSync("repertorio.json", JSON.stringify(canciones))
            res.send("Cancion eliminada con éxito")
            })

            app.get("/", (req, res) => {
                res.sendFile(__dirname + "/index.html")
                })
