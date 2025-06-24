import express from 'express'

import { registerUser } from '../controllers/userController'

const userRouter=express.Router()

userRoute.post('/register',registerUser)





export default userRouter