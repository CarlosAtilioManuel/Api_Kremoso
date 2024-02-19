import { Application, Router } from "express"
import productRouter from "./productRoute"


export const useRoutes = (app: Application) => {
    const apiRouter = Router()
    apiRouter.use('/product', productRouter)

    app.use('/api/v1', apiRouter)
}