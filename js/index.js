let nextPageToken = "";
let prevPageToken= "";

function createContent (data){
  // console.log(data); 
  //console.log(data.kind);
 // console.log(data.items)
  /*
  //Title gotten 
  console.log(data.nextPageToken);
  console.log(data.prevPageToken);
  console.log(data)
  console.log(data.items[0].snippet.title);
  // thumbnail url gotten 
  console.log(data.items[0].snippet.thumbnails.default.url);
  */
  let htmlToAppend = "";
  //Capture the data for the next pages
  nextPageToken = data.nextPageToken;
  prevPageToken = data.prevPageToken;
  //Insert in a loop add element to html 
  // You can  have a hidden element and search 
  for (let i = 0; i < data.items.length; i++){
    let title = data.items[i].snippet.title;
    let urlThumbnail = data.items[i].snippet.thumbnails.default.url
    let urlVideo = `https://www.youtube.com/watch?v=${data.items[i].id.videoId}`
    htmlToAppend += `<div  class="boxElement" >
            <a href="${urlVideo}" target="_blank">
						<h4> ${title} </h4>
            <img src="${urlThumbnail}" alt="Image">
            </a>
    				</div>`
  }
  $("#results").html(htmlToAppend);
  //Unhide the elements 
  $("#previous").removeAttr('hidden');
  $("#next").removeAttr('hidden');
}


function watchForm(){

	$("#submitButton").on("click", function(event){
		event.preventDefault();

    url = "https://www.googleapis.com/youtube/v3/search";
		// get the desired element 
    let searchTerm = $("#searchTerm").val();
    //console.log(searchTerm);
		// make the API Call 
    $.ajax({
			url: url,
			method: "GET",
			data:{
        "part" : "snippet",
				"key":"AIzaSyClTjod-NDoyxmS4-Kofdc9aiPKDyKeLeA",
				"q": searchTerm,
        "maxResults" : 10
			},
			datatype: "json",
			contentType: "application/json",
			success: function(data){
				//what to do with data
        createContent(data);
				//console.log(data)
			},
			error: function(err) {
		    	console.log('error:' + err)
		  	}
		})
	});

  // check the other buttons 
  $("#next").on("click", function(event){
    //place ajax call with nextVal
    url = "https://www.googleapis.com/youtube/v3/search";
		// get the desired element 
    let searchTerm = $("#searchTerm").val();
    console.log("token ", nextPageToken);
    $.ajax({
			url: url,
			method: "GET",
			data:{
        "part" : "snippet",
				"key":"AIzaSyClTjod-NDoyxmS4-Kofdc9aiPKDyKeLeA",
				"q": searchTerm,
        "maxResults" : 10,
        "pageToken": nextPageToken
			},
			datatype: "json",
			contentType: "application/json",
			success: function(data){
				//what to do with data
        createContent(data);
				//console.log(data)
			},
			error: function(err) {
		    	console.log('error:' + err)
		  	}
		})
  });


  $("#previous").on("click", function(event){
    //place ajax call with nextVal
    url = "https://www.googleapis.com/youtube/v3/search";
		// get the desired element 
    let searchTerm = $("#searchTerm").val();
    console.log("token ", nextPageToken);
    $.ajax({
			url: url,
			method: "GET",
			data:{
        "part" : "snippet",
				"key":"AIzaSyClTjod-NDoyxmS4-Kofdc9aiPKDyKeLeA",
				"q": searchTerm,
        "maxResults" : 10,
        "pageToken": prevPageToken
			},
			datatype: "json",
			contentType: "application/json",
			success: function(data){
				//what to do with data
        createContent(data);
				//console.log(data)
			},
			error: function(err) {
		    	console.log('error:' + err)
		  	}
		})
  });

}

watchForm();