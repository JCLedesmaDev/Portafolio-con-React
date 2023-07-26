import express from "express";
import { authHandler } from "@middlewares/authHandler";
import { loginUser, getUser, updateUser } from './controller'
import { validatorLoginRequest } from './validators/Login.request'
import { validatorUpdateUser } from "./validators/UpdateUser.request";
import { fileMulterHandler } from "@middlewares/fileMulterHandler";

const router = express.Router();

router.post('/login', validatorLoginRequest, loginUser)

router.get('/getUser', getUser)

// router.post('/updateUser', authHandler, validatorUpdateUser, updateUser)

router.post('/updateUser', fileMulterHandler([
    {name:'imageProfile', maxCount: 2},
    {name:'lala', maxCount: 1}
]), validatorUpdateUser, updateUser)

export default router  