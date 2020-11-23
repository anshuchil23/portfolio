var Airtable = require('airtable');

var base = new Airtable({apiKey: 'keysB9c0oyfbHHQjo'}).base('appfjsaZpz1Goa7dj');

base('SpeculativeDesign').find('recPrrvxJ0RqAmeM1', function(err, record) {
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

    // console.log(record.fields.faceImage[0].url);

    var tagline = document.querySelector(".tagline");
    tagline.innerHTML = record.fields.Tagline;

    var process1 = document.querySelector(".process");
    process1.innerHTML = record.fields.Process1;

    var speculativeLink = document.querySelector(".speculative-link");
        var anchor = document.createElement('a');
        var link = 'process.html?' + record.fields.Slug + '-' + record.id;
        anchor.setAttribute('href', link);
        anchor.innerHTML = "<" + link + ">" + "Process";
        speculativeLink.appendChild(anchor);

        document.addEventListener('DOMContentLoaded', function (event) {
            // DOM Loaded!
            // var searchParam = document.location.search;
          
            // var slug = searchParam.substring(1);
          
            console.log(document.location);
          });
});


///process.innerHTML=process.innerHTML + '   '  /// in order to add on to the innerhtml instead of overriding it