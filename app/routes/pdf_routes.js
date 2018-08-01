const puppeteer = require('puppeteer');
const fs = require('fs');
module.exports = function(app) {
  app.post('/pdf', (req, res) => {
      (async () => {
        const browser = await puppeteer.launch({
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
        const page = await browser.newPage();
        await page.goto(req.body.url, {waitUntil: 'networkidle2'});
        await page.pdf({path: 'hn.pdf', format: 'A4'});
        await browser.close();
        fs.readFile('hn.pdf', function(err, data) {
          res.writeHead(200, {'Content-Type': 'application/pdf'});
          res.write(data);
          res.end();
        });
      })();
    });
};
