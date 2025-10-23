import http from "node:http"
import { randomUUID } from "node:crypto"
import { json } from "./middlewares/json.js"
import { Database } from "./middlewares/database.js"

const database = new Database()

const server = http.createServer(async (req, res) => {
    
    const {method, url} = req

    await json(req, res)
    //esse json é uma função que esta na pasta middlewares, isso nada mais é do que um "interceptador", são facil de ser identificados porque sempre recebem como parametros REQ e RES que vão ser tratador lá dentro quando foram interceptados

    if ( method === "POST" && url === "/users"){
        const { name, email } = req.body

        const user = {
            id: randomUUID(),
            name,
            email
        }

        database.insert('users', user)

        return res.writeHead(201).end()
    }
    
    if (method === "GET" && url === "/users"){
        const users = database.select('users')
        
        return res.end(JSON.stringify(users))
    }

    return res.writeHead(404).end()
})

server.listen(3000)
