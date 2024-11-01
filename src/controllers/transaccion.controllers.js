import { getConnection } from "../database/database.js";

const getTransaccion = async (req,res) =>
    {   
        const idusuario  = req.body.idUsuario;
        try 
        {
            const connection = await getConnection()
            const result = await connection.query('SELECT * FROM transaccion WHERE usuario_id = ?', [idusuario])
            res.json(result[0]);
        } catch (error) 
        {
            console.log ('error');
            res.status(500)
        }
    }
const getTransacciones = async (req,res) =>
    {   
        try 
        {
            const connection = await getConnection()
            const result = await connection.query('SELECT * FROM transaccion')
            res.json(result[0]);
        } catch (error) 
        {
            console.log ('error');
            res.status(500)
        }
    }
export const metodosTransaccion = {
    getTransacciones,getTransaccion
    };