import { Request, Response } from "express";
import { Product, productModel } from "../models/productModel";
import { badRequest, internalserverError, notFound, validateNumber } from "../services/util";
import { ok } from "assert";

const insertProduct = (req: Request, res: Response) => {
    {
        const product = req.body

        if(!product)
            return badRequest(res, "Produto inválido")
        if(!product.name)
            return badRequest(res, "Informe o nome do produto")
        if(!validateNumber(parseFloat(product.price)))
            return badRequest(res, "Informe o preço")
    }

    const product = req.body as Product

    return productModel.insertProduct(product)
    .then(product => {
        res.json({product})
    })
    .catch((err) => internalserverError(res, err))
}

const updateProduct = async (req: Request, res: Response) => {
    {
        const product = req.body

        if(!product)
            return badRequest(res, "Produto inválido")
        if(!product.name)
            return badRequest(res, "Informe o nome do produto")
        if(!validateNumber(parseFloat(product.price)))
            return badRequest(res, "Informe o preço")

        const productSaved = await productModel.getProduct(product.id)

        if(!productSaved)
            return notFound(res)
    }

    const product = req.body as Product

    return productModel.updateProduct(product)
    .then(product => {
        res.json({product})
    })
    .catch((err) => internalserverError(res, err))
}

const listProducts = (req: Request, res: Response) => {
    req

    productModel.listProducts()
    .then(products => {
        res.json(products)
    })
    .catch((err) => internalserverError(res, err))
}

const getProduct = (req: Request, res: Response) => {
    let myid = req.params.id

    let id = Number.parseInt(myid.toString())

    {

        if(!validateNumber(id))
            return badRequest(res, "ID inválido")
    }

    return productModel.getProduct(id)
    .then((product) => {
        if(product)
            return res.json(product)
        else
            return notFound(res)
    })
    .catch((err) => internalserverError(res, err))
}

const deleteProduct = async (req: Request, res: Response) => {
    let myid = req.params.id

    let id = Number.parseInt(myid.toString())

    {
        if(!validateNumber(id))
            return badRequest(res, "ID inválido")

        const productSaved = await productModel.getProduct(id)

        if(!productSaved)
            return notFound(res)
    }

    return productModel.deletProduct(id)
    .then(() => ok(res))
    .catch((err) => internalserverError(res, err))
}

export const productController = {
    insertProduct,
    listProducts,
    getProduct,
    deleteProduct,
    updateProduct
}