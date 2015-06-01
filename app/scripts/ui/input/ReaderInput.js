'use strict';

var React = require('react');
var FeedList = require('./FeedList');

var ReaderInput = React.createClass({
  propTypes: {
      loadFeeds:   React.PropTypes.func
  },
  getInitialState: function() {
    return {
      feeds: this.props.feeds
    };
  },
  componentDidMount: function() {
  },
  componentWillUnmount: function() {
  },
  addFeed: function(e) {
    e.preventDefault();
    this.state.feeds.push({ id: Math.floor(Math.random() * 100000), name: '', url: '' });
    this.setState(this.state);
  },
  removeFeed: function(feed) {
    this.state.feeds.splice(this.state.feeds.indexOf(feed), 1);
    this.setState(this.state);
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.loadFeeds(this.state.feeds);
  },
  render: function() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <FeedList feeds={this.state.feeds} remove={this.removeFeed}></FeedList>
          <br/>
          <button onClick={this.addFeed} className="btn btn-default">Ajouter</button>
          <br/>
          <button type="submit" className="btn btn-lg btn-primary">Lire les flux</button>
        </form>
      </div>
    );
  }
});


module.exports = ReaderInput;
