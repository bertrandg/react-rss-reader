'use strict';

var React = require('react');

var Post = React.createClass({
  render: function() {
    var divStyle = {
      color: this.props.content.color
    };

    var date = new Date(this.props.content.publishedDate);
    var dateString = moment(date).format("DD.MM.YYYY");

    return (
      <div className="col-sm-6 col-md-3">
        <div className="thumbnail" style={divStyle}>
          <h2>{this.props.content.title}</h2>
          <span className="label label-default">{dateString}</span><br/>
          <img />
          <p className="caption">
            {this.props.content.contentSnippet}
          </p>
        </div>
      </div>
    );
  }
});


module.exports = Post;
