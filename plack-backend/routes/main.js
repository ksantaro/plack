var express = require('express');
var router = express.Router();

var client = require('../postgres.js');
var currentClient = client.getClient();

//EXAMPLE
// router.post('/login', function(req, res, next) {
//     const data = req.body.data;
//     const loginQuery = {
//       text: 'SELECT * FROM users WHERE email = $1',
//       values: [data.email]
//     }
//     currentClient.query(loginQuery, (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         if(result.rows.length == 0) { //if user does not exist
//           console.log('user does not exist');
//         } else {
//           if (data.password == result.rows[0].password) { //if passwords match set session
//             req.session.user = result.rows[0];
//             res.json(req.session.user);
//             // console.log("user succesfully logged in")
//           }
//         }
//       }
//     });
//   });

router.get('/all/:uid', function(req, res, next) {
    const data = req.params;
    console.log(req.params.uid, "GET METHOD");
    const userID = req.params.uid;
    const allQuery = {
        // text: `SELECT f.ufid, text, senderid, date, u.uid
        //        FROM friends f, direct_messages dm, users u
        //        WHERE u.uid = $1 AND (f.uid1 =  u.uid OR f.uid2 = u.uid) AND dm.ufid = f.ufid`,
        text: ` SELECT DISTINCT jsonb_pretty(jsonb_agg(js_object)) result
                from (
                SELECT json_build_object(
                    'uid', dm.uid,
                    'name', dm.username,
                    'direct_messages', jsonb_agg(direct_messages)
                ) AS js_object
                FROM (
                    SELECT
                    f.*,
                    u2.* ,
                    json_build_object(
                        'ufid', dm.ufid,
                        'text', dm.text,
                        'date', dm.date,
                        'senderid', dm.senderid
                    ) AS direct_messages
                    FROM friends f, users u, users u2, direct_messages dm
                    WHERE u.uid = $1 AND
                    ((u.uid = f.uid1 AND u2.uid = f.uid2)
                            OR (u.uid = f.uid2 AND u2.uid = f.uid1))
                            AND dm.ufid = f.ufid
                ) AS dm
                GROUP BY uid, username
                ) AS s`,
        values: [req.params.uid] //will use userID instead
    }
    currentClient.query(allQuery, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            let direct_messagesObject = results.rows[0].result;
            console.log(direct_messagesObject);
            res.send(direct_messagesObject);
            // res.send(JSON.stringify(dir);
        }
    });
});

module.exports = router;
