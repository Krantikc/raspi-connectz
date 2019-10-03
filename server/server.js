const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const exec = require('child_process').exec;
const fs = require('fs');
const http = require('http');
const https = require('https');

const app = express();
const PORT = 5000;

// const key = fs.readFileSync(__dirname + '/selfsigned.key');
// const cert = fs.readFileSync(__dirname + '/selfsigned.crt');
// const options = {
//   key: key,
//   cert: cert
// };

//app.use(cors());
const allowedOrigins = [
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost',
    'http://localhost:8080',
    'http://localhost:8100'
];

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Origin not allowed by CORS'));
        }
    }
}
app.options('*', cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.route('/').post((request, response) => {
    console.log(request.method);
    if (request.method == 'POST') {
     
        var body = request.body;
        exec("export DISPLAY=:0.0 && xdotool key " + body.key, function(err, stdout, stderr) {
            console.log(body.key);
           if (err) {
               console.log(err);
           }
           console.log(stdout);
        });

        response.status(200).json({"success": true});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

// var httpServer = http.createServer(app).listen(PORT, () => {
//     console.log(`Server is running on ${PORT}`);
// });

// var httpsServer = https.createServer(options, app).listen(PORT, () => {
//     console.log(`Server is running on ${PORT}`);
// });