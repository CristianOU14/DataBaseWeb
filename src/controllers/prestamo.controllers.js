import { getConnection } from "../database/database.js";
import { check, validationResult } from "express-validator";

const getPrestamo = async (req, res) => {
    const idusuario = req.body.usuario_id;
    try {
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM Prestamo WHERE usuario_id = ?', [idusuario]);
        res.json(result[0]);
    } catch (error) {
        console.error('Error al obtener el prestamo:', error);
        res.status(500).json({ error: 'Error al obtener el prestamo' });
    }
};

const getPrestamos = async (req, res) => {
    try {
        console.log(req.body);
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM prestamo');
        res.json(result[0]);
    } catch (error) {
        console.error('Error al obtener los prestamos:', error);
        res.status(500).json({ error: 'Error al obtener los prestamos' });
    }
};

const registerPrestamo = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Errores de validación:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { idUsuario, valorPedir, plazo, estado, fecha } = req.body;

    if (!idUsuario || !valorPedir || !plazo || !estado || !fecha) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    try {
        console.log('Datos de la solicitud:', req.body);
        if (estado === 'pendiente') {
            const connection = await getConnection();
            const newEstado = 'aprobado';
            const result = await connection.query('INSERT INTO Prestamo (usuario_id, monto, plazo, estado, fecha_solicitud) VALUES (?, ?, ?, ?, ?)', [idUsuario, valorPedir, plazo, newEstado, fecha]);
            res.status(201).json({ idPrestamo: result.insertId, message: 'Prestamo registrado con éxito' });
        } else {
            res.status(400).json({ message: 'Error en el estado del prestamo' });
        }
    } catch (error) {
        console.error('Error al registrar el prestamo:', error);
        res.status(500).json({ error: 'Error en el servidor al registrar el prestamo' });
    }
};

export const metodosPrestamos = {
    getPrestamos, getPrestamo, registerPrestamo
};