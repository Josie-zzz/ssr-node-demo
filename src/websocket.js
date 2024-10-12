const http = require('http')
const WebSocket = require('ws')

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
    // 可以根据请求的路径发送不同的响应
    if (req.url === '/custom-path') {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end('WebSocket custom path')
    } else {
        res.writeHead(404)
        res.end()
    }
})

// 创建 WebSocket 服务器，并指定路径
const wss = new WebSocket.Server({ server, path: '/custom-path' })

// 每个不同的客户端都会触发一次连接
wss.on('connection', function connection(ws) {
    console.log('Client connected')

    // 监听客户端消息
    ws.on('message', function incoming(message) {
        console.log('received: %s', message)
        // 将消息广播给所有连接的客户端
        wss.clients.forEach(function each(client) {
            // 广播给非当前的客户端
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString())
            }
        })
    })

    // 监听连接关闭
    ws.on('close', () => {
        console.log('Client disconnected')
    })
})

const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
