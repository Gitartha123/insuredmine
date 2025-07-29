const express = require('express');
require('dotenv').config();
const connectToMongo = require('./db');
const RoutesApi = require('./routes/api');
const cpuUsage = require("./utils/cpu");
const { exec } = require('child_process');

const app = express();

app.get('/', (req, res) => {
    res.send("Hello !!");
})

app.use(express.json());
app.use('/api', RoutesApi);

connectToMongo();

/**** check cpu utilize pecentage in every 5 seconds */
setInterval(() => {
    if (cpuUsage() > 4) {
        console.log("High CPU usage. Restarting server !!");

        // Run the batch file to restart
        exec('start.bat', (err, stdout, stderr) => {
            if (err) {
                console.error(`Restart failed: ${err}`);
                return;
            }
            console.log(stdout);
        });

        // Exit current process
        process.exit(0);
    }
}, 5000)


app.listen(process.env.PORT, () => {
    console.log(`server is listenning port ${process.env.PORT}`)
})