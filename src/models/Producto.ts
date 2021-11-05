// const Sequelize = require('sequelize');
import { Model, DataTypes } from 'sequelize';
import {database} from '../database/db';

export class Producto extends Model {
    public descripcion!: string;
    public precio!: number;
    public numero_existencia!: number;
    public status!: boolean;
}
export interface ProductoI {
    descripcion: string;
    precio: number;
    numero_existencia: number;
    status: boolean;
}
Producto.init (
    {
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        precio: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        numero_existencia: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM,
            values:['Activado','Desactivado'],
            defaultValue: 'Activado',
            allowNull: false
        },
    },
    {
        tableName: "productos",
        sequelize: database,
        timestamps: true
    }
)