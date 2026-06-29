
const http = require('http')
const { Server } = require('socket.io')
const express = require('express')
const { CronJob } = require('cron')
const app = express()
const { socketPort } = process.env
const server = http.createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
    console.log('Usuario conectado ', socket.id)

    socket.on('msg', (data) => {
        console.log('Evento MSG: ', data)
        socket.emit('recibir_saludo', 'Hola bienvenido a este mundo')
    })

    socket.on("disconnect", () => {
        console.log("Cliente desconectado")
    });
})

/* const job = new CronJob(
	'* * * * *',
	function () {
        console.log('saludo enviado')
		io.emit('saludo', 'Bienvenido')
	},
	null,
	true,
	'America/Los_Angeles'
) */

server.listen(socketPort, () => {
    console.log(`IO server corriendo en el puerto ${socketPort}`)
})

const setModuleChat = (server) => {

}

module.exports = setModuleChat