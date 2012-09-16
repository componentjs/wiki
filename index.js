
/**
 * Module dependencies.
 */

var request = require('superagent')
  , Batch = require('batch')
  , jsdom = require('jsdom');

/**
 * Wiki url.
 */

var wiki = 'https://github.com/component/component/wiki/Components';

/**
 * Remove url.
 */

var remote = 'https://github.com';

/**
 * jQuery url.
 */

var jquery = 'http://code.jquery.com/jquery-1.5.min.js';

/**
 * Fetch component.json files and invoke `fn(err, pkgs)`.
 *
 * @param {Function} fn
 * @api public
 */

module.exports = function(fn){
  var batch = new Batch;

  request
  .get(wiki)
  .end(function(res){
    jsdom.env(res.text, [jquery], function(err, window){
      if (err) throw err;
      var $ = window.$;

      var lists = $('#wiki-body h2 + ul');

      lists.each(function(){
        var items = $(this).find('li');

        items.each(function(){
          var a = $(this).find('a')[0];

          var url = a.href.replace('://', '://raw.') + '/master/component.json';
          batch.push(function(done){
            request
            .get(url)
            .end(function(res){
              if (!res.ok) {
                console.warn('failed %s (%d)', url, res.status);
                return done();
              }

              try {
                var obj = JSON.parse(res.text);

                if (!obj.repo) {
                  var repo = a.textContent;
                  console.warn('"repo" missing for %s', repo);
                  // TODO: remove and warn user via GH api
                  obj.repo = repo;
                }

                done(null, obj);
              } catch (err) {
                done(err);
              }
            })
          })
        })
      })

      batch.end(fn);
    });
  });
};