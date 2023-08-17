import express from "express";
import { getUser, updateUser, deleteUser, followUser, UnFollowUser,getAllUsers } from "../controllers/UserController.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";


const router = express.Router();

router.get('/:id', getUser)
router.put('/:id', authMiddleWare, updateUser)
router.delete('/:id', authMiddleWare,deleteUser)
router.put('/:id/follow', authMiddleWare,followUser)
router.put('/:id/unfollow', authMiddleWare,UnFollowUser)
router.get('/', getAllUsers)
export default router;