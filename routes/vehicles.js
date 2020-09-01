var express = require('express');
var router = express.Router();
const mongoose = require('../dbmodels/mongoose');
const modelDTC = mongoose.model('DTC');

/* GET vehicles page. */
router.get('/', function(req, res, next) {
/*	modelDTC.find()
		.then((dtcs) => {
			res.render('vehicles', {header: 'Vehículos', dtcs });
		})*/
	modelDTC.aggregate([
            {$sort:
                 {date:-1}
            },
			{$group:
				{_id: {vehicle:'$vehicle',code:'$code'},
				date: {$first: '$date'},
				coordinates: {$first: '$coordinates'},
				vehicle: {$first: '$vehicle'},
				code: {$first: '$code'},
				description: {$first: '$description'},
				}
			}
		])
		.then((dtcs) => {
			res.render('vehicles', {header: 'Vehículos', dtcs });
		})
	.catch(() => { res.send('Sorry! Something went wrong.'); });
});

router.post('/deleteVehicle', function(req, res, next) {
	modelDTC.deleteMany({ vehicle: req.body.vehicleName, code: req.body.dtcCode}, function (err) {
		if (err)
			console.log(err);
		console.log(`Borrado vehículo ${req.body.vehicleName} con DTC ${req.body.dtcCode}`);
	})
	res.redirect('/vehicles');
})

module.exports = router;

