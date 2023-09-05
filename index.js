const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const puppeteer = require('puppeteer');
const path = require('path');
const port = 3000; // Set your desired port number

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysqlpass',
    database: 'mydb'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + db.threadId);
});

// Set up body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle form submission
app.post('/submit', (req, res) => {
    const email = req.body.email;
    const fullname = req.body.fullname;
    const age = req.body.age;
    const education = req.body.education;
    const institute = req.body.institute;
    const study = req.body.study;
    const experience = req.body.experience;
    const admission = req.body.admission;
    const program = req.body.program;
    const country = req.body.country;
    const goals = req.body.goals;
    const listening = req.body.listening;
    const reading = req.body.reading;
    const speaking = req.body.speaking; 
    const writing = req.body.writing;
    const tuitionpayment = req.body.tuitionpayment;
    const tuition = req.body.tuition;
    const gicpayment = req.body.gicpayment;
    const gic = req.body.gic;

// Store data in MySQL
    const sql = 'INSERT INTO sop_table (email, fullname, age, education, institute, study, experience, admission, program, country, goals, listening, reading, speaking, writing, tuitionpayment, tuition, gicpayment, gic) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [email, fullname, age, education, institute, study, experience, admission, program, country, goals, listening, reading, speaking, writing, tuitionpayment, tuition, gicpayment, gic], (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL: ' + err.stack);
            res.send('Error inserting data into MySQL.');
        } else {
            console.log('Your application submitted.');
            res.send('Your application submitted successfully. We have send an email please check your inbox.');
        }
    });

// Revert you a mail statement of purpose.
    var link = "https://docs.google.com/forms/d/e/1FAIpQLSdOHGp-XNvu2p06oSWY7Mtv0R81GxHH2XGaPa1gKdIXAL6msw/formResponse?&pageHistory=0";
    link = link + "&emailAddress="+ email +"&entry.1670307221="+ fullname +"&entry.1723368668="+ age +"&entry.2014837490="+ education;
    link = link + "&entry.2002229478="+ institute +"&entry.1364285845="+ study + "&entry.767407612="+ experience +"&entry.1569902389="+ admission;
    link = link + "&entry.1415007109="+ program +"&entry.2110947866="+ country +"&entry.1160268939="+ goals +"&entry.1604587969="+ listening;
    link = link + "&entry.1283128029="+ reading +"&entry.658412876="+ speaking +"&entry.1875431276="+ writing +"&entry.692259590="+ tuitionpayment;
    link = link + "&entry.1385560828="+ tuition +"&entry.901850093="+ gicpayment + "&entry.1308557841=" + gic;

    async function openLink() {
    const browser = await puppeteer.launch({ headless: true }); // Set headless to false if you want to see the browser window.
    const page = await browser.newPage();

    try {
        const urlToOpen = link; // Replace with your desired URL.

        await page.goto(urlToOpen);
        console.log(`Opened the URL: ${urlToOpen}`);

        // You can perform further operations on the opened page here.

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await browser.close();
    }
    }
    openLink();

});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});