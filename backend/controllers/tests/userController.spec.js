jest.mock('../../config/db', () => ({
  query: jest.fn(),
  end: jest.fn()
}));

const pool = require('../../config/db');
const userController = require('../userController');

describe('userController | getAllStudents', () => {
  let req, res;

  beforeEach(() => {
    req = {}; 
    res = { json: jest.fn() };
    jest.clearAllMocks();
  });

  it('Deve retornar todos os alunos presentes no banco de dados como JSON', async () => {
    const fakeRows = [{ id: 1, nome: 'João' }, { id: 2, nome: 'Maria' }];
    pool.query.mockResolvedValue({ rows: fakeRows });

    await userController.getAllStudents(req, res);

    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM ALUNO');
    expect(res.json).toHaveBeenCalledWith(fakeRows);
  });

  it('Deve lidar com erro no banco de dados sem quebrar', async () => {
    pool.query.mockRejectedValue(new Error('DB error'));

    await userController.getAllStudents(req, res);

    expect(res.json).not.toHaveBeenCalled();
  });

  afterAll(async () => {
    await pool.end(); // agora existe no mock
  });
});
