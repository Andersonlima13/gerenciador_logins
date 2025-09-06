const userController = require('./userController');
const authController = require('./authController');

// herda métodos do userController que o admin também pode usar
module.exports = {
  ...userController,
  ...authController,

createUser: async (req, res) => {
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
}
};