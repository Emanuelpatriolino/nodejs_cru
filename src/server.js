import http from "node:http"
const users = []
const server = http.createServer((req, res) => {
    const {method, url} = req
    if( method === "POST" && url === "/users"){
        users.push(
            {
                id:1,
                nome:"emanuel",
                email:"emanuel@@exemple.com",
                idade:25
            },
            {
                id:2,
                nome:"vanessa",
                email:"vanessa@@exemple.com",
                idade:24
            },
            {
                id:3,
                nome:"arthur",
                email:"arthur@@exemple.com",
                idade:3
            },
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