/**
*	@desc: Twitch Search API Page code
**/

(function(){

	/*** Hide on Page Load ***/
	document.querySelector('.paginate_wrapper').style.display = 'none';

	var module = (function(){
		return{
			searchAPI: function(e){
				var self = this;
				var searchText = document.querySelector('#txtSearch').value.trim();
				var url = "https://api.twitch.tv/kraken/search/streams?q=" + searchText;
				fetch(url, {
						method: 'GET',
						headers: new Headers({
							'Content-Type': 'application/json',
							'Client-ID': 's6t83t3v6qz4fz78667eq0br75mzlo'
						})
					})
					.then((resp) => resp.json())
					.then(function(data){
						document.querySelector('.totalCount').innerHTML = data.streams.length;
						self.displayResults(data);
					})
					.catch(function(err){
						console.error(err);
					});

			},
			displayResults: function(data){
				// Show Pagination
				document.querySelector('.paginate_wrapper').style.display = 'block';
				// Empty existing listing
				document.querySelector('#listing').innerHTML = "";
				data.streams.forEach(function(stream, index){
					var row = document.createElement('li');
					var img = document.createElement('img');
					img.setAttribute('src', stream.preview.small);
					var rowStr = "<div class='img_wrapper'>" +
									"<img src=" + stream.preview.small + " />" +
								"</div>" +
								"<div class='text_wrapper'>" +
									"<b><span class='title'>" + stream.channel.display_name + "</span></b>" +
									"<br />" + stream.game + " - " + stream.viewers + " viewers<br />" +
									stream.channel.status +
								"</div>";
					row.innerHTML = rowStr;
					document.querySelector('#listing').appendChild(row);
				});
			}
		}
	})();

	document.querySelector('#btnSearch').addEventListener('click', module.searchAPI);
	document.querySelector('#txtSearch').addEventListener('keyup', function(e){
		if(e.keyCode === 13){
			module.searchAPI();
		}
		else if(e.keyCode === 27){
			document.querySelector('#txtSearch').value = "";
		}
	});


})();