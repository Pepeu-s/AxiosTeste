import {useState} from 'react';
import axios from 'axios';

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
        <div>
            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNome(e.target.value)}
                        disabled={enviando}
                        />
                </div>
                <div>
                    <label htmlFor="link">Link do Projeto</label>
                    <input
                        type="text"
                        id="link"
                        value={link}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLink(e.target.value)}
                        disabled={enviando}
                        />
                </div>
                <div>
                    <label htmlFor="turma">Turma</label>
                    <input
                        type="text"
                        id="turma"
                        value={turma}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTurma(e.target.value)}
                        disabled={enviando}
                        />
                </div>

                <button type="submit" disabled={enviando}>
                    {enviando ? 'Enviando...' : 'Enviar'}
                </button>
            </form>
        </div>
    );
};

export default FormularioProjeto;