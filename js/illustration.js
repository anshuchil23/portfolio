var Airtable = require('airtable');

var base = new Airtable({apiKey: 'keysB9c0oyfbHHQjo'}).base('appfjsaZpz1Goa7dj');

var fetchRecord = function(slug, recordID) {
  if (!slug) {
    console.log('No slug provided, cancelling API call');
    return;
  }

  // var record = record.id;

base('Illustration').find(recordID, function(err, record) {
  if (err) { console.error(err); return; }
  console.log('Retrieved', record.id);

  var title = document.querySelector(".title");
    title.innerHTML = record.fields.Name;

    var date = document.querySelector(".date");
    date.innerHTML = record.fields.Date;

    var faceImage = document.querySelector(".face-image");

    var image = document.createElement('img');
        image.setAttribute('src', record.fields.FaceImage[0].url);
        faceImage.appendChild(image);

    var tagline = document.querySelector(".tagline");
    tagline.innerHTML = record.fields.Tagline;

    if(record.fields.Description){
    var description = document.querySelector(".description");
    description.innerHTML = record.fields.Description;
    }

    // var videoContainer = document.querySelector(".video-container");
    // var video = document.createElement('iframe');
    // video.setAttribute('src', record.fields.Video[0].url);
    // videoContainer.appendChild(video);
    // // console.log(record.fields.Video);
    // // console.log(record.fields.Slug);

      var mainPictures = document.querySelector(".main-pictures");
      record.fields.MainPictures.forEach(function(attachment) {
          var image = document.createElement('img');
          image.setAttribute('src', attachment.url);
          mainPictures.appendChild(image);
    });

     //CREATE DYNAMIC LINK TO PROCESS
    var processLink = document.querySelector(".process-link");
    var anchor = document.createElement('a');
    var link = 'process.html?' + record.fields.Slug + '-' + record.id;
    anchor.setAttribute('href', link);
    anchor.innerHTML = "<" + link + ">" + "Process";
    processLink.appendChild(anchor);

});
}


var makeNavigation = function() {
  var navigationContainer = document.querySelector('.navigation');

  base('Illustration').select({
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record) {
      // Create list item
      var listItem = document.createElement('li');

      // Create anchor
      var anchor = document.createElement('a');
      var link = 'illustration.html?' + record.fields.Slug + '-' + record.id;
      anchor.setAttribute('href', link);

      if (record.fields.FaceImage && record.fields.FaceImage.length > 0) {
        // Create image
        var image = document.createElement('img');
        var src = record.fields.FaceImage[0].url;
        image.setAttribute('src', src);

        anchor.appendChild(image);
      } else {
        anchor.innerHTML = link;
      }
      

      // Append HTML to the navigation element
      listItem.appendChild(anchor);

      navigationContainer.appendChild(listItem);

    });
  }, function done(err) {
    if (err) { console.error(err); return; }
  });
}


document.addEventListener('DOMContentLoaded', function (event) {
  // DOM Loaded!
        var searchParam = document.location.search;
        
        var slug = searchParam.substring(1);
        var recordID = slug.split('-').pop();
        // console.log(recordID);

        makeNavigation();
        fetchRecord(slug, recordID);
});




////v1 for single record-installation desk jockey/////

// var Airtable = require('airtable');

// var base = new Airtable({apiKey: 'keysB9c0oyfbHHQjo'}).base('appfjsaZpz1Goa7dj');

// base('Illustration').find('recXvjKNOyQYWR6Uu', function(err, record) {
//     if (err) { console.error(err); return; }
//     // console.log('Retrieved', record.id);

//     var title = document.querySelector(".title");
//     title.innerHTML = record.fields.Name;

//     var date = document.querySelector(".date");
//     date.innerHTML = record.fields.Date;

//     var faceImage = document.querySelector(".face-image");
//     // faceImage.innerHTML = "<img src =" + "data/" + record.fields.faceImage[0].filename + ">";

//     var image = document.createElement('img');
//         image.setAttribute('src', record.fields.FaceImage[0].url);
//         faceImage.appendChild(image);

//     // console.log(record.fields.FaceImage[0].url);

//     var tagline = document.querySelector(".tagline");
//     tagline.innerHTML = record.fields.Tagline;

//     var process = document.querySelector(".process");
//     process.innerHTML = record.fields.Process;
// });


// ///process.innerHTML=process.innerHTML + '   '  /// in order to add on to the innerhtml instead of overriding it