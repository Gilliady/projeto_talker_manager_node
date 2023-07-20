const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = ({ body }, res, next) => {
    try {
        if (body.email && body.email.length > 0) {
            if (emailRegex.test(body.email)) {
                next();
            }
            throw new Error('O "email" deve ter o formato "email@email.com"');
        }
        throw new Error('O campo "email" é obrigatório');
    } catch (e) {
        res.status(400)
            .json({ message: e.message });
    }
};

const validatePassword = ({ body }, res, next) => {
    try {
        if (body.password && body.password.length > 0) {
            if (body.password.length > 6) {
                next();
            }
            throw new Error('O "password" deve ter pelo menos 6 caracteres');
        }
        throw new Error('O campo "password" é obrigatório');
    } catch (e) {
        res.status(400)
            .json({ message: e.message });
    }
};
const validateLogin = [
    validateEmail,
    validatePassword,
];
module.exports = { validateLogin };