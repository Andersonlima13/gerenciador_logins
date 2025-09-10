const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const adminController = require('../controllers/admWaiting for pgAdmin 4 to start...inController');
const authenticateToken = require('../middlewares/authenticateToken');

// ---- Alunos (Postgres) ----
router.get('/alunos', authenticateToken, userController.getAllStudents);
router.get('/alunos/:matricula', authenticateToken, userController.getStudentById);
router.post('/alunos/card-pdf', authenticateToken, userController.generateStudentCardPDF);
router.post('/alunos/create', userController.createStudent);
router.put('/alunos/update/:id', authenticateToken, userController.updateStudentById);
router.delete('/alunos/delete/:id', authenticateToken, userController.deleteStudentById);

// eu preciso realmente espeficiar os ids aqui ? 
router.post('/alunos/pdfs', authenticateToken, userController.generatePDFsForStudents);


// rotas de usuarios mongo db
// ---- Usuários (MongoDB) ----
router.get('/admin', userController.getAllUsers);
router.post('/admin/create', adminController.createUser);
router.delete('/admin/delete/:id', userController.deleteUserById);

module.exports = router;
