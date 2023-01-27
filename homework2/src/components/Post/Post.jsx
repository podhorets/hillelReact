import { Component } from "react";
import "./Post.css";
import EditModal from "../EditModal/EditModal";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalEnabled: false,
      title: props.title,
    };
  }

  componentDidUpdate(props, state) {
    if (state.title !== this.state.title) {
      console.log(`title was changed from '${state.title}' to '${this.state.title}'.`);
    }
  }

  componentWillUnmount() {
    console.log(`Post with following title '${this.state.title}' was removed.`);
  }

  editTitle = (updatedTitle) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${this.props.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: this.props.id,
        userId: this.props.userId,
        title: updatedTitle,
        body: this.props.body
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("HTTP PUT call was successful.");
          this.setState({ title: updatedTitle });
        }
      });
  };
  
  showModal = () => {
    this.setState({ modalEnabled: true });
  };

  hideModal = () => {
    this.setState({ modalEnabled: false });
  };

  render() {
    return this.state.postDeleted ? (
      {}
    ) : (
      <div className="post">
        <span className="title">{this.state.title}</span>
        <span className="body">{this.props.body}</span>
        <button className="button" onClick={() => this.props.deletePost(this.props.id)}>
          Delete post
        </button>
        <button className="button" onClick={this.showModal}>
          Edit title
        </button>
        {this.state.modalEnabled && (
          <EditModal
            title={this.state.title}
            hideModal={this.hideModal}
            editTitle={this.editTitle}
          />
        )}
      </div>
    );
  }
}

export default Post;
