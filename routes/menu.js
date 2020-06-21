var express = require('express');
var app = express()

app.get('/', function(req, res, next) {
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM MenuCatagatory;',function(err, rows, fields) {
			console.log(err); // 0

			if (err) {
				req.flash('error', err)
				res.render('component/menu/menu', {
					title: 'All Countries', 
					menuCatagatory: ''
				})
			} else {
				console.log(rows);
				res.render('index', {
					title: 'All Countries', 
					menuCatagatory: rows
				})
			}
		})
	})
})
module.exports = app