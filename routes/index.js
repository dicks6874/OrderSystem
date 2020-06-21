var express = require('express');
var async = require("async");
var router = express.Router();

router.get('/', function (req, res, next) {
	var db = req.con;
	var query1 = 'SELECT * FROM MenuCatagatory;';
	var query2 = 'SELECT * FROM MenuItem;';

	async.parallel([
		function (callback) { db.query(query1, callback) },
		function (callback) { db.query(query2, callback) }
	], function (err, results) {
		console.log(results[0]);
		res.render('index', { menuCatagatory: results[0][0], menuItem: results[1][0] });
	});
});


router.get('/GetOrderedList', function (req, res) {
	var db = req.con;
	console.log(req.query);
	var branchTableId = req.query.BranchTableId;
	db.query('CALL `spGetOrderedList` (' + branchTableId + ');', function (err, rows) {
		if (err) {
			console.log(err);
		}
		var data = rows;
		res.send(data);
	});
});

router.post('/addTransactionItem', function (req, res, next) {
	var db = req.con;
	var menuItemId = req.body.menuItemId;
	var quantity = req.body.quantity;
	var BranchTableId = req.body.branchTableId;
	var sql = 'CALL `spAddTransactionItem` (' + menuItemId + ', ' + quantity + ',' + BranchTableId + ');';
	db.query(sql, function (err, rows) {
		if (err) {
			console.log(err);
		}
		res.setHeader('Content-Type', 'application/json');
		res.redirect('/');
	});
});


module.exports = router;

