/**
 * GlobalController
 *
 * @description :: Server-side logic for managing globals
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

   setTS: function (req, res) {
    var data = req.param('data');
    // Send a JSON response
	req.session.cartinfo = data;
	return res.json({sts: 0});
  },

  /**
   * `GlobalController.getTS()`
   */
  getTS: function (req, res) {
    return res.json(req.session.cartinfo);
  },
  
  /**
   * `GlobalController.setOS()`
   */
  setOS: function (req, res) {
	var orderid = req.param('orderid');
    var addrid = req.param('addrid');
	var payway = req.param('payway');
	var cartinfo = req.param('cartinfo');
	var pricetotal = req.param('pricetotal');
    // 组装json
	var data = {'info':{'orderid': orderid, 'addrid': addrid, 'payway': payway, 'cartinfo': cartinfo, 'pricetotal': pricetotal}};
	req.session.orderinfo = data;
	return res.json({sts: 0});
  },
  
   /**
   * `GlobalController.getOS()`
   */
  getOS: function (req, res) {
	var data = req.session.orderinfo.info;
	//获取收货地址信息
	Address.find({id: data.addrid}).exec(function findCB(err,addr){
		if(err){
			return console.log(err);
		}
		var json = {'addrinfo': addr, orderinfo: data};
		return res.json(json);
	});
    
  }
};

