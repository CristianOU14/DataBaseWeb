import { getConnection } from "../database/database.js";
const getUsuarios = async (req,res) =>
    {   
        try 
        {
            const connection = await getConnection()
            const result = await connection.query('select * from usuario')
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
const getReportes = async (req,res) =>
    {   
        try 
        {
            const connection = await getConnection()
             const result = await connection.query('SELECT * FROM reporte')
            res.json(result[0]);
        } catch (error) 
        {
            console.log ('error');
            res.status(500)
        }
    }       
export const metodosBanco = {
    getUsuarios,getTransacciones,getPrestamos,getReportes
};
