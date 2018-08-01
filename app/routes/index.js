const pdfRoutes = require('./pdf_routes');
module.exports = function(app) {
  pdfRoutes(app);
};
