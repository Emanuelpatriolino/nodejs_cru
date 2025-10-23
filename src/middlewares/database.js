export class Database {
    database = {}

    // select vai selecionar a tabela e ele vai retornar todos os dados dessa tabela selecionada.
    select(table){
        // esse data, recebe a table e verifica se há essa table dentro do database e pegar. se não existir retorna array vazio. 
        const data = this.database[table] ?? []

        return data;
    }

    //metodo inserte que vai receber a table onde ele vai inserir os dados, e o data que é os dados
    insert(table, data) {
        // esse if verifica se a tabela já existe no database, se existir, ele apenas joga o data dentro dela.
        if(Array.isArray(this.database[table])){
            this.database[table].push(data)
        } else {
            // se a tabela não existir ainda no database, cria a tabela na hora e joga o data dentro. 
            this.database[table] = [data]
        }

        return data;
    }
}