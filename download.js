/*
LabProject
Copyright (C) 2016 Jacob Hartman

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

var http = require('http');
var https = require("https");
var fs = require('fs');
var url = require('url');

var sanitize = require('./sanitize');

function download(url_string, file_pipe, callback) {

    var client = null;

    if (url_string.indexOf("https:") === 0) {
        client = https;
    } else {
        client = http;
    }

    var url_parse = null;

    try {
        url_parse = url.parse(url_string);
    } catch(e) {
        callback(new Error("Error parsing url"), null, null);
        return;
    }

    var connection = {
        hostname: url_parse.hostname,
        headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; Win64; x64; rv:16.0.1) Gecko/20121011 Firefox/42.0'
        },
        path: url_parse.path
    };


    client.get(connection, function(response) {


        if (response.statusCode > 400) {

            callback(new Error("400 level error"), null, null);

        } else if (response.statusCode > 300 && response.statusCode < 400) {

            try {
                inner_parse = url.parse(response.headers.location);
            } catch(e) {
                callback(new Error("Error parsing url"), null, null);
            }

            new_url = "";

            if (!inner_parse.hostname) {
                new_url = url_parse.hostname + "/" + response.headers.location;
            } else {
                new_url = response.headers.location;
            }

            download(new_url, file_pipe, callback);


        } else {

            var file_length = 0;

            response.pipe(file_pipe);

            response.on('data', function (chunk) {
                file_length += chunk.length;
            });

            response.on('error', function (error) {
                file_pipe.end();
                callback(new Error("Could not download file"), null, null);
            });

            response.on('end', function () {
                file_pipe.end();
                callback(null, file_length);
            });
        }


    });


}


module.exports = {


    /*
     * Callback: error, file_path(string), length(int)
     */
    download_file: function(url_string, file_path, callback){

        file_path = sanitize.path(file_path);

        fs.stat(file_path, function(err, stat) {
            if (err) {

                // Check if we can write to location
                var filestream = fs.createWriteStream(file_path, {flags: "wx"});
                var is_error = false;

                filestream.on('error', function (error) {
                    callback(new Error("Could not access output location"), null, null);
                    is_error = true;
                    filestream.end();
                    return;
                });

                filestream.on('finish', function() {

                });



                download(url_string, filestream, function(error, length){
                    callback(error, length, file_path);
                });


            } else {
                callback(new Error("Output file exists"), null, null);
            }
        });


    }
};
