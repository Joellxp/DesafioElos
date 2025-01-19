const express = require('express');
const { Pool } = require('pg');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 3000;
const crypto = require('crypto');

app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'clubeelos',
    password: 'post123',
    port: 5432
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jailson18mano@gmail.com',
        pass: 'hkqfnfwpnouplxgc'
    }
});

app.post('/api/solicitacao', async (req, res) => {
    const { cpf, nomeCompleto, telefone, email, cep, logradouro, numero, bairro, cidade, estado } = req.body;
    const token = crypto.randomBytes(20).toString('hex'); 
    console.log('Dados Recebidos:', req.body); 
    try {
        const result = await pool.query(
            'INSERT INTO memberships (cpf, nome_completo, telefone, email, cep, logradouro, numero, bairro, cidade, estado, token, confirmado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, FALSE) RETURNING *', 
            [cpf, nomeCompleto, telefone, email, cep, logradouro, numero, bairro, cidade, estado, token]
        );
        console.log('Dados inseridos:', result.rows[0]);

        const mailOptions = {
            from: 'jailson18mano@gmail.com',
            to: email,
            subject: 'Clube POP - Ativação de Cadastro',
            text: `Estamos muito felizes pelo seu interesse em usar nosso cartão, agora falta pouco. Basta você clicar no link abaixo e confirmar os seus dados cadastrais.\n\nhttp://localhost:3000/confirmar/${token}`
        };

        await transporter.sendMail(mailOptions);
        console.log('Email enviado para:', email);
        
        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error('Erro ao processar a solicitação:', err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/api/confirmar/:token', async (req, res) => {
    const { token } = req.params;
    try {
        const result = await pool.query(
            'SELECT * FROM memberships WHERE token = $1', 
            [token]
        );
        if (result.rowCount === 0) {
            return res.status(400).json({ success: false, message: 'Token inválido' });
        }
        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error('Erro ao buscar dados do usuário:', err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/confirmar/:token', async (req, res) => {
    const { token } = req.params;
    try {
        const result = await pool.query(
            'UPDATE memberships SET confirmacao = TRUE WHERE token = $1 RETURNING *', 
            [token]
        );
        if (result.rowCount === 0) {
            return res.status(400).json({ success: false, message: 'Token inválido' });
        }
        res.json({ success: true, message: 'Cadastro confirmado com sucesso!' });
    } catch (err) {
        console.error('Erro ao confirmar o cadastro:', err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});