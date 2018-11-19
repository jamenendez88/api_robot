const IdChecker = {};

IdChecker.check = (req, res, next) => {
    const { id } = req.params;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        next();
    } else {
        res.status(500).jsonp("It it'snt a valid ObjectId format");
    }

   /*  if (typeof bearerToken !== 'undefined') {
        const split = bearerToken.split(" ");
        req.token = split[1];
        next();
    } else {
        res.status(401).json();
    } */
}

module.exports = IdChecker;