/**
 * StoreController
 *
 * @description :: Server-side logic for managing stores
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	


  /**
   * `StoreController.create()`
   */
  create: function (req, res) {
	var psn = req.param('psn');
	var proname = req.param('proname');
	var classify = req.param('classify');
	var price = req.param('price');
	var imgurl = req.param('imgurl');
	var producturl = req.param('producturl');	
	var tag = req.param('tag');
    // Send a JSON response
	console.log('------------Store create------------------');
	Store.find({userid:req.session.userid, psn: psn}).exec( function findCB(err, r){
		console.log('------------Store find------------------'+ JSON.stringify(r));
		if(r.length < 1){
			Store.create({
				psn:psn, userid: req.session.userid, classify: classify, price: price,imgurl: imgurl, proname: proname, tag: tag, producturl: producturl
			}).exec( function createCB(err, result){				
				if(err){
					console.log(JSON.stringify(err));
					return res.json({
					  sts: 1
					});
				};	
				return res.json({
				  sts: 0
				});
			});
		}else{
			return res.json({
			  sts: 2
			});
		}
	});
	
  },


  /**
   * `StoreController.del()`
   */
  del: function (req, res) {
	var psn = req.param('psn');
    Store.destroy({psn: psn, userid: req.session.userid}).exec(function  deleteCB(err,r){
		if(err){
			// Send a JSON response
			console.log('-------'+JSON.stringify(err));
			return res.json('');
		}
		//返回新收藏信息
		Store.find({ where: {userid: req.session.userid}, sort:'createdAt DESC'}).exec(function findCB(err,result){
			if(err){
				console.log(JSON.stringify(err));
				return res.json('');
			}		
			console.log('----Stores---->>>>>>'+JSON.stringify(result));
			return res.json( result );
		
		});
	});    
  },


  /**
   * `StoreController.find()`
   */
  find: function (req, res) {
    var index = req.param('index');
    // Send a JSON response
	//console.log('------/order/findAll----'+req.session.userid);
	Store.find({ where: {userid: req.session.userid}, sort:'createdAt DESC'}).exec(function findCB(err,result){
		if(err){
			console.log('----Stores---->>>>>>'+JSON.stringify(err));
			return res.json( '' );
		}		
		return res.json( result );
	
	});
  }
};

