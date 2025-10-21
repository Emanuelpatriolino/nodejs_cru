import http from "node:http"
const users = []
const server = http.createServer(async (req, res) => {
    const {method, url} = req

    const buffers = []

    for await ( const chunk of req){
        buffers.push(chunk)
    }

    try{
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        req.body = null
    }

    if( method === "POST" && url === "/users"){
        const {id, name, email } = req.body
        users.push(
            {
                id:1,
                name,
                email,
            }
        )
        res.end()
        return;
    }
    if(method === "GET" && url === "/users"){
        res.writeHead(200, {"content-type" : "application/json"})
        res.end(JSON.stringify(users))
        return;
    }
    if (method === "PUT" && url === "/users"){
        const novoNome = "alterado22"
        users.splice(0, users[0].nome = novoNome)
        res.writeHead(200, {"contend-type" : "application/json"})
        res.end()
        return;
    }
    if(method === "DELETE" && url === "/users"){
        users.splice(1, users.length)

        res.writeHead(200, {"content-type" : "application/json"})
        res.end()
        return;
    }  

    res.writeHead(400).end("Not Found")
    return;
})
server.listen(3000)