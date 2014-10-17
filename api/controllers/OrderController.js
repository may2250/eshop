/**
 * OrderController
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

function doHandleMonth(month){   
    var m = month;        
    if(month.toString().length == 1){   
        m = "0" + month;       
    }         
    return m;  
}  

function getDay(day){        
    var today = new Date();           
    var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;               
    today.setTime(targetday_milliseconds); //注意，这行是关键代码             
    var tYear = today.getFullYear();      
    var tMonth = today.getMonth();        
    var tDate = today.getDate();      
    tMonth = doHandleMonth(tMonth + 1);       
    tDate = doHandleMonth(tDate);         
    return tYear+"-"+tMonth+"-"+tDate+" 00:00:00";  
}  

module.exports = {    
	  
	
  /**
   * Action blueprints:
   *    `/order/create`
   */
   create: function (req, res) {
    var addrid = req.param('addrid');
	var payway = req.param('payway');
	var cartinfo = JSON.stringify(req.param('cartinfo'));
	var pricetotal = req.param('pricetotal');
	var status = '等待付款';
	var orderdate = DateFormat('yyyy-MM-dd hh:mm:ss',new Date());
	console.log('--orderdate---'+ orderdate);
	Address.find({id: addrid}).exec(function findCB(err,addr){
		if(err){
			return console.log(err);
		};
		Order.create({
			price:pricetotal, status:status, orderdate:orderdate, userid:req.session.userid, 
			addrid:addrid, addrname: addr[0].name, proinfo:cartinfo
		}).exec( function createCB(err, result){
			if(err){
				console.log('----err---'+ JSON.stringify(err));
				return res.json({
				  sts: 1
				});
			}
			// Send a JSON response
			return res.json({
			  sts: 0, id: result.id
			});
		});
	
	});
	
    
  },


  /**
   * Action blueprints:
   *    `/order/del`
   */
   del: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/order/findAll`
   */
   findAll: function (req, res) {    
    var index = req.param('index');
	//更新该用户已过期的订单
	var datetime = DateFormat('yyyy-MM-dd hh:mm:ss',new Date());
	var preday = getDay(-1);  
	datetime= new Date(datetime);  
	preday= new Date(preday);
	Order.find({userid: req.session.userid, createdAt:{'$lt':preday}}).exec(function findCB(err,result){
		if(err){
			return console.log(err);
		}		
		//console.log('----overdueorder---->>>>>>'+JSON.stringify(result));
		result.forEach( function(r){
			Order.update({status:'等待付款', orderdate: r.orderdate},{status:'已关闭'}).exec(function afterwards(err,updated){
			  if (err) {
				console.log('----overdueorder---->>>>>>'+JSON.stringify(err));
				return ;
			  }
			});
		});
		setTimeout(
			Order.find({ where: {userid: req.session.userid}, sort:'createdAt DESC'}).paginate({page: index, limit: 10}).exec(function findCB(err,result){
				if(err){
					console.log('----orders---->>>>>>'+JSON.stringify(err));
					return res.json( '' );
				}		
				//console.log('----orders---->>>>>>'+JSON.stringify(result));
				return res.json( result );
			
			}),1000);
	});
	//console.log('------/order/findAll----'+req.session.userid);
	Order.find({ where: {userid: req.session.userid}, sort:'createdAt DESC'}).paginate({page: index, limit: 10}).exec(function findCB(err,result){
		if(err){
			return console.log(err);
		}		
		console.log('----orders---->>>>>>'+JSON.stringify(result));
		return res.json( result );
	
	});
  },
  
  /**
   * Action blueprints:
   *    `/order/count`
   */
   count: function (req, res) {
    var userid = req.session.userid;
	Order.count({userid: userid}).exec(function countCB(err,num){
		if(err){
			return res.json({sts: 2});
		}
		if(num >0){
			// Send a JSON response
			return res.json({
			  sts: 0,
			  num: num
			});
		}else{
			return res.json({
			  sts: 1
			});
		}
	});
  },


  /**
   * Action blueprints:
   *    `/order/find`
   */
   find: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  }
};
