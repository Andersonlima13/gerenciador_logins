const User = require('../model/user');
const pool = require('../config/db'); // importa o pool


//
// ---- Postgres: Alunos ----
//
exports.getAllStudents = async (req, res) => {
    try {
      const query = 'SELECT * FROM ALUNO';
      const result = await pool.query(query);
      const alunos = result.rows;
      res.json(alunos)
    }
    catch(error){console.log(error)
    }

}

exports.getStudentById = async (req, res) => {
  try {
    const { matricula } = req.params;
    const result = await pool.query(
      'SELECT * FROM ALUNO WHERE matricula = $1',
      [matricula]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro no backend:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};




exports.createStudent = async (req, res) => {
  try {
    const { nome, matricula, email, unidade, serie, turma, turno, senha } = req.body;

    // Faz a concatenação da forma que você pediu
    const serieCompleta = `${serie}ª ${turma} ${turno}`;

    const result = await pool.query(
      `INSERT INTO ALUNO (nome, matricula, email, unidade, serie, senha_email) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [nome, matricula, email, unidade, serieCompleta, senha]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar aluno:', error);
    res.status(500).send('Erro ao criar aluno');
  }
};


// updateStudentById


exports.updateStudentById = async (req, res) => {
    try {
      const param = req.params.param;
      let query, values;

      if (/^\d+$/.test(param)) { 
          // Se o parâmetro for composto apenas por dígitos, considere como matrícula
          query = 'SELECT * FROM ALUNO WHERE MATRICULA = $1';
          values = [param];

          const result = await pool.query(query, values);

          if (result.rows.length === 0) {
              return res.status(404).send('Aluno não encontrado.');
          }

          const aluno = result.rows[0];
          res.json( { aluno });
      } else {
          // Caso contrário, considere como nome (usando ILIKE para case-insensitive match)
          query = 'SELECT * FROM ALUNO WHERE NOME ILIKE $1';
          values = [`%${param}%`];

          const result = await pool.query(query, values);

          if (result.rows.length === 0) {
              return res.status(404).send('Aluno não encontrado.');
          }

          const alunos = result.rows;
          res.render('rotateste', { alunos });
      }
  } catch (error) {
      console.error('Erro ao executar a consulta:', error);
      res.status(500).send('Erro ao executar a consulta.');
  }

};







exports.deleteStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM ALUNO WHERE matricula = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    res.json({ message: 'Aluno deletado com sucesso', aluno: result.rows[0] });
  } catch (error) {
    console.error('Erro ao deletar aluno:', error);
    res.status(500).send('Erro ao deletar aluno');
  }
};





//
// ---- MongoDB: Users ----
//




exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Falha ao carregar usuários' });
  }
};




exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({ message: 'Usuário deletado com sucesso', user });
  } catch (err) {
    console.error('Erro ao deletar usuário:', err);
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
};






/*
exports.createUser = async (req, res) => {
  const { email, password, perfil } = req.body;

  if (!email) {
    console.log('Insira um email valido');
    return res.status(422)
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    console.log('mensagemFalse', 'O usuário já existe! tente fazer login');
    return res.status(422)
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({ email, password: passwordHash, perfil });

  try {
    await user.save();
   console.log('mensagemTrue', 'Usuário criado com sucesso!');
    return res.status(201)
  } catch {
   // req.flash(
    //  'mensagemFalse',
   //   'Erro ao criar usuário! Atualize a página e tente novamente'
   // );
    console.log('erro ao criar o usuario')
    return res.status(500)
  }
};





*/
