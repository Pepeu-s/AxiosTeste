import {useState} from 'react';
import axios from 'axios';
import './FormularioProjeto.css';

interface DadosDoProjeto {
    nome: string;
    link: string;
    turma: string;
}

function FormularioProjeto() {
    const API_URL = 'https://server-for-forms-zqx1.onrender.com/submit';
    const [nome, setNome] = useState<string>('');
    const [enviando, setEnviando] = useState<boolean>(false);
    const [link, setLink] = useState<string>('');
    const [turma, setTurma] = useState<string>('');
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();  
    
        if (!nome||!link||!turma) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        setEnviando(true);
        const dadosParaEnviar: DadosDoProjeto = {
            nome: nome,
            link: link,
            turma: turma
        };
        try { 
            const response = await axios.post(API_URL, dadosParaEnviar);

            alert('Projeto enviado com sucesso!');
            console.log('Resposta do servidor:', response.data);
            setNome('');

        }catch (error) {
            console.error('Houve um erro ao enviar o projeto:', error);
            alert('Erro ao enviar o projeto. Por favor, tente novamente.');
        } finally {
            setEnviando(false);
        };
    }

    return (
        // Adicione uma classe ao container principal e a cada elemento do formulário.

<div>
    <form onSubmit={handleSubmit} className="meu-formulario">
        <h2>Adicionar Projeto</h2>
        <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
                type="text"
                id="nome"
                className="form-input"
                placeholder="Ex: Meu Portfólio"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                disabled={enviando}
            />
        </div>

        <div className="form-group">
            <label htmlFor="link">Link do Projeto</label>
            <input
                type="text"
                id="link"
                className="form-input"
                placeholder="https://github.com/seu-usuario/repo"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                disabled={enviando}
            />
        </div>

        <div className="form-group">
            <label htmlFor="turma">Turma</label>
            <input
                type="text"
                id="turma"
                className="form-input"
                placeholder="Ex: Turma 2025"
                value={turma}
                onChange={(e) => setTurma(e.target.value)}
                disabled={enviando}
            />
        </div>

        <button type="submit" className="submit-button" disabled={enviando}>
            {enviando ? 'Enviando...' : 'Enviar Projeto'}
        </button>
    </form>
</div>
    );
};

export default FormularioProjeto;