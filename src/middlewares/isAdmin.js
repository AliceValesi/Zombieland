module.exports = (req, res, next) =>
    {
        if (req.isAuthenticated() &&
        req.user.role === 'admin') {
            return next();
        }
        res.status(403).send('Accès refusé');

    };