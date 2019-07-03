const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database(':memory:', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');

    let segTableCreateQuery = `
    CREATE TABLE segments (
     seg_id INTEGER PRIMARY KEY,
     seg_value INTEGER NOT NULL UNIQUE
    );`;

    let usrScoreTableCreateQuery = `
    CREATE TABLE score (
     sc_id INTEGER PRIMARY KEY,
     sc_value INTEGER NOT NULL UNIQUE
    );`;

    db.run(segTableCreateQuery, [], (err) => {
        if (err) {
            return console.error(err.message);
        }
    });
    db.run(usrScoreTableCreateQuery, [], (err) => {
        if (err) {
            return console.error(err.message);
        } else {
            this.setUserScore(0);
        }
    });

});

exports.setSegments = function (seg) {

    let placeholders = seg.map((s) => '(?)').join(',');
    let sql = 'INSERT INTO segments(seg_value) VALUES ' + placeholders;

    db.run(sql, seg, (err) => {
        if (err) {
            return console.error(err.message);
        } else {
            console.log("Segments has successfully wrote to the DB.");
        }
    });
}

exports.getSegments = function (cb) {

    let sql = 'SELECT seg_value FROM segments;';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        let res = [];
        rows.forEach((row) => res.push(row.seg_value));
        if(res.length === rows.length){
            cb(res);
        }
    });
}

exports.setUserScore = function (score) {
    db.run(`INSERT INTO score(sc_value) VALUES(?)`, [score], (err) => {
        if (err) {
            return console.log(err.message);
        }
    });
}

exports.updateUserScore = function (score) {
    let sql = `UPDATE score
        SET sc_value = ?
        WHERE sc_id = ?`;

    db.all('SELECT sc_value FROM score WHERE sc_id = ?;', [1], (err, res) => {
        db.run(sql, [res[0].sc_value + score, 1], function (err) {
            if (err) {
                return console.error(err.message);
            }
        });
    });
}

exports.getUserScore = function (cb) {
    db.all('SELECT sc_value FROM score WHERE sc_id = ?;', [1], (err, row) => {
        if (err) {
            return console.log(err.message);
        }
        console.log("[getUserScore]: result: ", row[0].sc_value);
        cb(row[0].sc_value);
    });
}
