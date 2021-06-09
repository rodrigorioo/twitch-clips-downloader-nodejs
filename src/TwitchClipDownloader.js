const axios = require('axios');
const https = require('https');
const fs = require('fs');
const path = require('path');

class TwitchClipDownloader {

    constructor (clientId, sha256Hash = '6e465bb8446e2391644cf079851c0cb1b96928435a240f07ed4b240f0acc6f1b') {

        this._urlEndpoint = "https://gql.twitch.tv/gql";
        this._clientId = clientId;
        this._sha256Hash = sha256Hash;

        this._id = "";
        this._url = "";
    }

    download (twitchClipId) {

        return new Promise( (success, failure) => {
            this.id = twitchClipId;

            const data = [
                {
                    operationName: "ClipsDownloadButton",
                    variables: {
                        slug: this.id,
                    },
                    extensions: {
                        persistedQuery: {
                            version: 1,
                            sha256Hash: this.sha256Hash,
                        }
                    },
                }
            ];

            axios
                .post(this.urlEndpoint, data, {
                    headers: {
                        "Client-Id": this.clientId,
                    }
                })
                .then( (responseEndpoint) => {

                    const response = responseEndpoint.data;

                    if(response.error || response.errors) {
                        return failure(response.message);
                    }

                    const responseData = response[0];

                    if(responseData.errors) {
                        return failure('Error in twitch response');
                    }

                    let url = '';

                    try {
                        const playbackAccessToken = responseData.data.clip.playbackAccessToken;
                        url = responseData.data.clip.videoQualities[0].sourceURL + '?sig=' + playbackAccessToken.signature + '&token=' + encodeURIComponent(playbackAccessToken.value);
                    } catch(err) {
                        return failure('Error in parse video response');
                    }

                    if(url === '') {
                        return failure('Error for obtain url of clip');
                    }

                    this.url = url;

                    success(this);

                }).catch( (responseError) => {
                    failure(responseError);
                });
        });
    }

    save(directory = '') {

        return new Promise( (success, failure) => {

            if(this.url === '') {
                return failure("URL don't specified");
            }

            const filename = this.id + '.mp4';
            const finalDirectory = (directory !== '') ? path.normalize(directory) + "/" + filename : filename;

            const file = fs.createWriteStream(finalDirectory);

            file.on('error', (errFile) => {
                return failure('Error in directory specified: ' + errFile.message);
            });

            file.on('finish', (finishFile) => {
                return success();
            });

            const request = https.get(this.url, (responseHTTPS) => {
                responseHTTPS.pipe(file);
            }).on('error', (errHTTPS) => {
                return failure('Error in save clip: ' + errHTTPS.message);
            });
        });
    }

    get urlEndpoint() {
        return this._urlEndpoint;
    }

    set urlEndpoint(value) {
        this._urlEndpoint = value;
    }
    get clientId() {
        return this._clientId;
    }

    set clientId(value) {
        this._clientId = value;
    }
    get sha256Hash() {
        return this._sha256Hash;
    }

    set sha256Hash(value) {
        this._sha256Hash = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }
    get url() {
        return this._url;
    }

    set url(value) {
        this._url = value;
    }
}

module.exports = TwitchClipDownloader;
