const db = require('../db/db');

module.exports = function(app){
    app.get("/score", (req, res) => {
        db.getUserScore( (score) => {
            console.log("Getting score: ", score);
            res.status(200).json({score});
        });
    });
}