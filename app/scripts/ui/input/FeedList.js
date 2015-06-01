'use strict';

var React = require('react');
var Feed = require('./Feed');

var FeedList = React.createClass({
  propTypes: {
      remove:   React.PropTypes.func
  },
  render: function() {
    var _this = this;

    return (
      <div>
        <ul>
          {this.props.feeds.map(function(feed) {
            return (
              <Feed key={feed.id} feed={feed} remove={_this.props.remove.bind(null, feed)}></Feed>
            );
          })}
        </ul>
      </div>
    );
  }
});


module.exports = FeedList;