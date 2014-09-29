var express = require('express'),
    app = express();

app.use(express.static(__dirname + '/public'));

var server = app.listen(1338, function() {
  console.log('Listening on port %d', server.address().port);
});
