import { check } from "express-validator";
import { getConnection } from "../database/database.js";

const checkCuentaDestino = async (cuentaDestino) => {
    try {
        const connection = await getConnection();
        const user = await connection.query('SELECT numcuenta FROM Usuario WHERE numcuenta = ?', [cuentaDestino]);

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
        const saldo = await connection.query('SELECT saldo FROM Usuario WHERE idUsuario = ?', [idUsuario]);
        if (saldo < valorTransferir) {
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
        return res.status(400).json({ errors: errors.array() });
    }

    const { cuentaDestino, valorTransferir, tipoTransferencia, idusuario, fecha } = req.body.idUsuario;

    try {
        const cuentaDestinoExists = await checkCuentaDestino(cuentaDestino);
        if (!cuentaDestinoExists) {
            return res.status(400).json({ message: 'La cuenta destino no existe' });
        }

        const connection = await getConnection();

        if (tipoTransferencia == 'normal') {
            const saldoSuficiente = await checkSaldo(idusuario, valorTransferir);
            if (!saldoSuficiente) {
                return res.status(400).json({ message: 'Saldo insuficiente' });
            } else {
                await connection.query('UPDATE Usuario SET saldo = saldo - ? WHERE idUsuario = ?', [valorTransferir, idusuario]);
                await connection.query('UPDATE Usuario SET saldo = saldo + ? WHERE numcuenta = ?', [valorTransferir, cuentaDestino]);
                await connection.query('INSERT INTO transaccion (cuentadestino, monto, tipo, usuario_id, fecha) VALUES (?, ?, ?, ?, ?)', [cuentaDestino, valorTransferir, tipoTransferencia, idusuario, fecha]);

                res.status(201).json({ message: 'Transferencia realizada con éxito' });
            }
        } else if (tipoTransferencia == 'depositar') {
            const saldoSuficiente = await checkSaldo(idusuario, valorTransferir);
            if (!saldoSuficiente) {
                return res.status(400).json({ message: 'Saldo insuficiente' });
            } else {
                await connection.query('UPDATE Usuario SET saldo = saldo + ? WHERE numcuenta = ?', [valorTransferir, cuentaDestino]);
                await connection.query('INSERT INTO transaccion (cuentadestino, monto, tipo, usuario_id, fecha) VALUES (?, ?, ?, ?, ?)', [cuentaDestino, valorTransferir, tipoTransferencia, idusuario, fecha]);

                res.status(201).json({ message: 'Depósito realizado con éxito' });
            }
        } else if (tipoTransferencia == 'retirar') {
            const saldoSuficiente = await checkSaldo(idusuario, valorTransferir);
            if (!saldoSuficiente) {
                return res.status(400).json({ message: 'Saldo insuficiente' });
            }

            await connection.query('UPDATE Usuario SET saldo = saldo - ? WHERE idUsuario = ?', [valorTransferir, idusuario]);
            await connection.query('INSERT INTO transaccion (cuentadestino, monto, tipo, usuario_id, fecha) VALUES (?, ?, ?, ?, ?)', [cuentaDestino, valorTransferir, tipoTransferencia, idusuario, fecha]);

            res.status(201).json({ message: 'Retiro realizado con éxito' });
        } else {
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