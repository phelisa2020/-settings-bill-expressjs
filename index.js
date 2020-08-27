const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const SettingsBill = require('./settings-bill')
var moment = require('moment'); // require



const app = express()
const settingsBill = SettingsBill()

app.engine('handlebars', exphbs({layoutsDir: './views/layouts'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req, res){
	res.render('index', {
		settings: settingsBill.getSettings(),
		totals: settingsBill.totals()
	});
});

app.post('/settings', function(req, res){
	settingsBill.setSettings({
		callCost: req.body.callCost,
		smsCost: req.body.smsCost,
		warningLevel: req.body.warningLevel,
		criticalLevel: req.body.criticalLevel

	})

	//it redirect the default route
	res.redirect('/');
	
});

app.post('/action', function(req, res){
	settingsBill.recordAction(req.body.actionType)
	res.redirect('/');
	
});

app.get('/actions', function(req, res){
	const listOfActions = settingsBill.actions()

    for (action of listOfActions) {
        action.prettyDate = moment(action.timestamp).fromNow();
    }
    
    res.render("actions", {
        actions : listOfActions
    });
	
});

app.get('/actions/:actionType', function(req, res){
	const actionType = req.params.actionType;
	const listOfActions = settingsBill.actionsfor(actionType)

	 for (action of listOfActions) {
        action.prettyDate = moment(action.timestamp).fromNow();
    }
    
    res.render("actions", {
        actions : listOfActions
    });
	
	
	
});
	

const PORT = process.env.PORT || 3011;
app.listen(PORT, function(){
	console.log('App started at port:', PORT);
})