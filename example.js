
var wiki = require('./index');

wiki(function(err, pkgs){
  if (err) throw err;
  console.log(pkgs);
})