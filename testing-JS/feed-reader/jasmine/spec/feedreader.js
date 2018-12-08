/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {

        // check to see if the feed is defined
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /**
         * @description tests all the feeds for an URL, and that it is defined, and not empty
         */
         it('URL are defined, and not empty', function() {
          allFeeds.forEach(function(feed) {
            expect(feed.url).toBeDefined();
            expect(feed.url).not.toBe('');
          });
         });

         /**
          * @description tests all the feeds for a name, and that it is defined, and not empty
          */
         it('names are defined, and not empty', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.name).toBeDefined();
             expect(feed.name).not.toBe('');
           });
         });

    });


    describe('The menu', function() {

      /**
       * @description tests if the menu is hidden by default
       */
      it('checks if menu is hidden by default', function() {
        expect($('body').hasClass('menu-hidden')).toBe(true);
      });

      /**
       * @description tests to see if the menu become visible when the icon is clicked
       */
      it('menu changes to visibile when icon is clicked', function() {
        $('.menu-icon-link').trigger('click');
        expect($('body').hasClass('menu-hidden')).not.toBe(true);
      });

      /**
       * @description tests that when the menu is closed that it isn't visible anymore
       */
      it('menu isn\'t visible', function() {
        $('.menu-icon-link').trigger('click');
        expect($('body').hasClass('menu-hidden')).toBe(true);
      });

    });

    describe('Initial Entries', function() {

      beforeEach(function(done) {
        loadFeed(0, done);
      })

      /**
       * @description checks to see that there is atleast one entry in the feed
       */
      it('at least one entry in the feed', function() {
        expect($('.feed .entry').length).toBeGreaterThan(0);
      });

    });

    describe('New Feed Selection', function() {
      let prevUrl;
      let newUrl;

      /**
       * @description run a before each to test for URL changes
       */
      beforeEach(function(done) {
        loadFeed(0, function() {
          prevUrl = allFeeds[0].url;
          loadFeed(1, function() {
            newUrl = allFeeds[1].url;
            done();
          });
        });
      });

      /**
       * @description checks that the newUrl isn't the same as the prevUrl
       */
      it('loadFeed content changes on load', function() {
        expect(newUrl).not.toBe(prevUrl);
      });

    });

}());
