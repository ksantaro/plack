var express = require('express');
var router = express.Router();

var client = require('../postgres.js');
var currentClient = client.getClient();

router.get('/all/:uid', function(req, res, next) {
    const data = req.params;
    console.log(req.params.uid, "GET METHOD");
    const userID = req.params.uid;
    const allQueryDirectMessages = {
        text: ` SELECT jsonb_pretty(jsonb_agg(js_object)) result
                FROM (
                    SELECT json_build_object(
                    'uid', dms.uid2,
                    'name', dms.fusername,
                    'ufid', dms.ufid,
                    'messages', json_agg(direct_messages)
                    ) AS js_object
                    FROM (
                    SELECT *,
                    json_build_object(
                        'ufid', dms.ufid,
                        'text', dms.text,
                        'date', dms.date,
                        'senderid', dms.senderid,
                        'senderUsername', dms.username
                    ) as direct_messages
                    FROM ( SELECT f.ufid, text, date, dm.senderid, u.username, u2.uid AS uid2, u2.username AS fusername
                            FROM friends f, users u, direct_messages dm, users u2
                            WHERE ((f.uid1 = $1 AND dm.senderid = u.uid AND u2.uid = f.uid2) OR
                                    (f.uid2 = $1 AND dm.senderid = u.uid AND u2.uid = f.uid1))
                                    AND dm.ufid = f.ufid
                            ORDER BY date DESC) AS dms) AS dms
                    group by uid2, fusername, ufid
                    order by ufid) AS s`,
        values: [req.params.uid] //will use userID instead
    }
    currentClient.query(allQueryDirectMessages, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            let direct_messagesObject = results.rows[0].result;
            console.log(direct_messagesObject);
            // ""'uid', cm.uid,"" removed

            const allQueryChannels = {
                // text: ` SELECT DISTINCT jsonb_pretty(jsonb_agg(js_object)) result
                //         from (
                //         SELECT json_build_object(
                //             'name', cm.name,
                //             'chid', cm.chid,
                //             'messages', jsonb_agg(channel_messages)
                //         ) AS js_object
                //         FROM (
                //             SELECT
                //             c.name,
                //             cm.*,
                //             json_build_object(
                //                 'chid', cm.chid,
                //                 'text', cm.text,
                //                 'date', cm.date,
                //                 'senderid', cm.senderid,
                //                 'senderUsername', cm.username
                //             ) AS channel_messages
                //             FROM channels c, user_channels uc,  (channel_messages INNER JOIN users ON uid = senderid) AS cm
                //             WHERE $1 = uc.uid AND uc.chid = cm.chid AND c.chid = uc.chid
                //         ) AS cm
                //         GROUP BY uid, name, cm.chid
                //         ORDER BY cm.chid
                //         ) AS s`,
                text: ` SELECT jsonb_pretty(jsonb_agg(js_object)) result
                        FROM (
                            SELECT json_build_object(
                            'name', cms.name,
                            'chid', cms.chid,
                            'messages', json_agg(channel_messages)
                            ) AS js_object
                            FROM (
                            SELECT *,
                                json_build_object(
                                'chid', cms.chid,
                                'text', cms.text,
                                'date', cms.date,
                                'senderid', cms.senderid,
                                'senderUsername', cms.senderName
                                ) AS channel_messages
                            FROM ( SELECT c.chid, c.name, text, date, u.username as creatorName, u.uid AS creatorid, u2.uid AS senderid, u2.username AS senderName
                                    FROM channels c, user_channels uc, users u, channel_messages cm, users u2
                                    WHERE $1 = uc.uid AND c.chid = uc.chid AND cm.chid = c.chid
                                        AND u.uid = c.creatorid AND cm.senderid = u2.uid
                                    ORDER BY date desc    
                                ) AS cms) AS cms
                            GROUP BY name, chid
                            ORDER BY chid) AS s`,
                values: [req.params.uid], //uid
            }
            currentClient.query(allQueryChannels, (err2, results2) => {
                if (err2) {
                    console.log(err2);
                } else {
                    let channel_messagesObject = results2.rows[0].result;
                    const allMessagesObject = {
                        direct_messages: direct_messagesObject,
                        channel_messages: channel_messagesObject,
                    }
                    res.send(allMessagesObject);
                }
            });
            // res.send(JSON.stringify(dir);
        }
    });
});


router.post('/friend', function(req, res, next) {
    const data = req.body.data; //uid, email, first_name, last_name
    const addFriendQuery = {
        text: ` INSERT INTO friends(uid1, uid2)
                SELECT $1, newFriend.uid
                FROM (SELECT u.uid
                      FROM users u
                      WHERE u.email = $2) AS newFriend
                
                WHERE NOT EXISTS (
                SELECT *
                FROM friends f
                WHERE (($1 = f.uid1 AND newFriend.uid = f.uid2)
                    OR ($1 = f.uid2 AND newFriend.uid = f.uid1))
                )
                RETURNING *`,
        values: [data.uid, data.email]
    }
    currentClient.query(addFriendQuery, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            const ufid = result.rows[0].ufid;
            let friendAddedMessage = `Hello, my name is ${data.first_name} ${data.last_name} and we are now friends on plack.`;
            const startMessageQuery = {
                text: 'INSERT INTO direct_messages(ufid, text, senderid) VALUES($1, $2, $3) RETURNING *',
                values: [ufid, friendAddedMessage, data.uid] // own id will be used for notes
            }
            currentClient.query(startMessageQuery, (err2, result2) => {
                if (err2) {
                    console.log(err2);
                } else {
                    res.send(result2);
                }
            });
        }
    });
});

router.post('/channel', function(req, res, next) {
    const data = req.body.data; //uid, channel_name, first_name, last_name
    console.log(data);
    const addChannelQuery = {
        text: `INSERT INTO channels(name, creatorid) VALUES($1, $2) RETURNING *`,
        values: [data.channel_name, data.uid]
    }
    currentClient.query(addChannelQuery, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result.rows);
            const chid = result.rows[0].chid;
            const connectChannelToUserQuery = {
                text: `INSERT INTO user_channels(uid, chid) VALUES($1, $2) RETURNING *`,
                values: [data.uid, chid]
            }
            currentClient.query(connectChannelToUserQuery, (err2, result2) => {
                if (err2) {
                    console.log(err2);
                } else {
                    const channelMadeMessage = `Hello, my name is ${data.first_name} ${data.last_name} and I created the channel ${data.channel_name}`;
                    const startMessageQuery = {
                        text: `INSERT INTO channel_messages(chid, text, senderid) VALUES($1, $2, $3) RETURNING *`,
                        values: [chid, channelMadeMessage, data.uid]
                    }
                    currentClient.query(startMessageQuery, (err3, result3) => {
                        if (err3) {
                            console.log(err3);
                        } else {
                            res.send(result3);                          
                        }     
                    });
                }
            });
        }
    });
});

router.post('/friend/message', function(req,res, next) {
    const data = req.body.data; // senderID, ufid, and text
    console.log(data.ufid, "UFID")
    const friendMessageQuery = {
        text: 'INSERT INTO direct_messages(ufid, text, senderid) VALUES($1, $2, $3) RETURNING *',
        values: [data.ufid, data.text, data.senderID]
    }
    currentClient.query(friendMessageQuery, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

router.post('/channel/message', function(req,res, next) {
    const data = req.body.data; // senderID, chid, and text
    console.log(data.chid, "CHID")
    const friendMessageQuery = {
        text: 'INSERT INTO channel_messages(chid, text, senderid) VALUES($1, $2, $3) RETURNING *',
        values: [data.chid, data.text, data.senderID]
    }
    currentClient.query(friendMessageQuery, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

router.post('/channel/friend', function(req,res,next) {
    const data = req.body.data; //email, chid
    channelAddFriendQuery = {
        text:  `INSERT INTO user_channels(uid,chid)
                SELECT u.uid, $2
                FROM users u
                WHERE $1 = u.email AND 
                NOT EXISTS (
                    SELECT *
                    FROM user_channels uc
                    WHERE uc.uid = u.uid AND $2 = uc.chid 
                )
                RETURNING *`,
        values: [data.email, data.chid]
    }
    currentClient.query(channelAddFriendQuery, (err,result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result.rows);
            res.send(result.rows[0]);
        }
    });
});

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

module.exports = router;
