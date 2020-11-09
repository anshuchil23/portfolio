var Airtable = require('airtable');

var base = new Airtable({apiKey: 'keysB9c0oyfbHHQjo'}).base('appfjsaZpz1Goa7dj');

base('Installation').find('recH3Rt0xupT6f8C4', function(err, record) {
    if (err) { console.error(err); return; }
    // console.log('Retrieved', record.id);

    var title = document.querySelector(".title");
    title.innerHTML = record.fields.Name;

    var date = document.querySelector(".date");
    date.innerHTML = record.fields.Date;

    var faceImage = document.querySelector(".face-image");
    faceImage.innerHTML = "<img src =" + "data/" + record.fields.faceImage[0].filename + ">";

    // console.log(record.fields.faceImage[0].filename);

    var tagline = document.querySelector(".tagline");
    tagline.innerHTML = record.fields.Tagline;

    var process = document.querySelector(".process");
    process.innerHTML = record.fields.Process;
});