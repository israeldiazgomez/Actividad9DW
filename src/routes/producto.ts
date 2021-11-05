import { Request, Response, Application } from "express";
import { ProductoController } from "../controllers/producto.controller";

export class ProductoRoutes{
    public productoController: ProductoController = new ProductoController ();
   
    public routes(app: Application):void {
        app.route('/producto').get(this.productoController.getProductos)
        app.route('/createproducto').post(this.productoController.createProducto)
        app.route('/deteleproducto').delete(this.productoController.deleteProducto)
        app.route('/producto/:id').patch(this.productoController.updateProducto)
        app.route('/borrarproducto/:id').patch(this.productoController.borrarProducto)
    }
}