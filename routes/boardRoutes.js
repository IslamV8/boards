const express = require('express');
const {
  createBoard,
  getBoard,
  updateBoard,
  deleteBoard,
  getUserBoards
} = require('../controllers/boardController');

const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', auth, getUserBoards);
router.post('/', auth, createBoard);
router.get('/:id', auth, getBoard);
router.put('/:id', auth, updateBoard);
router.delete('/:id', auth, deleteBoard);

module.exports = router;
