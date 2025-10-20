import { Readable, Transform, Writable } from "node:stream"

class deUMaCem extends Readable{
     index = 1

    _read() {
    // _read é um metodo obrigatorio dentro de Readable.
        const i = this.index++

        setTimeout(()=>
            {
                if(i > 100){
                    this.push(null)
                } else {
                    const buf = Buffer.from(String(i))
                    // não se pode passar um numero literal, converter em buffer e string. 

                    this.push(buf)
                }
            }, 100)
    }
}

class invertePorNegativo extends Transform{
    _transform(chunk, encoding, callback){
        const transformado = Number(chunk.toString()) * -1
        callback(null, Buffer.from(String(transformado)))
    }
}

class multiplicarPorDez extends Writable{
    _write(chunk, encoding, callback){
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

new deUMaCem()
.pipe(new invertePorNegativo())
.pipe( new multiplicarPorDez())

// pipe é um (cano) > encaminhamento, de uma fonte para um destino, readable > writable.