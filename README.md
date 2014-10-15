eshop
=====

angularjs+sailsjs+mongodb
=====
Install sailsJs
=====
	Visit http://sailsjs.org/ to download SailsJs
	
1. Run mongodb server
2. Type sails lift in command line
3. http://localhost:1337/#/test add  new product
	>>>	
=====
	change annotations to add different products in /eshop/assets/js/controller.js
		.controller('testCtrl', ['$scope', '$sails', '$location',  function($scope, $sails, $location ) {
		/* 显示layout部分*/
		$scope.$parent.j_islogin = true;	
		$scope.addProduct = function(){
			//add tv
			/*var data = {sn : 'TV1000003', proname : '小米电视2', classify : 'tv',oldprice:3999, price : 3999, imgurl : '../img/product/mitv/tv-jinse.png',
			pics : [],
			producturl : '/goods/mitv', regdate : DateFormat('yyyy-MM-dd hh:mm:ss',new Date()), inventory : 100, color : '香槟金', colors : ['香槟金'],
			combos:{combo:[{desc:'小米电视2 家庭影院版',tag:'含电视、soundbar及低音炮',price:3999},{desc:'小米电视2',tag:'仅电视',price:3399}]},
			desc : '顶配 49 英寸超高清 4K 电视', tag : '测试产品', keys:'电视,小米,家庭影院,49英寸,超高清,4K'};*/
			//add c1  mobile
			/*var data = {sn : 'MB1000001', proname : '大锤 C1', classify : 'mobile',oldprice:899, price : 799, imgurl : '../img/product/pro_1.jpg',
			pics : ['c1/1377394349_55_2276.png','c1/1377393383_95_5390.png','c1/1377393385_25_1165.png','c1/1377393386_56_3345.png','c1/1377393390_77_5538.png'],
			producturl : '/goods/c1', regdate : DateFormat('yyyy-MM-dd hh:mm:ss',new Date()), inventory : 100, color : '红盖', colors : ['红盖','黄盖','白盖'],
			combos:{},
			desc : '4.5寸 720P屏幕 4核1.2G处理器 1GRAM+4GROM 前200万摄像头 后800万摄像头，三色呼吸灯，NFC通信，安卓4.1操作系统', tag : '测试产品', keys:'手机,大锤,后800万摄像头,4.5寸,720P屏幕,C1,安卓4.1操作系统'};
			*/
			//add c2 mobile
			var data = {sn : 'MB1000002', proname : '大锤 C2', classify : 'mobile',oldprice:1399, price : 1299, imgurl : '../img/product/pro_1.jpg',
			pics : ['c2/1377304636_13_3296.png','c2/1377304642_81_2707.png','c2/1377304645_73_2873.png','c2/1377304653_76_6318.png','c2/1377304665_46_5265.png'],
			producturl : '/goods/c2', regdate : DateFormat('yyyy-MM-dd hh:mm:ss',new Date()), inventory : 100, color : '黑色', colors : ['黑色','白色'],
			combos:{},
			desc : '5寸 1080P屏幕 4核1.5G处理器 1GRAM+16GROM 前500万摄像头 后1300万摄像头，三色呼吸灯，NFC通信，OTG连接，安卓4.2操作系统', tag : '测试产品', keys:'手机,大锤,后1300万摄像头,5寸,1080P屏幕,C2,安卓4.2操作系统'};
			//insert product
			$sails.post('/product/create', data).success(function (r) {
				if(r.sts == 1){
					alert('-----create product err------');
				}else{
					alert('-----create product success------');
				}
			});
		};