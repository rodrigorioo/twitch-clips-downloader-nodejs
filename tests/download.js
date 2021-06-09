const TwitchClipDownloader = require('../index');

const TwDownloader = new TwitchClipDownloader('<your_client_id>');
TwDownloader.download('<clip_id>').then( (resultDownload) => {

    resultDownload.save().then( (resultSave) => {

        console.log("Success");

    }).catch( (errSave) => console.log("error: " + errSave));

}).catch( (err) => console.log("error: " + err));
