// para persistir os dados, vamos salvar num arquivos atráves do fs = file system, que é um metodo interno do node.
// diferença do fs/promises e fs | o fs/promises consegue trabalhar com promessas, async, await, .then .catch > já o só fs pode trabalhar com stream, readable, writable e transform já que o fs/promises não consegue.

import fs from "node:fs/promises"

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {}

    //esse construtor é executado assim que a classe Database é instanciado, ou seja, assim que o server começar a rodar, Database é instaciado, e o constructor recupera os dados no arquivo de banco de dados. 
    constructor (){
        fs.readFile(databasePath, 'utf8')
        .then(data => {
            this.#database = JSON.parse(data)
        })
        .catch(() =>{
            this.#persist
        })
    }

    #persist(){
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    // select procurar a tabela no databse e vai retornar todos os dados dessa tabela selecionada.
    select(table){
        // esse data, recebe a table e verifica se há essa table dentro do #database e pegar. se não existir retorna array vazio. 
        const data = this.#database[table] ?? []

        return data;
    }

    //metodo inserte que vai receber a table onde ele vai inserir os dados, e o data que é os dados
    insert(table, data) {
        // esse if verifica se a tabela já existe no #database, se existir, ele apenas joga o data dentro dela.
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        } else {
            // se a tabela não existir ainda no #database, cria a tabela na hora e joga o data dentro. 
            this.#database[table] = [data]
        }

        this.#persist()

        return data;
    }
}