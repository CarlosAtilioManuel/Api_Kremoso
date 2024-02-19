import { dbQuery, dbQueryFirst } from "../services/db";

export type Product = {
    id?: number;
    name: string;
    price: number;
}

const insertProduct = async (product: Product) => {
    await dbQuery("insert into product (name, price) values (?, ?)", [product.name, product.price])
    const retorno = await dbQuery("select seq as id from sqlite_sequence where name = 'product'");
    return  getProduct(retorno[0].id)
}

const updateProduct = async (product: Product) => {
    await dbQuery("UPDATE product SET name = ?, price = ? WHERE id_product = ?", [product.name, product.price, product.id])
    return getProduct(Number(product.id))
}

const listProducts = async () => {
    const retorno = await dbQuery(`SELECT * FROM product`)
    return retorno as Product[]
}

const getProduct = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM product WHERE id_product = ?`, [id])
    return retorno as Product | undefined
}

const deletProduct = async (id: number) => {
    const retorno = await dbQueryFirst(`DELETE FROM product WHERE id_product = ?`, [id])
    return retorno as Product | undefined
}

export const productModel = {
    insertProduct,
    listProducts,
    getProduct,
    deletProduct,
    updateProduct
}