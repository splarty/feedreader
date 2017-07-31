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
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        // Derived From: http://tosbourn.com/using-loops-in-jasmine/

        function urlDefined(feeds) {
            it('URLs are defined', function() {
                expect(feeds).toBeDefined();
                expect(feeds).not.toBeNull();
            });
        }

        for (var x = 0; x < allFeeds.length; x++) {
            urlDefined(allFeeds[x].url);
        }


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        function nameDefined(feeds) {
            it('names are defined', function() {
                expect(feeds).toBeDefined();
                expect(feeds).not.toBeNull();
            });
        }

        for (var y = 0; y < allFeeds.length; y++) {
            nameDefined(allFeeds[x].name);
        }

    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        // Derived From: https://stackoverflow.com/questions/41514126/how-to-write-jasmine-test-case-for-checking-toggle-class-functionality-inside-cl

        // console.log($(document.body)[0]);

        it('hidden by default', function() {
            // expect($(document.body).hasClass('menu-hidden')).toBe(true); 
            expect($(document.body).attr('class')).toEqual('menu-hidden');
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */


        it('menu changes visibility onclick', function() {
            $('.menu-icon-link').click();
            expect($(document.body).attr('class')).not.toEqual('menu-hidden');
            $('.menu-icon-link').click();
            expect($(document.body).attr('class')).toEqual('menu-hidden');
        });



    });


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        /* What is loadFeed() ? */
        /* This function performs everything necessary to load a
         * feed using the Google Feed Reader API. It will then
         * perform all of the DOM operations required to display
         * feed entries on the page. Feeds are referenced by their
         * index position within the allFeeds array.
         * This function all supports a callback as the second parameter
         * which will be called after everything has run successfully.
 
         function loadFeed(id, cb) { */

        /* So, 'loadFeed(0)' loads the initial feed, 'loadFeed(1)' the next and so on */

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });


        it('there is at least a single .entry element within the .feed container', function() {
            // console.log($('.feed > .entry-link > .entry').length);
            var entry = $('.feed > .entry-link > .entry').length;
            expect(entry).toBeGreaterThan(0);
        });
    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        // Derived from http://www.htmlgoodies.com/beyond/javascript/stips/using-jasmine-2.0s-new-done-function-to-test-asynchronous-processes.html

        var feed;
        beforeEach(function(done) {
            loadFeed(0, function() {
                feed = $(".feed").html();
                // Ensure that a new feed is available
                loadFeed(1, function() {
                    done();
                });
            });
        });

        // Make sure when new feed is loaded using loadFeed function,
        // the content changes
        it("when a new feed is loaded by the loadFeed function that the content actually changes", function(done) {
            var newFeed = $(".feed").html();
            // console.log(feed);
            // console.log(newFeed);
            expect(feed).not.toEqual(newFeed);
            done();
        });
    });

}());
