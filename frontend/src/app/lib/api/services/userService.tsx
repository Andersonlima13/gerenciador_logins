import { Users } from '../../types/users'
import apiClient from '../client/apiClient'

export const fetchStudents = async (): Promise<Users[]> => {
    try {
      const response = await apiClient.get('/users/alunos')  /// resposta é um get nessa rota 
      return response.data.map((user: { matricula: string }) => ({  // retorno deve ser um mapeamento dos dados, deixamos explicito
        id: user.id,                                          // que vamos tratar matricula como id
        ...user}))  
    } catch (error) {
      console.error('Erro ao buscar alunos:', error)      /// devemos alterar aqui para ao redenrizar , rederizar a tabela inteira (sem dados)
      throw new Error('Falha ao carregar alunos')         // ao inves de apenas um erro no console
    }
  }

