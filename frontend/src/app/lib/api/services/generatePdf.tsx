// Serviço para geração de PDFs
import apiClient from '../client/apiClient'
import { Student } from '../../types/student'

// Função para gerar HTML do card do aluno baseado no MainContent
export const generateStudentCardHTML = (aluno: Student): string => {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Card do Aluno - ${aluno.nome || 'N/A'}</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Arial', sans-serif;
                background: rgb(237, 227, 227);
                padding: 20px;
                color: #333;
            }
            
            .card {
                background: #fff;
                border-radius: 20px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                padding: 30px;
                max-width: 800px;
                margin: 0 auto;
            }
            
            .profile-pic {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                object-fit: cover;
                margin: 0 auto 20px;
                display: block;
                border: 3px solid #ccc;
            }
            
            .info-section {
                margin-bottom: 1.5rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid #e0e0e0;
            }
            
            .info-section:last-child {
                border-bottom: none;
            }
            
            .section-title {
                font-weight: bold;
                color: #555;
                margin-bottom: 0.5rem;
                font-size: 0.9rem;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .info-item {
                display: flex;
                margin: 0.3rem 0;
                align-items: baseline;
            }
            
            .label {
                font-weight: 600;
                color: #444;
                min-width: 120px;
                font-size: 0.8rem;
            }
            
            .value {
                color: #333;
                word-break: break-word;
                flex-grow: 1;
            }
            
            .access-link {
                color: #2563eb;
                text-decoration: none;
                font-size: 0.8rem;
                margin-left: 10px;
            }
            
            .access-link:hover {
                text-decoration: underline;
            }
            
            .header {
                text-align: center;
                margin-bottom: 30px;
            }
            
            .header h1 {
                color: #003c78;
                font-size: 1.8rem;
                margin-bottom: 10px;
            }
            
            .header p {
                color: #666;
                font-size: 1rem;
            }
        </style>
    </head>
    <body>
        <div class="card">
            <div class="header">
                <h1>CARD DO ALUNO</h1>
                <p>Informações de Acesso e Dados Pessoais</p>
            </div>
            
            <img src="https://cdn-icons-png.flaticon.com/512/4196/4196591.png" alt="Profile" class="profile-pic">
            
            <div class="info-section">
                <div class="section-title">DADOS PESSOAIS</div>
                ${aluno.nome ? `<div class="info-item"><span class="label">NOME:</span><span class="value">${aluno.nome}</span></div>` : ''}
                ${aluno.serie ? `<div class="info-item"><span class="label">SÉRIE:</span><span class="value">${aluno.serie}</span></div>` : ''}
                ${aluno.unidade ? `<div class="info-item"><span class="label">UNIDADE:</span><span class="value">${aluno.unidade}</span></div>` : ''}
                ${aluno.matricula ? `<div class="info-item"><span class="label">MATRÍCULA:</span><span class="value">${aluno.matricula}</span></div>` : ''}
            </div>
            
            ${aluno.email ? `
            <div class="info-section">
                <div class="section-title">E-MAIL <span class="access-link">ACESSE AQUI</span></div>
                <div class="info-item"><span class="label">E-MAIL:</span><span class="value">${aluno.email}</span></div>
                ${aluno.senha_email ? `<div class="info-item"><span class="label">SENHA:</span><span class="value">${aluno.senha_email}</span></div>` : ''}
            </div>
            ` : ''}
            
            ${aluno.sfb ? `
            <div class="info-section">
                <div class="section-title">SFB <span class="access-link">ACESSE AQUI</span></div>
                <div class="info-item"><span class="label">USUÁRIO:</span><span class="value">${aluno.sfb}</span></div>
                ${aluno.senha_sfb ? `<div class="info-item"><span class="label">SENHA:</span><span class="value">${aluno.senha_sfb}</span></div>` : ''}
            </div>
            ` : ''}
            
            ${aluno.richmond ? `
            <div class="info-section">
                <div class="section-title">RICHMOND <span class="access-link">ACESSE AQUI</span></div>
                <div class="info-item"><span class="label">USUÁRIO:</span><span class="value">${aluno.richmond}</span></div>
                ${aluno.senha_r ? `<div class="info-item"><span class="label">SENHA:</span><span class="value">${aluno.senha_r}</span></div>` : ''}
            </div>
            ` : ''}
            
            ${aluno.arvore_senha ? `
            <div class="info-section">
                <div class="section-title">ARVORE <span class="access-link">ACESSE AQUI</span></div>
                <div class="info-item"><span class="label">USUÁRIO:</span><span class="value">${aluno.arvore_senha}</span></div>
            </div>
            ` : ''}
            
            ${aluno.evolucional ? `
            <div class="info-section">
                <div class="section-title">EVOLUCIONAL <span class="access-link">ACESSE AQUI</span></div>
                <div class="info-item"><span class="label">USUÁRIO:</span><span class="value">${aluno.evolucional}</span></div>
                ${aluno.senha_evo ? `<div class="info-item"><span class="label">SENHA:</span><span class="value">${aluno.senha_evo}</span></div>` : ''}
            </div>
            ` : ''}
        </div>
    </body>
    </html>
  `;
};

// Função para gerar PDF do card do aluno
export const generateStudentCardPDF = async (matricula: string, htmlContent: string): Promise<void> => {
  try {
    const response = await apiClient.post('/users/alunos/card-pdf', {
      htmlContent,
      matricula
    }, {
      responseType: 'blob' // Importante para arquivos binários
    });

    // Criar link temporário para download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `card_aluno_${matricula}.pdf`);
    document.body.appendChild(link);
    link.click();
    
    // Limpeza
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  } catch (error) {
    console.error('Erro ao baixar card do aluno:', error);
    throw new Error('Falha ao baixar card do aluno');
  }
};

// Função principal que combina geração de HTML e PDF
export const generateAndDownloadStudentCardPDF = async (aluno: Student): Promise<void> => {
  const htmlContent = generateStudentCardHTML(aluno);
  await generateStudentCardPDF(aluno.matricula, htmlContent);
};
