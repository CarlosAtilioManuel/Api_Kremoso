import dotenv from 'dotenv'

dotenv.config()

import sqlite3 from 'sqlite3'

const DATABASE_FILE = process.env.DATABASE_FILE

if (!DATABASE_FILE) {
    throw new Error("O Arquivo de base de dados 'DATABASE_FILE' não foi encontrado  e ou informado, por favor verifique isso e o informe ou o crie e o informe e só então tente novamente.")
}

export const openConnection = () => {
    const db = new sqlite3.Database(DATABASE_FILE)

    return db
}

export const dbQueryFirst = async(query: string, params: any[]) => {
    const retorno = await dbQuery(query, params)
    return retorno[0]
}

export const dbQuery = async (query: string, params?: any[]) => {
    const db = openConnection()

    return new Promise<any[]>((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if(err)
                reject(err)
            else
                resolve(rows)
        })
    })
    .finally(()=> {
        db.close()
    })
}