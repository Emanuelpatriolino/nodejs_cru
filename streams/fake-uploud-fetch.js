import { Readable } from "node:stream"

class deUMaCem extends Readable{
     index = 1

    _read(){
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

fetch('http://localhost:3334', {
    method:"POST",
    body: new deUMaCem(),
    duplex:"half"
}).then( response => {
    return response.text()
})
.then(data => {
    console.log(data)
})