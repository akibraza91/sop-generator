// Import express
import express from 'express';
import bodyParser from 'body-parser';
import puppeteer from 'puppeteer';
import { MongoClient } from 'mongodb';

const app = express();
// Serve files from "public" folder
app.use(express.static('public'));
app.use(express.json()); // parse JSON request bodies

// Set up body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// MongoDB Connection
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

// Select database and collection
const db = client.db('sopdb');
const users = db.collection('students');

app.post('/submit', async(req, res) => {
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

  // Revert mail statement of purpose.
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
      await client.connect();
      console.log('MongoDB is connected.');
      await users.insertOne(req.body);

      const urlToOpen = 'link'; // Replace with your desired URL.

      await page.goto(urlToOpen);
      console.log(`Opened the URL: ${urlToOpen}`);
    } catch (error) {
      console.error('Error: ', error);
    } finally {
      await browser.close();
    }
  }

  openLink().then(() => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" type="text/css" href="/style.css">
        </head>
        <body>
          <div id="overlay">
            <div id="modal">
              <p id="message">Your application submitted successfully. We have sent an email, please check your inbox.</p>
              <div id="ok-btn-box">
                <input type="submit" value="Ok" id="ok-btn">
              </div>
            </div>
          </div>
          <script>
            document.getElementById('ok-btn').addEventListener('click', function() {
              window.location.href = '/';
            });
          </script>
        </body>
      </html>
    `);
  }).catch((err) => {
    console.error(err);
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/style.css">
      </head>
      <body>
        <div id="overlay">
          <div id="modal">
            <p id="message">An error occured while sending data.</p>
            <div id="ok-btn-box">
              <input type="submit" value="Ok" id="ok-btn">
            </div>
          </div>
        </div>
        <script>
          document.getElementById('ok-btn').addEventListener('click', function() {
            window.location.href = '/';
          });
        </script>
      </body>
    </html>
    `);
  });
});

// // Start server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

// Using for Vercel deployment
module.exports = app;