import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import { getConnection } from "../database/database.js";

const checkEmailExists = async (email) => {
    try {
        const connection = await getConnection();
        const [user] = await connection.query('SELECT idUsuario FROM usuario WHERE email = ?', [email]);
        return user.length > 0;
    } catch (error) {
        console.error('Error al verificar el correo electrónico:', error);
        throw error;
    }
};

const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { nombre, email, contraseña, numcuenta, tipo } = req.body;
    try {
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
        }
        const connection = await getConnection();
        const result = await connection.query(
            'INSERT INTO usuario (nombre, email, contraseña, numcuenta, tipo, saldo) VALUES (?, ?, ?, ?, ?, 0)',
            [nombre, email, contraseña, numcuenta, tipo]
        );
        res.status(201).json({ idUsuario: result.insertId, message: 'Usuario registrado con éxito' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error en el servidor al registrar el usuario' });
    }
};
export const metodosRegister ={ 
    registerUser, checkEmailExists 
};