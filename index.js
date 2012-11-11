
/**
 * Module dependencies.
 */

var request = require('superagent')
  , Batch = require('batch')
  , jquery = require('cheerio').load;

/**
 * Wiki url.
 */

var wiki = 'https://github.com/component/component/wiki/Components';

/**
 * Remove url.
 */

var remote = 'https://github.com';

/**
 * Fetch component.json files and invoke `fn(err, pkgs)`.
 *
 * @param {Function} fn
 * @return {Batch}
 * @api public
 */

module.exports = function(fn){
  var batch = new Batch;

  request
  .get(wiki)
  .end(function(err, res){
    if (err) return fn(err);
    var $ = jquery(res.text);

    $('#wiki-body h2 + ul li').each(function(){
      var a = $(this).find('a');
      var href = a.attr('href').replace(/\/$/, '') // remove trailing slash

      var url = href.replace('://', '://raw.') + '/master/component.json';

      batch.push(function(done){
        request
        .get(url)
        .end(function(err, res){
          if (err || !res.ok) {
            console.warn('failed %s (%d)', url, res.status);
            return done(err);
          }

          try {
            var obj = JSON.parse(res.text);

            if (!obj.repo) {
              var repo = a.text();
              console.warn('"repo" missing for %s', repo);
              // TODO: remove and warn user via GH api
              obj.repo = repo;
            }

            done(null, obj);
          } catch (err) {
            err.url = url;
            err.json = true;
            batch.emit('error', err);
            done();
          }
        });
      });
    });

    batch.end(fn);
  });

  return batch;
};
