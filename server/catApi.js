const requestPromise = require('request-promise');

const CAT_API_AUTH_TOKEN = process.env.CAT_API_AUTH_TOKEN;

if(typeof CAT_API_AUTH_TOKEN == 'undefined'){
	throw new Error('The CAT_API_AUTH_TOKEN environment variable has not been set. Please check your .env file');
}

const catApi = (req, res) => {
	/*TODO put some self-contained caching in here that doesn't require another service like redis*/
	console.log('request body', req.body)
	
	console.log('request body', req.query)

	const httpOptions = {
	  /*we're simply going to relay the insert the url to create the proper uri*/
	  uri:`https://api.TheCatAPI.com/v1${req.url}`,
	  protocol:"https:",
	  hostname:'api.TheCatAPI.com',
	  port: 443,
	  method: req.method,
	  headers: {
	    'X-API-Key':CAT_API_AUTH_TOKEN,
	    'Content-Type':'application/json'
	  },
	  transform: function(body, response, resolveWithFullResponse){
	  	return JSON.parse(body);
	  }
	};

	if(req.method == 'POST'){
		Object.assign( httpOptions, { body : JSON.stringify( req.body ) } );
	}

	/*
	This is a `shim` of sorts, added for the one-from-each categories requirement. 
	Currently the author has no known way to get a list of images, one from each category,
	in a single API call. Therefor we will request the admittedly incomplete list of categories,
	and each of which we will make a limit=1 request for. The order is random by default, which 
	seems suitable for no pagination and browsing

	*/

	if(req.url == '/categories'){
		/*
		Declare an array of categories
		 */
		const categories = [];
		/*
		Declare an array to contain the api request promises
		 */
		const categoryRequests = [];
		/* 
		Request a list of categories from the API
		*/
		requestPromise(httpOptions).then(categories => {
			/*
			Iterate over the categories and retrieve one image per. 
			*/
			for (var i = 0; i < categories.length; i++) {
				categoryRequests.push(requestPromise({
				  uri:`https://api.TheCatAPI.com/v1/images/search?limit=1&category_ids=${categories[i].id}`,
				  protocol:"https:",
				  hostname:'api.TheCatAPI.com',
				  port: 443,
				  method: 'GET',
				  headers: {
				    'X-API-Key':CAT_API_AUTH_TOKEN,
				    'Content-Type':'application/json'
				  },
				  transform: function(body, response, resolveWithFullResponse){
				  	return JSON.parse(body);
				}
				}
				))
			}
			Promise.all(categoryRequests).then(
				(result, body) =>{
					const response = result.map(obj => obj[0])
					res.send(response);
				}
			).catch(json => {
				res.status(503);
				res.send();
			})
		}).then(obj =>{
			console.log('Array for request-promises done')
		})

	}else{
		const catApiCallPromise = requestPromise(httpOptions);

		Promise.all( [ catApiCallPromise ] )
		.then(
			(result, body) => {
				res.send(result[0]);
			})
		.catch((err) =>{
			res.status(err.statusCode);
			res.send(err.message);
		})
		
	}

}

module.exports = catApi;