// https://github.com/randylien/generator-react-gulp-browserify

var React = window.React = require('react');
var ReaderInput = require('./ui/input/ReaderInput');
var ReaderOutput = require('./ui/output/ReaderOutput');



var ReaderApp = React.createClass({
  getInitialState: function() {
    return {
      currentPage: 'input', // input / loading / output
      feeds: [
        { id: 1, url: 'https://blog.nraboy.com/feed/' },
        { id: 2, url: 'http://bertrandg.github.io/feed.xml' },
        { id: 3, url: 'http://feeds.feedburner.com/TEDTalks_video' },
        { id: 4, url: 'http://feeds.nationalgeographic.com/ng/photography/photo-of-the-day/' },
        { id: 5, url: 'http://www.botanicalgarden.ubc.ca/potd/index.xml' }
      ],
      posts: []
    };
  },
  loadFeeds: function(feeds) {
    var _this = this;

    this.setState({
      currentPage: 'loading',
      feeds: feeds,
      posts: []
    });

    var deferred = getEntriesFromFeeds(feeds);

    deferred.done(function(entries) {
      console.log('entries = ', entries);

      _this.setState({
        currentPage: 'output',
        feeds: _this.state.feeds,
        posts: entries
      });
    });
  },
  backToInput: function() {
    this.setState({
      currentPage: 'input',
      feeds: feeds,
      posts: []
    });
  },
  render: function() {
    var _this = this;

    function getContent() {
      switch(_this.state.currentPage) {
        case 'input':
          return <ReaderInput feeds={_this.state.feeds} loadFeeds={_this.loadFeeds}></ReaderInput>;
        case 'loading':
          return <p className="text-center">Loading in progress..</p>;
        case 'output':
          return <ReaderOutput posts={_this.state.posts} back={_this.backToInput}></ReaderOutput>;
      }
    }

    return (
      <div>{getContent()}</div>
    );
  }
});

$(document).ready(function() {
  React.render(<ReaderApp />, document.getElementById("app"));
})




function getEntriesFromFeeds(feeds) {

  var deferred = $.Deferred();
  var allEntries = [];
  var nbFeedSuccess = 0;

  feeds.forEach(function(feed) {
    var promise = getEntriesFromFeed(feed);
    var randomColor = 'rgba(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ', .2)';

    promise.done(function(response) {
      var feed = response.responseData.feed;
      var feedEntries = feed.entries;
      for(var i = 0; i < feedEntries.length; i++) {
        feedEntries[i]['id'] = Math.floor(Math.random() * 100000);
        feedEntries[i]['color'] = randomColor;
      }
      allEntries = allEntries.concat(feedEntries);

      nbFeedSuccess++;
      if(nbFeedSuccess === feeds.length) {
        allEntries.sort(function(a,b){
          return new Date(b.publishedDate) - new Date(a.publishedDate);
        });

        deferred.resolve(allEntries);
      }
    });
  });

  return deferred;
}

function getEntriesFromFeed(feed) {
  return $.ajax({
    type: 'GET',
    url: 'http://ajax.googleapis.com/ajax/services/feed/load',
    data: {
      v: '1.0',
      q: feed.url
    },
    dataType: 'jsonp'
  });
}