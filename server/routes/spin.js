const db = require('../db/db');

module.exports = function(app){
    app.post('/spin', function(req, res){
        let rnum = Math.round( Math.random() * (17 - 1) + 1 );
        db.getSegments((seg) => {
            db.updateUserScore(seg[rnum-1]);
            res.status(200).json({rnum});
        });
    });
};