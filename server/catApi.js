const requestPromise = require('request-promise');

const CAT_API_AUTH_TOKEN = process.env.CAT_API_AUTH_TOKEN;

const catApi = (req, res) => {


	/*TODO put some self-contained caching in here that doesn't require another service like redis*/

	const httpOptions = {
	  uri:`https://api.TheCatAPI.com/v1${req.path}`,
	  protocol:"https:",
	  hostname:'api.TheCatAPI.com',
	  port: 443,
	  method: req.method,
	  headers: {
	    'X-API-Key':CAT_API_AUTH_TOKEN
	  },
	  transform: function(body, response, resolveWithFullResponse){
	  	return JSON.parse(body);
	  }
	};


	const catApiCallPromise = requestPromise(httpOptions);

	Promise.all([catApiCallPromise])
	.then(
		(result, body) => {
			res.send(result[0]);
		})
	.catch((err) =>{
			res.status(err.statusCode);
			res.send(err.message);
	})
}

module.exports = catApi;