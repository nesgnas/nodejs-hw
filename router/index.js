var userRouter = require('./database');

var router = {
    run: function(request, response) {
        userRouter.run(request, response);
    }
};

module.exports = router;
