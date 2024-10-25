import { getConnection } from "../database/database.js";

const pushRegister = async (req,res) =>
    {   
        const name = req.body.nombre;
        try {
            const connection = await getConnection();
            const result = await connection.query('SELECT * FROM usuario WHERE nombre = ?', [name]);
            res.json(result[0]);
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            res.status(500).json({ error: 'Error al obtener usuario' });
        }
    }
export const metodosReportes = {
        pushRegister
    };
