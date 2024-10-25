import { getConnection } from "../database/database.js";

const getPrestamo = async (req,res) =>
    {   
        const idusuario  = req.body.usuario_id;
        try 
        {
            const connection = await getConnection()
             const result = await connection.query('SELECT * FROM prestamo WHERE usuario_id = ?', [idusuario])
            res.json(result[0]);
        } catch (error) 
        {
            console.log ('error');
            res.status(500)
        }
    } 

const getPrestamos = async (req,res) =>
    {   
        try 
        {
            const connection = await getConnection()
             const result = await connection.query('SELECT * FROM prestamo')
            res.json(result[0]);
        } catch (error) 
        {
            console.log ('error');
            res.status(500)
        }
    }
export const metodosPrestamos = {
    getPrestamos,getPrestamo
    };