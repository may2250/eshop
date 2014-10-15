/**
 * Store
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
	userid: {
		type:'string',
		required: 'true'
	},
	psn: {
		type:'string',
		required: 'true'
	},
	proname: {
		type:'string',
		required: 'true'
	},
	classify: {
		type:'string',
		required: 'true'
	},
	price: {
		type:'float',
		required: 'true'
	},
	imgurl: 'string',
	tag: {
		type:'string',
		required: 'true'
	},
	producturl: {
		type:'string'
	}
  }

};
