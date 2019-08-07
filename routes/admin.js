var express = require('express');
var router = express.Router();
var adminlist = require('../service/adminlist');

/* GET users listing. */
router.post('/test/login', async (req, res, next) => {
  try {
	 let result = await adminlist.find(req.body.admin,req.body.password);
	 if(result.length > 0){
	 	res.send(true);
	 }
     else{
     	res.send(false);
     }
  } catch (e) {
     res.send(e);
     console.log(e);
  }
})

module.exports = router;