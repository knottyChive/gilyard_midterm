const express = require('express'); 

const server = express();
const bodyParser = require('body-parser');

server.set("view engine", "ejs");
server.use(bodyParser.urlencoded({extended: true}));
server.use(express.static(__dirname + '/public'));

const PORT = process.env.PORT || 1234;

server.get('/', (req, res) => {
    res.render('pages/index');
});

server.get('/random', (req, res) => {
    res.render('pages/random')
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})