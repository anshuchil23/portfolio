

var Airtable = require('airtable');

var base = new Airtable({apiKey: 'keysB9c0oyfbHHQjo'}).base('appfjsaZpz1Goa7dj');
var content = document.querySelector(".content");
var fetchRecord = function(slug, recordID) {
  if (!slug) {
    content.style.display = "none";
    console.log('No slug provided');
    return;
  }

  // var record = record.id;
base('Installation').find(recordID, function(err, record) {
  
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

    var description = document.querySelector(".description");
    description.innerHTML = record.fields.Description;

    var videoContainer = document.querySelector(".video-container");
    var video = document.createElement('video');
    video.setAttribute('controls', 'controls');
    video.setAttribute('src', record.fields.Video[0].url);
    video.autoplay = false;
    videoContainer.appendChild(video);
    // console.log(record.fields.Video);
    // console.log(record.fields.Slug);

      var mainPictures = document.querySelector(".main-pictures");
      record.fields.MainPictures.forEach(function(attachment) {
          var image = document.createElement('img');
          image.setAttribute('src', attachment.url);
          mainPictures.appendChild(image);


          (function () { // wait for document ready
            // init
            var controller = new ScrollMagic.Controller();
          
            // define movement of panels
            var wipeAnimation = new TimelineMax()
              // animate to second panel
              .to(image, 0.5, {z: -150})		// move back in 3D space
              .to(image, 1,   {x: "-25%"})	// move in to first panel
              .to(image, 0.5, {z: 0})				// move back to origin in 3D space  
              
              .to(image, 0.5, {z: -150, delay:1})		// move back in 3D space
              .to(image, 1,   {x: "-50%"})	// move in to first panel
              .to(image, 0.5, {z: 0})	

              .to(image, 0.5, {z: -150, delay:1})		// move back in 3D space
              .to(image, 1,   {x: "-75%"})	// move in to first panel
              .to(image, 0.5, {z: 0})	
            // create scene to pin and link animation
            new ScrollMagic.Scene({
                triggerElement: ".content",
                triggerHook: "onEnter",
                duration: "800%"
              })
              .setPin(mainPictures)
              .setTween(wipeAnimation)
              .addIndicators() // add indicators (requires plugin)
              .addTo(controller);
            });


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
  var navigation = document.querySelector('.navigation-container');
  var navigationContainer = document.querySelector(".navigation-container");
  var navigationName = document.querySelector(".navigation-name");

  base('Installation').select({
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record) {
      // Create list item
      var listItem = document.createElement('div');
      listItem.setAttribute("class", "navigation-image");
      // Create anchor
      var anchor = document.createElement('a');
      var link = 'installation.html?' + record.fields.Slug + '-' + record.id;
      anchor.setAttribute('href', link);
      anchor.setAttribute("class", "navigation-name");
      anchor.innerHTML = record.fields.Name;

      if (record.fields.FaceImage && record.fields.FaceImage.length > 0) {
        // Create image
        var image = document.createElement('img');
        var src = record.fields.FaceImage[0].url;
        image.setAttribute('src', src);

        // navigationName.innerHTML = record.fields.Name;
        
        anchor.appendChild(image);
        // anchor.appendChild(navigationName);
      } else {
        anchor.innerHTML = link;
      }

      

      // Append HTML to the navigation element
      listItem.appendChild(anchor);

      navigation.appendChild(listItem);
      // navigation.appendChild(anchor);

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

// SCROLLMAGIC ANIM:

// -v1

// var controller = new ScrollMagic.Controller();

// 	// build scenes
// 	new ScrollMagic.Scene({triggerElement: ".video-container"})
//                     // .setClassToggle(".animate1", ".animate2") // add class toggle
//                     .setTween(".main-pictures", 0.3, {opacity:0})
// 					// .addIndicators() // add indicators (requires plugin)
// 					.addTo(controller);


// -v2 


// (function () { // wait for document ready
//   // init
//   var controller = new ScrollMagic.Controller();

//   // define movement of panels
//   var wipeAnimation = new TimelineMax()
//     // animate to second panel
//     .to(".main-pictures img", 0.5, {z: -150})		// move back in 3D space
//     .to(".main-pictures img", 1,   {x: "-25%"})	// move in to first panel
//     .to(".main-pictures img", 0.5, {z: 0})				// move back to origin in 3D space
//     // animate to third panel
//     .to(".main-pictures img", 0.5, {z: -150, delay: 1})
//     .to(".main-pictures img", 1,   {x: "-50%"})
//     .to(".main-pictures img", 0.5, {z: 0})
//     // animate to forth panel
//     .to(".main-pictures img", 0.5, {z: -150, delay: 1})
//     .to(".main-pictures img", 1,   {x: "-75%"})
//     .to(".main-pictures img", 0.5, {z: 0});

//   // create scene to pin and link animation
//   new ScrollMagic.Scene({
//       triggerElement: ".images-container",
//       triggerHook: "onLeave",
//       duration: "500%"
//     })
//     .setPin(".content")
//     .setTween(wipeAnimation)
//     .addIndicators() // add indicators (requires plugin)
//     .addTo(controller);
//   });


////V1 FETCHING RECORDS AND SLUG LINK TO PROCESS////

// var Airtable = require('airtable');

// var base = new Airtable({apiKey: 'keysB9c0oyfbHHQjo'}).base('appfjsaZpz1Goa7dj');

// base('Installation').find('recH3Rt0xupT6f8C4', function(err, record) {
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

//     // console.log(record.fields.faceImage[0].url);

//     var tagline = document.querySelector(".tagline");
//     tagline.innerHTML = record.fields.Tagline;

//     var process = document.querySelector(".process");
//     process.innerHTML = record.fields.Process;

//     var videoContainer = document.querySelector(".video-container");
//     var video = document.createElement('iframe');
//     video.setAttribute('src', record.fields.Video[0].url);
//     videoContainer.appendChild(video);
//     // console.log(record.fields.Video);
//     // console.log(record.fields.Slug);

//       var mainPictures = document.querySelector(".main-pictures");
//       record.fields.MainPictures.forEach(function(attachment) {
//           var image = document.createElement('img');
//           image.setAttribute('src', attachment.url);
//           mainPictures.appendChild(image);
//           // console.log(record.fields.ProcessPictures[attachment].url);
//         });
 
//         //CREATE DYNAMIC LINK TO PROCESS
//         var processLink = document.querySelector(".process-link");
//         var anchor = document.createElement('a');
//         var link = 'process.html?' + record.fields.Slug + '-' + record.id;
//         anchor.setAttribute('href', link);
//         anchor.innerHTML = "<" + link + ">" + "Process";
//         processLink.appendChild(anchor);

// });


///process.innerHTML=process.innerHTML + '   '  /// in order to add on to the innerhtml instead of overriding it