import { Response } from "express";

export const badRequest = (res: Response, err: string) => {
    return res.status(400).json({err})
}

export const notFound = (res: Response) => res.status(404).json({message: "Dados não encontrado, verifique se item existe ou não e tente novamente"})

export const ok = (res: Response) => res.sendStatus(200)

export const internalserverError = (res: Response, err: Error) => {
    return res.status(500).json({err: err.message})
}

export const validateNumber = (num: any) => (num.toString()) > 0
