var Airtable = require('airtable');

var base = new Airtable({apiKey: 'keysB9c0oyfbHHQjo'}).base('appfjsaZpz1Goa7dj');

////FETCH RECORD UJSING SELECT METHOD////

// var fetchRecord = function(slug) {
//   if (!slug) {
//     console.log('No slug provided, cancelling API call');
//     return;
//   }

//   var formula = 'Slug="' + slug + '"';

//   var title = document.querySelector(".title");
//   var process1 = document.querySelector(".process1");
//   var processImages = document.querySelector(".process-images");
//   var processImages = document.querySelector(".process-images");
//   var process2 = document.querySelector(".process2");

//   base('Installation').select({
//     filterByFormula: formula,
//     maxRecords: 1,
//     view: "Grid view"
//   }).eachPage(function page(records, fetchNextPage) {
//     records.forEach(function(record) {
//     title.innerHTML = record.fields.Name;
//     process1.innerHTML = record.fields.Process1;
//     record.fields.ProcessPictures.forEach(function(attachment) {
//         var image = document.createElement('img');
//         image.setAttribute('src', attachment.url);
//         processImages.appendChild(image);
//         // console.log(record.fields.ProcessPictures[attachment].url);
//       });
//       process2.innerHTML = record.fields.Process2;
//    });
//   }, function done(err) {
//     if (err) { console.error(err); return; }
//   });
//     // console.log('Retrieved', record.id);

//   }

////FETCH RECORD USING FIND METHOD////

  var fetchRecord = function(slug, recordID) {
    if (!slug) {
      console.log('No slug provided, cancelling API call');
      return;
    }

    // var record = record.id;

base('Installation').find(recordID, function(err, record) {
    if (err) { console.error(err); return; }
    console.log('Retrieved', record.id);

    var title = document.querySelector(".title");
    title.innerHTML = record.fields.Name;

    var process1 = document.querySelector(".process1");
    process1.innerHTML = record.fields.Process1;

    var processImages = document.querySelector(".process-images");
    record.fields.ProcessPictures.forEach(function(attachment) {
        var image = document.createElement('img');
        image.setAttribute('src', attachment.url);
        processImages.appendChild(image);
        // console.log(record.fields.ProcessPictures[attachment].url);
      });

    var process2 = document.querySelector(".process2");
    process2.innerHTML = record.fields.Process2;
 });
  }


    

    document.addEventListener('DOMContentLoaded', function (event) {
        // DOM Loaded!
        var searchParam = document.location.search;
        
        var slug = searchParam.substring(1);
        var recordID = slug.split('-').pop();
        // console.log(recordID);

      
        fetchRecord(slug, recordID);
      });


      // recH3Rt0xupT6f8C4

///process.innerHTML=process.innerHTML + '   '  /// in order to add on to the innerhtml instead of overriding it