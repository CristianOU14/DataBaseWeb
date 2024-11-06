import { check, validationResult } from "express-validator";
import { getConnection } from "../database/database.js";

const checkCuentaDestino = async (cuentaDestino) => {
    try {
        const connection = await getConnection();
        const [user] = await connection.query('SELECT numcuenta FROM Usuario WHERE numcuenta = ?', [cuentaDestino]);

        if (user.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error al verificar la cuenta destino:', error);
        throw error;
    }
};

const checkSaldo = async (idUsuario, valorTransferir) => {
    try {
        const connection = await getConnection();
        const [saldo] = await connection.query('SELECT saldo FROM Usuario WHERE idUsuario = ?', [idUsuario]);
        if (saldo.length === 0 || saldo[0].saldo < valorTransferir) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        console.error('Error al verificar el saldo:', error);
        throw error;
    }
};

const registerTransferencia = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Errores de validación:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { cuentaDestino, valorTransferir, tipoTransferencia, idUsuario, fecha } = req.body;

    try {
        console.log('Datos de la solicitud:', req.body);

        if (!idUsuario) {
            console.log('El campo idUsuario es nulo o indefinido');
            return res.status(400).json({ message: 'El campo idUsuario es requerido' });
        }

        

        

        if (tipoTransferencia === 'normal') {
            
            const cuentaDestinoExists = await checkCuentaDestino(cuentaDestino);
            if (!cuentaDestinoExists) {
                console.log('La cuenta destino no existe:', cuentaDestino);
                return res.status(400).json({ message: 'La cuenta destino no existe' });
            }
        }

        const connection = await getConnection();

        if (tipoTransferencia === 'normal') {
            const saldoSuficiente = await checkSaldo(idUsuario, valorTransferir);
            if (!saldoSuficiente) {
                console.log('Saldo insuficiente para el usuario:', idUsuario);
                return res.status(400).json({ message: 'Saldo insuficiente' });
            } else {
                const transfer = 'transferencia'
                await connection.query('UPDATE Usuario SET saldo = saldo - ? WHERE idUsuario = ?', [valorTransferir, idUsuario]);
                await connection.query('UPDATE Usuario SET saldo = saldo + ? WHERE numcuenta = ?', [valorTransferir, cuentaDestino]);
                await connection.query('INSERT INTO Transaccion (usuario_id, tipo, cuentadestino, monto, fecha) VALUES (?, ?, ?, ?, ?)', [idUsuario, transfer, cuentaDestino, valorTransferir, fecha]);

                console.log('Transferencia realizada con éxito');
                res.status(201).json({ message: 'Transferencia realizada con éxito' });
            }
        } else if (tipoTransferencia == 'depositar') {
            const transfer = 'depósito'
            await connection.query('UPDATE Usuario SET saldo = saldo + ? WHERE numcuenta = ?', [valorTransferir, cuentaDestino]);
            await connection.query('INSERT INTO Transaccion (usuario_id, tipo, cuentadestino, monto, fecha) VALUES (?, ?, ?, ?, ?)', [idUsuario, transfer, cuentaDestino, valorTransferir, fecha]);

            console.log('Depósito realizado con éxito');
            res.status(201).json({ message: 'Depósito realizado con éxito' });
        } else if (tipoTransferencia == 'retirar') {
            const saldoSuficiente = await checkSaldo(idUsuario, valorTransferir);
            if (!saldoSuficiente) {
                console.log('Saldo insuficiente para el usuario:', idUsuario);
                return res.status(400).json({ message: 'Saldo insuficiente' });
            }
            const transfer = 'retiro'
            await connection.query('UPDATE Usuario SET saldo = saldo - ? WHERE idUsuario = ?', [valorTransferir, idUsuario]);
            await connection.query('INSERT INTO Transaccion (usuario_id, tipo, cuentadestino, monto, fecha) VALUES (?, ?, ?, ?, ?)', [idUsuario, transfer, cuentaDestino, valorTransferir, fecha]);

            console.log('Retiro realizado con éxito');
            res.status(201).json({ message: 'Retiro realizado con éxito' });
        } else {
            console.log('Error en la transferencia:', tipoTransferencia);
            res.status(400).json({ message: 'Error en la transferencia' });
        }
    } catch (error) {
        console.error('Error al realizar la transferencia:', error);
        res.status(500).json({ error: 'Error en el servidor al realizar la transferencia' });
    }
};

export const metodosTransferencia = {
    registerTransferencia
};