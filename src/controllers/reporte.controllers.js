import { getConnection } from "../database/database.js";

const getReportes = async (req,res) =>
    {   
        try 
        {
            const connection = await getConnection()
             const result = await connection.query('SELECT * FROM reporte')
            res.json(result[0]);
        } 
        catch (error) 
        {
            console.log ('error');
            res.status(500)
        }
    } 
const getReporte = async (req,res) =>
    {   
        const idusuario  = req.body.usuario_id;
        try 
        {
            const connection = await getConnection()
            const result = await connection.query('SELECT * FROM reporte WHERE usuario_id = ?', [idusuario])
            res.json(result[0]);
        } 
        catch (error) 
        {
            console.log ('error');
            res.status(500)
        }
    }
    export const metodosReportes = {
        getReportes,getReporte
    };