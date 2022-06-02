const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const PORT= 3000;
const connectionString= 'mongodb+srv://xaf99:quizapp@cluster0.gkmzswy.mongodb.net/?retryWrites=true&w=majority';


//Mongo
MongoClient.connect(connectionString, (err ,client) => {
    if(err)
    return console.error(err);
    console.log("CONNECTED TO DATABASE");
    const db= client.db('quiz');
    const questions= db.collection('question');


    app.use('/static', express.static('public'));

    //CRUD HANDLERS
    app.listen(PORT, () => {
        console.log("Listening on " + PORT)
    });

    app.get('/', (req,res) => {
            res.sendFile("D:/crud-express-mongo/index.html");
    })

    app.get('/questions',(req, res)=> {
        questions.find().toArray()
        .then(result=> {
            res.send({questions: result})
        })
        .catch(err => console.error(err));
    })

    app.post('/questions',(req, res)=> {
        questions.insertOne(req.body)
        .then(result=> {
            res.redirect('back');
        })
        .catch(err => console.error(err));
    })
});

//Body Parser
app.use(bodyParser.urlencoded({extended:true}));