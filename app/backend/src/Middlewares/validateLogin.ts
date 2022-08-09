import { Request, Response, NextFunction } from 'express';

const validateLoginEmail = async ( req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body; 

    if (!email) return res.status(400).json({ message: 'All fields must be filled'})

    next()
};

const validateLoginPassword = async ( req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;

    if (!password) return res.status(400).json({ message: 'All fields must be filled'});

    if (password.length < 6) return res.status(400).json({ message: 'All fields must be filled'});

    next()
}

export default {
    validateLoginEmail,
    validateLoginPassword
}