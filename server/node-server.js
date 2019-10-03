var http = require('http'); // 1 - Import Node.js core module
var exec = require('child_process').exec;

var server = http.createServer( (request, response) => {   // 2 - creating server

    console.log(request.method);
    if (request.method == 'POST') {
        var body = '';

        request.on('data', function (data) {
            body += data;

            console.log(body);
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = JSON.parse(body);

            console.log(post.key);
            // use post['blah'], etc.
            var key = post.key;
            exec("export DISPLAY=:0.0 && xdotool key " + key, function(err, stdout, stderr) {
                exec("echo $?", function(err, stdout, stderr) {
                    console.log(stdout);
                });
            });

            response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
            response.end();
        });

    } else {
        response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
        response.end();
    }
});

server.listen(5000); //3 - listen for any incoming requests

console.log('Node.js web server at port 5000 is running..')