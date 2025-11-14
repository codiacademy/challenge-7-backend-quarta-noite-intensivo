import jwt from "jsonwebtoken"
import { env } from 


export function generateToken(payload: object) {
return jwt.sign(payload, env.JWT_SECRET!, { expiresIn: '7d' })
}