import jwt from 'jsonwebtoken'
import 'dotenv/config'
import express from 'express'
export async function createToken(username, user_id) {
    const payload = {
        username: username, 
        sub: user_id,
    }
    const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {
        algorithm: 'HS256',
        expiresIn: '5h',
    });
    console.log(token);
    return token;
} 

export async function tokenStatus(token, app_instance) {
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, authorizedData) => {
        if (err) {
            return false;
        }
        return true;
    }) 
}