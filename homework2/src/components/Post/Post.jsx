import { PureComponent } from "react";
import "./Post.css";

class Post extends PureComponent {
  render() {
    console.log("render post " + this.props.id);
    return (
      <div className="post">
        <span className="title">{this.props.title}</span>
        <span className="body">{this.props.body}</span>
        <button
          className="button"
          onClick={() => this.props.deletePost(this.props.id)}
        >
          Delete post
        </button>
        <button
          className="button"
          onClick={() => this.props.showModal(this.props.id)}
        >
          Edit title
        </button>
      </div>
    );
  }
}

export default Post;
