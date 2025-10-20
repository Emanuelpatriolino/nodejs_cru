import http from "node:http"
import { Transform } from "node:stream"
import { buffer } from "node:stream/consumers"

class invertePorNegativo extends Transform{
    _transform(chunk, encoding, callback){

        const transformado = Number(chunk.toString()) * -1

        console.log(transformado)

        callback(null, Buffer.from(String(transformado)))
    }
}

// req === readableStream
// res === writableStream

const server = http.createServer(async (req, res)=>{
    
    const buffers = []

    for await (const chunk of req){
        const pedacos = chunk
        console.log(pedacos.toString())
        // esse console mostra os dados chegando aos poucos, buffer é um pedaço binario > nesse caso 

        buffers.push(chunk)
        //mas a lista só será mostrado quando tiver os dados todos
    }

    //o codigo de baixo não acontece sem antes o codigo de cima te carregado os pedaços por completo. no caso a lista completa.

    const dadosFull = Buffer.concat(buffers).toString()
    //Buffer.concat para juntar todos os pedaços dentro da lista
    console.log(dadosFull)
    return res.end(dadosFull)
   
    // return req
    // .pipe(new invertePorNegativo())
    // .pipe(res)

})

server.listen(3334)