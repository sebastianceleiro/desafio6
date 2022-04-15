import productos from "./productos.js" ;
import express from "express";
import listadoProductos from "./funciones.js"
import { Server as IOServer } from "socket.io";
import { Server as HttpServer} from 'http'
import * as fs from 'fs';


const producto = new listadoProductos ();
const app = express () ;
const httpServer = new HttpServer(app)
const io = new IOServer (httpServer)
const router = express.Router() ;
const port = 8080 ;
const mensajes = [] ;



app.use("/", router)
app.use(express.static("./")) ;
router.use(express.json())
router.use(express.urlencoded({extended: true}))

const server = httpServer.listen (port, () => {
    console.log ("Servidor iniciado...")
})

server.on ("error", error  => {
    console.log ("ocurrio un error", error)
})

io.on ("connection", (socket) => {
    io.sockets.emit ("productos", {productos})
    io.sockets.emit ("mensajes", {mensajes})

    socket.on ("nuevoMensaje", data => {
        mensajes.push(data) ;
        io.sockets.emit ("mensajes", {mensajes})
        let parseado = JSON.stringify(data) + " \n" ;
        fs.appendFileSync("./log.txt", parseado) })
})

router.post (("/productos"), (req,res) => {
    producto.nuevoIngreso(req,res)
   
})

