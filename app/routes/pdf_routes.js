const puppeteer = require('puppeteer');
const fs = require('fs');
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
module.exports = function(app) {
  app.post('/pdf', (req, res) => {
      (async () => {
        const browser = await puppeteer.launch({
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
        file_name = uuidv4() + '.pdf';
        const page = await browser.newPage();
        await page.goto(req.body.url, {waitUntil: 'networkidle2'});
        await page.pdf({path: file_name, format: 'A4'});
        await browser.close();
        fs.readFile(file_name, function(err, data) {
          res.writeHead(200, {'Content-Type': 'application/pdf'});
          res.write(data);
          res.end();
          try {
            fs.unlinkSync(file_name);
            console.log('successfully deleted ' +  file_name);
          } catch (err) {
            console.log('can\'t delete' + file_name);
          }
        });
      })();
    });
};
