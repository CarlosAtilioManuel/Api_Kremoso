import { Router } from "express";
import { productController } from "../controllers/productController";

const productRouter = Router()

productRouter.post("/", productController.insertProduct)
productRouter.get("/", productController.listProducts)
productRouter.get("/:id", productController.getProduct)
productRouter.delete("/:id", productController.deleteProduct)
productRouter.put("/", productController.updateProduct)

export default productRouter