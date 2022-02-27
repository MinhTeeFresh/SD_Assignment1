var express = require('express');
var app = express();
var fs = require("fs");
app.use(express.json())

var PORT = process.env.PORT || 3000

app.use(express.static(__dirname));

/**
 * @description This is the location for the server to call
    a regular GET for the tasks:
    getting all users
    getting all tweets
 */
app.get('/tweets', function (req, res) {
    fs.readFile(__dirname + "/" + "favs.json", 'utf8', 
    function (err, data) {
        data = JSON.parse(data);
        res.send(data);
    });
})

/**
 * @description The unique GET for the task:
    searching for a tweet

    This gets the necessary parameters and compares
    the given id to id's in the JSON file until it finds
    a match. It then proceeds to send the entry with the given id.
 */

app.get('/tweets/:id', function (req, res) {
    var id = req.params.id;
    var found = false;
    fs.readFile(__dirname + "/" + "favs.json", 'utf8', 
    function (err, data) {
        newdata = JSON.parse(data);
        newdata.forEach(function (tweet, index) {
            if (!found && Number(tweet.id) === Number(id)) {
                res.send(newdata[index]);
            }
        });
    });
})

/**
 * 
 * @description This is the POST server call for the task:
   creating a tweet

   the server reads the JSON file and retrieves all the information
   it needs from the server. It creates a new entry and then pushes
   the entry into the parsed JSON file.
   The parsed JSON file is then edited with the new information
 */

app.post('/tweets', function (req, res) {
    var data = fs.readFileSync(__dirname + "/" + "favs.json");
    let newData = JSON.parse(data);

    let tweetdate = req.body.created_at;
    let tweetid = req.body.id;
    let tweettext = req.body.text;
    let tweetuid = req.body.user.id;
    let tweetName = req.body.user.screen_name;
    const newTweet = ({
        created_at: tweetdate,
        id: tweetid,
        text: tweettext,
        user: { id: tweetuid, screen_name: tweetName }
    });

    newData.push(newTweet);
    res.send("tweet successful")
    fs.writeFile(__dirname + "/" + "favs.json", 
    JSON.stringify(newData),
        (err) => {
            // Error checking
            if (err) throw err;
        });
})

/**
 * @description This is the server DELETE call for the task:
 * deleting a tweet
 * 
 * The sever recieves all the necessary parameters and reads
 * the JSON file. Then it proceeds to compare with all tweet.id
 * entries until it finds a match with the id given. It splices and
 * deletes the specific index and edits the JSON file with the new
 * content.
 */
app.delete('/tweets/:id', function (req, res) {
    let id = req.params.id;
    var found = false;
    fs.readFile(__dirname + "/" + "favs.json", 'utf8', 
    function (err, data) {
        newdata = JSON.parse(data);
        newdata.forEach(function (tweet, index) {
            if (!found && Number(tweet.id) === Number(id)) {
                newdata.splice(index, 1);
            }
        });
        fs.writeFile(__dirname + "/" + "favs.json", 
        JSON.stringify(newdata),
            (err) => {
                // Error checking
                if (err) throw err;
            });
    })
    res.send('Successfully deleted product!');
})

/**
 * @description This is the sever PUT call for tasks:
 * Change a user screen name
 * 
 * It receives all the necessary parameters and parses the
 * JSON file. It then compares with each entry of User: {name: }
 * until it finds a match. Then the User: {screen_name: } is changed
 * to the given screen name. The JSON file is then edited with the
 * changes.
 */

app.put('/tweets/:id', function (req, res) {
    var id = req.params.id;
    var newName = req.body.newName;
    var found = false;

    fs.readFile(__dirname + "/" + "favs.json", 'utf8', 
    function (err, data) {
        newdata = JSON.parse(data);
        newdata.forEach(function (tweet, index) {
            if (!found && String(tweet.user.name) === (id)) {
                tweet.user.screen_name = newName;
            }
        });
        fs.writeFile(__dirname + "/" + "favs.json", 
        JSON.stringify(newdata),
            (err) => {
                // Error
                if (err) throw err;
            });
    })
    res.send('Successfully changed product!');
})

app.listen(PORT, function () {
    console.log('Server is listening on: ' + PORT);
});