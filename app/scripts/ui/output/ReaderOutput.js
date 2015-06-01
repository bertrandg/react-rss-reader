'use strict';

var React = require('react');
var HeaderControl = require('./HeaderControl');
var PostList = require('./PostList');

var ReaderOutput = React.createClass({
  getInitialState: function() {
    return {
      posts: this.props.posts
    };
  },
  highlightFeed: function(feedUrl) {
    // find all feed posts and update boolean
    
    this.setState(this.getState());
  },
  componentDidMount: function() {},
  componentWillUnmount: function() {},
  render: function() {
    return (
      <div>
        <HeaderControl></HeaderControl>
        <PostList posts={this.state.posts}></PostList>
      </div>
    );
  }
});


module.exports = ReaderOutput;
