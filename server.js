const express = require('express');
const gzip = require('compression');
const request = require('request');
const app = express();
const cardData = require('./public/cards.json')
const articleData = require('./public/articles.json')
const firstCard = require('./public/first-card.json')

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'views');

// gzip
app.use(gzip({
	threshold: 0,
	filter: () => true, // Compress all assets by default
}));

app.get('/', function (req, res) {
	res.render('index', { data: cardData, firstCard});
});

function getPageContent(id) {
	const page = id;
	for (let key in articleData) {
		console.log(key);
		if (key === page) {
			return articleData[key]
		}
	}
}

app.get('/:id', function (req, res) {
	const pageContent = getPageContent(req.params.id)
	res.render('article', { data: pageContent });
});


const server = app.listen(6969, function () {
	console.log('server is running on port 6969');
});
