/**
 * ElasticserverController
 *
 * @description :: Server-side logic for managing elasticservers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: {
    type: 'file',
    level: 'trace',
    path: '/elasticsearch.log'
  }
});

module.exports = {
	


  /**
   * `ElasticserverController.ping()`
   */
  ping: function (req, res) {
	client.ping({
	  requestTimeout: 1000,
	  // undocumented params are appended to the query string
	  hello: "elasticsearch!"
	}, function (error) {
	  if (error) {
		console.error('elasticsearch cluster is down!');
		return res.json( error );
	  } else {
		console.log('elasticsearch is well');
		return res.json( response );
	  }
	});
    
  },
  
  /**
   * `ElasticserverController.create()`
   */
  create: function (req, res) {
	var index = req.param('index');
	var type = req.param('type');
	var id = req.param('id');
	var body = req.param('body');
    client.create({
		index: index,
		type: type,
		id: id,
		body: body
	}, function (error, response) {
		if(error){
			console.log('-------ElasticserverController.create()====='+JSON.stringify(error));
			return res.json( error );
		}else{
			return res.json( response );
		}
	});
  },
  
  /**
   * `ElasticserverController.delete()`
   */
  delete: function (req, res) {
	var index = req.param('index');
	var type = req.param('type');
	var id = req.param('id');
    client.delete({
		index: index,
		type: type,
		id: id
	}, function (error, response) {
		if(error){
			console.log('-------ElasticserverController.delete()====='+JSON.stringify(error));
			return res.json( error );
		}else{
			return res.json( response );
		}
	});
  },
  
  
  /**
   * `ElasticserverController.deleteByQuery()`
   */
  deleteByQuery: function (req, res) {
	var index = req.param('index');
	var q = req.param('q');
    client.deleteByQuery({
	  index: index,
	  q: q
	}, function (error, response) {
		if(error){
			console.log('-------ElasticserverController.deleteByQuery()====='+JSON.stringify(error));
			return res.json( error);
		}else{
			return res.json( response );;
		}
	});
  },
  
   /**
   * `ElasticserverController.explain()`
   */
  explain: function (req, res) {
	var index = req.param('index');
	var type = req.param('type');
	var id = req.param('id');
	var q = req.param('q');
	client.explain({
		// the document to test
		index: index,
		type: type,
		id: id,

		// the query to score it against
		q: q
	}, function (error, response) {
		if(error){
			console.log('-------ElasticserverController.explain()====='+JSON.stringify(error));
			return res.json( error);
		}else{
			return res.json( response );;
		}
	});
  },
  
  /**
   * `ElasticserverController.update()`
   */
  update: function (req, res) {
	var index = req.param('index');
	var type = req.param('type');
	var id = req.param('id');
	var body = req.param('body');
    client.update({
		index: index,
		type: type,
		id: id,
		body: {
			// put the partial document under the `doc` key
			doc: body
		}
	}, function (error, response) {
		if(error){
			console.log('-------ElasticserverController.update()====='+JSON.stringify(error));
			return res.json( error);
		}else{
			return res.json( response );
		}
	})
  },


  /**
   * `ElasticserverController.search()`
   */
  search: function (req, res) {
	var index = req.param('index');
	var q = req.param('q');
    client.search({
		index: index,
		q: q
	}, function (error, response) {
		if(error){
			console.log('-------ElasticserverController.search()====='+JSON.stringify(error));
			return res.json( error);
		}else{
			return res.json( response );
		}
	});
  }
};

