const db = require('../db/db');

module.exports = function(app){
    app.get('/segments', (req, res) => {
        console.log("/segments");
        let seg = [];
        let coef = 1;

        seg.push( Math.round( Math.random() * (1000 - 10) + 10) * 100 );

        if( seg[0] >= 50000 ){
            coef = -1;
        }

        while( seg.length != 16 ){
            let rnum = Math.round(Math.random() * (40 - 10) + 10);
            seg[seg.length] = seg[seg.length-1] + ( coef * rnum * 100);
        }
        db.setSegments(seg);
        res.status(200).json({seg});
    });
}