var Airtable = require('airtable');

var base = new Airtable({apiKey: 'keysB9c0oyfbHHQjo'}).base('appfjsaZpz1Goa7dj');

base('Illustration').find('recXvjKNOyQYWR6Uu', function(err, record) {
    if (err) { console.error(err); return; }
    // console.log('Retrieved', record.id);

    var title = document.querySelector(".title");
    title.innerHTML = record.fields.Name;

    var date = document.querySelector(".date");
    date.innerHTML = record.fields.Date;

    var faceImage = document.querySelector(".face-image");
    // faceImage.innerHTML = "<img src =" + "data/" + record.fields.faceImage[0].filename + ">";

    var image = document.createElement('img');
        image.setAttribute('src', record.fields.FaceImage[0].url);
        faceImage.appendChild(image);

    // console.log(record.fields.FaceImage[0].url);

    var tagline = document.querySelector(".tagline");
    tagline.innerHTML = record.fields.Tagline;

    var process = document.querySelector(".process");
    process.innerHTML = record.fields.Process;
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