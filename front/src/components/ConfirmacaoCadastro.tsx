import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "./ConfirmacaoCadastro.css";

interface UserData {
  cpf: string;
  nomeCompleto: string;
  telefone: string;
  email: string;
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
}

const ConfirmacaoCadastro: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/confirmar/${token}`);
        console.log('Dados do usuário:', response.data);
        setUserData(response.data.data);
        setLoading(false);
      } catch (err: any) {
        console.error('Erro ao buscar dados do usuário:', err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const handleAtivacao = async () => {
    try {
      const response = await api.post(`/confirmar/${token}`);
      console.log('Resposta da ativação:', response.data);
      alert("Cadastro ativado com sucesso!");
    } catch (err: any) {
      console.error('Erro ao ativar cadastro:', err.message);
      alert(err.message);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="confirmacao-container">
      <img src="\logo_elos_noback.png" alt="Logo" className="confirmacao-logo" />
      <div className="confirmacao-main">
        <h1>Confirmação de Cadastro</h1>
        {userData && (
          <div>
            <p>Os dados abaixo estão corretos?</p>
            <p>CPF: {userData.cpf}</p>
            <p>Nome Completo: {userData.nomeCompleto}</p>
            <p>Telefone: {userData.telefone}</p>
            <p>Email: {userData.email}</p>
            <p>CEP: {userData.cep}</p>
            <p>Logradouro: {userData.logradouro}</p>
            <p>Número: {userData.numero}</p>
            <p>Bairro: {userData.bairro}</p>
            <p>Cidade: {userData.cidade}</p>
            <p>Estado: {userData.estado}</p>
            <button onClick={handleAtivacao}>Sim, confirmo e quero ativar meu cartão</button>
          </div>
        )}
      </div>
      <footer className="app-footer">
        <p>Todos os direitos reservados a Elos Group Enterprise</p>
      </footer>
    </div>
  );
};

export default ConfirmacaoCadastro;