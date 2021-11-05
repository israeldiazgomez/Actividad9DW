
import { Request, Response } from "express";
import { Producto, ProductoI } from "../models/Producto"

export class ProductoController {
    public async getProductos(req: Request, res: Response){
    
        try {
            const productos = await Producto.findAll()
            if(!productos){
                res.status(400).json({msg: 'Cliente invalido'})
            }
    
            return res.status(200).json({productos})
        } catch (error) {
            res.status(500).json({msg: "Sin conexion con la base de datos"})
        }
    }
    public async createProducto(req: Request, res: Response){
        const body: ProductoI = req.body;
        try {
            if((!body.descripcion && !body.precio && !body.numero_existencia))
            //esta es la que va seguido de la anterior 
            return res.status(400).json({msg: 'some data is requiered'})
            const productoExist: Producto | null = await Producto.findOne(
                {
                    where: {descripcion: body.descripcion},
                }
            )
            if(productoExist){
                return res.status(400).json({msg: "descripcion ya existe!!"})
            }

            const producto = await Producto.create(body);


            res.status(200).json({producto})

            } catch (error) {
                res.status(500).json({msg: "Error al crear producto"})
            }
    }

    public async deleteProducto(req: Request, res: Response){
        try {

            const { id } = req.body;
        
            const response = await Producto.destroy({
              where: { id: id }
            })
            .then( function(data){
              const res = { success: true, data: data, message:"Realizado el recorrido" }
              return res;
            })
            .catch(error => {
              const res = { success: false, error: error }
              return res;
            })
            res.json(response);
        
          } catch (e) {
            console.log(e);
          }
    }

    public async updateProducto(req: Request, res:Response){
        const { id: pk } = req.params;
         const {
             id,
             descripcion,
             precio,
             numero_existencia,
             status
            } = req.body;
     
          try {
             let body: ProductoI = {
                descripcion,
                precio,
                numero_existencia,
                status
             }
             const ProductoExist: ProductoI | null = await Producto.findByPk(pk)


            await Producto.update(
                body,
                {
                where: {id: pk}  
                }
             )
            const producto: ProductoI | null = await Producto.findByPk(pk)
            res.status(200).json({producto})  
            } catch (error) {
            return res.status(500).json({msg : 'error internal'})
             }
        }

    public async borrarProducto(req: Request, res: Response){
        const {id:pk}= req.params;
        try {
            const ProductoExist: ProductoI | null = await Producto.findByPk(pk);

          if (!ProductoExist) return res.status(500).json({msg: ' no existe'})

          await Producto.update(
              {
                  status:"Desactivado"
              },
                  {
                      where: {id:pk}
                  }
              
          );
          return res.status(200).json({msg: ' fue eliminado'})

        } catch (error) {
            
        }
    }
    
}