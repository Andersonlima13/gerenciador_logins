// modelo aluno (como ele deve estar disposto no bd)

export type Student = {
  id: string;
  matricula: string;
  nome: string;
  serie: string;
  unidade: string;
  email: string;
  senha_email: string;
  senha_app: string;
  sfb: string;
  senha_sfb: string;
  richmond: string;
  senha_r: string;
  arvore_senha: string;
  evolucional: string;
  senha_evo: string;
  medalhei: string;
  };




/// ainda sem uso , deve servir para criar um estudante, o mesmo só deve ter 3 campos como "essenciais"
  
export type CreateStudentDto = {
    name: string;
    email: string;
    class: string;
    // Campos sem 'id' e status opcional
  };