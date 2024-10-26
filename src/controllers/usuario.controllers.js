import { getConnection } from "../database/database.js";

const getUsuarios = async (req, res) => {   
    try {
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM usuario');
        res.json(result[0]);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

const getUsuario = async (req, res) => {   
    const { email, contraseña } = req.body;
    try {
        const connection = await getConnection();
        const correctPassword = await passwordValidation(email, contraseña);
        if (correctPassword == 'OK') {
            const result = await connection.query('SELECT * FROM usuario WHERE email = ? AND contraseña = ?', [email, contraseña]);
            res.json(result[0]);
        } else {
            console.log(correctPassword);
            res.status(400).json({ message: correctPassword }); 
        }
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
};

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

const passwordValidation = async (email, password) => {
    try {
        const connection = await getConnection();
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
            const [user] = await connection.query('SELECT contraseña FROM usuario WHERE email = ?', [email]);
            if (user[0].contraseña.trim() === password) {
                return 'OK';
            } else {
                return 'La contraseña que ingresaste es incorrecta';
            }
        } else {
            return 'El correo que ingresaste no está registrado';
        }
    } catch (error) {
        console.error('Error al verificar el correo electrónico:', error);
        throw error;
    }
};

export const metodosUsuarios = {
    getUsuarios,
    getUsuario,
};