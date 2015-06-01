'use strict';

var React = require('react');
var Post = require('./Post');

// https://gist.github.com/eiriklv/d52ff58a44113092b857
// http://blog.vullum.io/react-masonry-mixin/

var MasonryMixin = require('./../../mixin/react-masonry-mixin.js');

var PostList = React.createClass({
  mixins: [MasonryMixin('masonryContainer', {})],
  render: function() {
    console.log('POSTLIST > ', this.props.posts);

    var createPost = function(post) {
      return (
        <Post key={post.id} content={post}></Post>
      );
    };

    return (
      <ul className=" post-container row" ref="masonryContainer">
        {this.props.posts.map(createPost)}
      </ul>
    );
  }
});


module.exports = PostList;