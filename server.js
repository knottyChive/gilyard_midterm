const express = require('express'); 

const server = express();
const bodyParser = require('body-parser');
const axios = require('axios');


server.set("view engine", "ejs");
server.use(bodyParser.urlencoded({extended: true}));
server.use(express.static(__dirname + '/public'));

const PORT = process.env.PORT || 1234;



function makeRequest(URLPath) {
    return new Promise( (resolve, reject) => {
        axios.get(URLPath)
        .then(response => {
            let result = {}

            result.title = response.data.title;
            result.alt = response.data.alt;
            result.image = response.data.img;
            result.month = response.data.month;
            result.day = response.data.day;
            result.year = response.data.year;

            
            resolve(result);
        })
        .catch(err => {
            console.error(err);
        })
    })

}

server.get('/', async (req, res) => {

    let comic = await makeRequest('https://xkcd.com/info.0.json');
    res.render('pages/index', {
        comic: comic,
        
    });
});

server.get('/random', async (req, res) => {
    let num = Math.round(Math.random() * 1001);
    
    let randomComic = await makeRequest(`https://xkcd.com/${num}/info.0.json`);
    res.render('pages/random', {
        random: randomComic,
        
    })
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})