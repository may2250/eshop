/**
 * ProductController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
 var elastic = require('./ElasticserverController');
 
function DateFormat(formatStr, date)   
{   
	var str = formatStr;   
	var Week = ['日','一','二','三','四','五','六'];  
	str=str.replace(/yyyy|YYYY/,date.getFullYear());   
	str=str.replace(/yy|YY/,(date.getYear() % 100)>9?(date.getYear() % 100).toString():'0' + (date.getYear() % 100));   
  
	str=str.replace(/MM/,(date.getMonth()+1)>9?(date.getMonth()+1).toString():'0' + (date.getMonth()+1));   
	str=str.replace(/M/g,(date.getMonth()+1));   
  
	str=str.replace(/w|W/g,Week[date.getDay()]);   
  
	str=str.replace(/dd|DD/,date.getDate()>9?date.getDate().toString():'0' + date.getDate());   
	str=str.replace(/d|D/g,date.getDate());   
  
	str=str.replace(/hh|HH/,date.getHours()>9?date.getHours().toString():'0' + date.getHours());   
	str=str.replace(/h|H/g,date.getHours());   
	str=str.replace(/mm/,date.getMinutes()>9?date.getMinutes().toString():'0' + date.getMinutes());   
	str=str.replace(/m/g,date.getMinutes());   
  
	str=str.replace(/ss|SS/,date.getSeconds()>9?date.getSeconds().toString():'0' + date.getSeconds());   
	str=str.replace(/s|S/g,date.getSeconds());   
  
	return str;   
}

module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/product/create`
   */
   create: function (req, res) {
    var sn = req.param('sn');
	var proname = req.param('proname');
	var classify = req.param('classify');
	var price = req.param('price');
	var oldprice = req.param('oldprice');
	var imgurl = req.param('imgurl');
	var pics = req.param('pics');
	var producturl = req.param('producturl');
	var regdate = req.param('regdate');
	var inventory = req.param('inventory');
	var color = req.param('color');
	var colors = req.param('colors');
	var combos = req.param('combos');
	var desc = req.param('desc');
	var tag = req.param('tag');
	var keys = req.param('keys');
    // Send a JSON response
	console.log('------------product create------------------');
	Product.create({
		sn: sn, classify: classify, price: price, oldprice: oldprice, imgurl: imgurl,pics:pics, proname: proname,
		regdate: regdate, inventory: inventory, color:color, colors:colors, combos:combos, desc: desc, tag: tag, keys: keys, producturl: producturl
	}).exec( function createCB(err, r){
		if(err){
			console.log(JSON.stringify(err));
			return res.json({
			  sts: 1
			});
		};
		//insert to elasticsearch		
		var resp = elastic.create('eshop','product',r.id,{title:proname,tags:keys,imgurl:imgurl,price:price,desc:desc,inventory:inventory,
			producturl:producturl});
		//is inset successful?
		console.log('-----resp---'+ JSON.stringify(resp));
		return res.json({
		  sts: 0
		});
	})
    
  },
  
    /**
   * Action blueprints:
   *    `/product/autocreate`
   */
	autocreate: function (req, res) {
		//add tv
		var data = {sn : 'TV1000003', proname : '小米电视2', classify : 'tv',oldprice:3999, price : 3999, imgurl : '../img/product/mitv/tv-jinse.png',
		pics : [],
		producturl : '/goods/mitv', regdate : DateFormat('yyyy-MM-dd hh:mm:ss',new Date()), inventory : 100, color : '香槟金', colors : ['香槟金'],
		combos:{combo:[{desc:'小米电视2 家庭影院版',tag:'含电视、soundbar及低音炮',price:3999},{desc:'小米电视2',tag:'仅电视',price:3399}]},
		desc : '顶配 49 英寸超高清 4K 电视', tag : '测试产品', keys:'电视,小米,家庭影院,49英寸,超高清,4K'};
		Product.create(data).exec( function createCB(err, r){
			if(err){
				console.log(JSON.stringify(err));
				return res.json({
				  sts: 1
				});
			};
			//insert to elasticsearch		
			var resp = elastic.create('eshop','product',r.id,{title:proname,tags:keys,imgurl:imgurl,price:price,desc:desc,inventory:inventory,
				producturl:producturl});
				
			//add c1  mobile
			data = {sn : 'MB1000001', proname : '大锤 C1', classify : 'mobile',oldprice:899, price : 799, imgurl : '../img/product/pro_1.jpg',
			pics : ['c1/1377394349_55_2276.png','c1/1377393383_95_5390.png','c1/1377393385_25_1165.png','c1/1377393386_56_3345.png','c1/1377393390_77_5538.png'],
			producturl : '/goods/mobile', regdate : DateFormat('yyyy-MM-dd hh:mm:ss',new Date()), inventory : 100, color : '红盖', colors : ['红盖','黄盖','白盖'],
			combos:{},
			desc : '4.5寸 720P屏幕 4核1.2G处理器 1GRAM+4GROM 前200万摄像头 后800万摄像头，三色呼吸灯，NFC通信，安卓4.1操作系统', tag : '测试产品', keys:'手机,大锤,后800万摄像头,4.5寸,720P屏幕,C1,安卓4.1操作系统'};
			Product.create( data ).exec( function createCB(err, r){
				if(err){
					console.log(JSON.stringify(err));
					return res.json({
					  sts: 1
					});
				};
				//insert to elasticsearch		
				var resp = elastic.create('eshop','product',r.id,{title:proname,tags:keys,imgurl:imgurl,price:price,desc:desc,inventory:inventory,
					producturl:producturl});
					
				//add c2 mobile
				data = {sn : 'MB1000002', proname : '大锤 C2', classify : 'mobile',oldprice:1399, price : 1299, imgurl : '../img/product/pro_1.jpg',
				pics : ['c2/1377304636_13_3296.png','c2/1377304642_81_2707.png','c2/1377304645_73_2873.png','c2/1377304653_76_6318.png','c2/1377304665_46_5265.png'],
				producturl : '/goods/mobile', regdate : DateFormat('yyyy-MM-dd hh:mm:ss',new Date()), inventory : 100, color : '黑色', colors : ['黑色','白色'],
				combos:{},
				desc : '5寸 1080P屏幕 4核1.5G处理器 1GRAM+16GROM 前500万摄像头 后1300万摄像头，三色呼吸灯，NFC通信，OTG连接，安卓4.2操作系统', tag : '测试产品', keys:'手机,大锤,后1300万摄像头,5寸,1080P屏幕,C2,安卓4.2操作系统'};
					
				Product.create( data ).exec( function createCB(err, r){
					if(err){
						console.log(JSON.stringify(err));
						return res.json({
						  sts: 1
						});
					};
					//insert to elasticsearch		
					var resp = elastic.create('eshop','product',r.id,{title:proname,tags:keys,imgurl:imgurl,price:price,desc:desc,inventory:inventory,
						producturl:producturl});
						
					return res.json({
					  sts: 0
					});
				});
			});
		});
		
		
		
	},
	
  /**
   * Action blueprints:
   *    `/product/del`
   */
   del: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/product/findById`
   */
   findById: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },
  
    /**
   * Action blueprints:
   *    `/product/findBySn`
   */
   findBySn: function (req, res) {
    var sn = req.param('sn');
	console.log('--------findBySn----------'+ sn);
	Product.findOne({sn: sn}).exec(function findOneCB(err, result){
		if(err){
			console.log('--------findBySn err----------'+JSON.stringify(err));
			return false;
		}
		// Send a JSON response
		console.log('--------findBySn ----------'+ JSON.stringify(result));
		return res.json(result);
	});
    
  },


  /**
   * Action blueprints:
   *    `/product/findByUser`
   */
   findByUser: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/product/findAll`
   */
   findAll: function (req, res) {


  },


  /**
   * Action blueprints:
   *    `/product/update`
   */
   update: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  }
};
