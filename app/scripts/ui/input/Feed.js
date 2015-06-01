'use strict';

var React = require('react');

var Feed = React.createClass({
  getInitialState: function() {
    return {
      feed: this.props.feed
    };
  },
  updateUrl: function(event) {
    this.state.feed.url = event.target.value;
    this.setState(this.state);
  },
  render: function() {

    return (
      <div className="form-inline">
        <label>Feed</label>
        <input type="url" placeholder="Url" value={this.state.feed.url} className="form-control" onChange={this.updateUrl} required />
        <button className="btn btn-danger" onClick={this.props.remove.bind(null)}>X</button>
      </div>
    );
  }
});


module.exports = Feed;