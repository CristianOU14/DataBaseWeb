import { getConnection } from "../database/database.js";
const getUsuario = async (req,res) =>
    {   
        try 
        {
            const connection = await getConnection()
            const result = await connection.query('SELECT * FROM Usuario')
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
            const result = await connection.query('SELECT * FROM Transaccion')
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
             const result = await connection.query('SELECT * FROM Prestamo')
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
             const result = await connection.query('SELECT * FROM Reporte')
            res.json(result[0]);
        } catch (error) 
        {
            console.log ('error');
            res.status(500)
        }
    }       
export const metodosBanco = {
    getUsuario,getTransacciones,getPrestamos,getReportes
};
