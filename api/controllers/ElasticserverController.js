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
  create: function (index,type,id,body) {
	var res = client.create({
		index: index,
		type: type,
		id: id,
		body: body
	}, function (error, response) {
		if(error){
			console.log('-------ElasticserverController.create()====='+JSON.stringify(error));
			return error;
		}else{
			return response;
		}
	});
	return res;
  },
  
  /**
   * `ElasticserverController.delete()`
   */
  delete: function (index,type,id) {
    var res = client.delete({
		index: index,
		type: type,
		id: id
	}, function (error, response) {
		if(error){
			console.log('-------ElasticserverController.delete()====='+JSON.stringify(error));
			return error;
		}else{
			return response ;
		}
	});
	return res;
  },
  
  
  /**
   * `ElasticserverController.deleteByQuery()`
   */
  deleteByQuery: function (index, q) {
    var res = client.deleteByQuery({
	  index: index,
	  q: q
	}, function (error, response) {
		if(error){
			console.log('-------ElasticserverController.deleteByQuery()====='+JSON.stringify(error));
			return error;
		}else{
			return response;;
		}
	});
	return res;
  },
  
   /**
   * `ElasticserverController.explain()`
   */
  explain: function (index,type,id,q) {
	var res = client.explain({
		// the document to test
		index: index,
		type: type,
		id: id,

		// the query to score it against
		q: q
	}, function (error, response) {
		if(error){
			console.log('-------ElasticserverController.explain()====='+JSON.stringify(error));
			return error;
		}else{
			return response;
		}
	});
	return res;
  },
  
  /**
   * `ElasticserverController.update()`
   */
  update: function (index,type,id,body) {
    var res = client.update({
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
			return error;
		}else{
			return response;
		}
	})
	return res;
  },


  /**
   * `ElasticserverController.search()`
   */
  search: function (index,q) {
    var res = client.search({
		index: index,
		q: q
	}, function (error, response) {
		if(error){
			console.log('-------ElasticserverController.search()====='+JSON.stringify(error));
			return error;
		}else{
			return response;
		}
	});
	return res;
  }
};

