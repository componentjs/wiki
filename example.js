
var wiki = require('./index');

wiki(function(err, pkgs){
  if (err) throw err;
  console.log(pkgs);
}).on('error', function(err){
  console.error('\033[31mjson failed to parse:\033[0m %s', err.url);
});