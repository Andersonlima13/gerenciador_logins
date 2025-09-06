// src/lib/api/services/studentService.ts
// servico de estudante, onde devemos colocar os metodos esperados do banco


import apiClient from '../client/apiClient'
import { Student, CreateStudentDto } from '../../types/student'



/// O studentService é responsável por como obter os dados da api
// faz um fetch , espera uma promessa dos dados do back-end, esses dados vem da interface  <Student[]>
export const fetchStudents = async (): Promise<Student[]> => {
  try {
    const response = await apiClient.get('/users/alunos')  /// resposta é um get nessa rota 
    return response.data.map((aluno: { matricula: string }) => ({  // retorno deve ser um mapeamento dos dados, deixamos explicito
      id: aluno.matricula,                                          // que vamos tratar matricula como id
      ...aluno}))  
  } catch (error) {
    console.error('Erro ao buscar alunos:', error)      /// devemos alterar aqui para ao redenrizar , rederizar a tabela inteira (sem dados)
    throw new Error('Falha ao carregar alunos')         // ao inves de apenas um erro no console
  }
}

/// funcao para busca indiviudal de um aluno , deve fazer o fetch dos dados do card
// src/app/lib/api/services/studentService.ts
export const fetchStudentByMatricula = async (matricula: string): Promise<Student> => {
  const response = await apiClient.get(`users/alunos?matricula=${matricula}`);
  
  // Encontre o aluno no array retornado
  const aluno = response.data.find((a: { matricula: string }) => a.matricula === matricula);
  if (!aluno) throw new Error('Aluno não encontrado');

  return {
    id: aluno.id,        // Use o ID real
    matricula: aluno.matricula,
    ...aluno
  };
};



// funcao de download dos arquivos via csv

export const handleDownloadStudents = async () => {
  try {
    const response = await apiClient.get('users/alunos');   // faz o get dos dados em /alunos e transforma em csv
    const data = response.data;

    // Converter JSON para CSV
    const csvContent = convertJsonToCsv(data);

    // Cria um blob com o CSV
    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'alunos_export.csv'; // Extensão alterada para .csv
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

  } catch (error) {
    console.error('Erro ao exportar alunos:', error);
    throw new Error('Falha ao exportar dados dos alunos');
  }
};

// Função auxiliar para converter JSON para CSV
function convertJsonToCsv(data: any[]): string {
  if (data.length === 0) return '';

  // Extrai os cabeçalhos (nomes das colunas)
  const headers = Object.keys(data[0]);
  
  // Cria as linhas do CSV
  const csvRows = [
    headers.join(','), // Cabeçalhos
    ...data.map(row => 
      headers.map(fieldName => {
        // Trata valores que podem conter vírgulas ou aspas
        let value = row[fieldName] === null || row[fieldName] === undefined ? '' : row[fieldName];
        if (typeof value === 'string') {
          value = value.replace(/"/g, '""'); // Escapa aspas
          if (value.includes(',') || value.includes('"') || value.includes('\n')) {
            value = `"${value}"`;
          }
        }
        return value;
      }).join(',')
    )
  ];

  return csvRows.join('\n');
}




// upload da planilha de alunos 

export const uploadStudentSpreadsheet = async (file: File): Promise<void> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await apiClient.post('/home/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // Adicione headers de autenticação se necessário
        // 'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    // Tratamento específico de erros
    let errorMessage = 'Falha ao enviar planilha';
    
    if (error.response) {
      if (error.response.status === 413) {
        errorMessage = 'Arquivo muito grande';
      } else if (error.response.data?.includes('duplicada')) {
        errorMessage = 'Matrícula duplicada encontrada';
      }
    }
    
    throw new Error(errorMessage);
  }
};



// modelo de planilha
export const downloadSpreadsheetTemplate = async (): Promise<void> => {
  try {
    const response = await apiClient.get('/home/download-modelo', {
      responseType: 'blob' // Importante para arquivos binários
    });

    // Criar link temporário para download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'modelo_alunos.xlsx');
    document.body.appendChild(link);
    link.click();
    
    // Limpeza
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  } catch (error) {
    console.error('Erro ao baixar modelo:', error);
    throw new Error('Falha ao baixar modelo');
  }
};




export const createStudent = async (data: CreateStudentDto): Promise<Student> => {
  try {
    const response = await apiClient.post('/users/alunos/create', data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar aluno:', error);
    throw new Error('Falha ao criar aluno');
  }
}

export const updateStudent = async (id: string, data: Partial<Student>) => {
  const response = await apiClient.patch(`/students/${id}`, data)
  return response.data
}




