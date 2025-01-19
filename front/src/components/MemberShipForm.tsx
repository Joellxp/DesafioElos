import React, { useState } from "react";
import './MembershipForm.css';

const MemberShipForm: React.FC = () => {
    const [formData, setFormData] = useState({
        cpf: '',
        nomeCompleto: '',
        telefone: '',
        email: '',
        cep: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Dados do formulário:', formData);
        try {
          const response = await fetch('/api/solicitacao', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          console.log('Resposta do servidor:', response);
          if (!response.ok) {
            throw new Error(`Erro ao enviar a solicitação: ${response.statusText}`);
          }

          const result = await response.json();
          console.log('Resultado da resposta:', result);
      
          if (result.success) {
            alert('Cadastro solicitado com sucesso! Verifique seu email.');
          } else {
            alert('Houve um problema. Tente novamente!');
          }
        } catch (error) {
          console.error('Erro ao enviar a solicitação:', error);
          alert('Erro ao enviar a solicitação. Tente novamente.');
        }
      };
      
    return (
        <div className="membership-form-container">
            <h2>Cadastro de Membro</h2>
            <form className="membership-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="cpf">CPF:</label>
                    <input type="text" id="cpf" name="cpf" placeholder="CPF" onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="nomeCompleto">Nome Completo:</label>
                    <input type="text" id="nomeCompleto" name="nomeCompleto" placeholder="Nome Completo" onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="telefone">Telefone:</label>
                    <input type="text" id="telefone" name="telefone" placeholder="Telefone" onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Email" onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="cep">CEP:</label>
                    <input type="text" id="cep" name="cep" placeholder="CEP" onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="logradouro">Logradouro:</label>
                    <input type="text" id="logradouro" name="logradouro" placeholder="Logradouro" onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="numero">Número:</label>
                    <input type="text" id="numero" name="numero" placeholder="Número" onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="bairro">Bairro:</label>
                    <input type="text" id="bairro" name="bairro" placeholder="Bairro" onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="cidade">Cidade:</label>
                    <input type="text" id="cidade" name="cidade" placeholder="Cidade" onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                    <label htmlFor="estado">Estado:</label>
                    <input type="text" id="estado" name="estado" placeholder="Estado" onChange={handleChange} required />
                </div>
                
                <button type="submit">Solicitar Adesão</button>
            </form>
        </div>
    );
};

export default MemberShipForm;