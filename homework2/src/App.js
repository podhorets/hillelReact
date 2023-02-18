import "./App.css";
import Post from "./components/Post/Post";
import EditModal from "./components/EditModal/EditModal";
import { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      selectedPost: null,
      loading: true,
      error: null,
      modalEnabled: false,
    };
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts() {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((posts) => {
        this.setState({ posts: posts, error: null });
      })
      .catch((err) => {
        this.setState({ posts: null, error: err.message });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  deletePost = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        this.setState({ posts: this.state.posts.filter(post => post.id !== id) });
      }
    });
  };

  editPost = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: this.state.selectedPost.id,
        userId: this.state.selectedPost.userId,
        title: this.state.selectedPost.updatedTitle,
        body: this.state.selectedPost.body,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.ok) {
        const posts = this.state.posts;
        const index = posts.findIndex(post => post.id === id);
        posts[index] = this.state.selectedPost;
        this.setState({ posts: posts, selectedPost: null, modalEnabled: false });
      }
    });
  };

  updateTitle = (updatedTitle) => {
    const selectedPost = this.state.selectedPost;
    selectedPost.title = updatedTitle;
    this.setState({ selectedPost: selectedPost });
  }

  showModal = (id) => {
    const index = this.state.posts.findIndex(post => post.id === id)
    this.setState({ modalEnabled: true, selectedPost: this.state.posts[index] });
  };

  render() {
    return (
      <div className="App">
        <h1>Posts</h1>
        {this.state.loading && <div>A moment please...</div>}
        {this.state.error && (
          <div>{`There is a problem fetching the post data - ${this.state.error}`}</div>
        )}
        <ul>
          {this.state.posts.length &&
            this.state.posts.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                userId={post.userId}
                title={post.title}
                body={post.body}
                deletePost={this.deletePost}
                showModal={this.showModal}
              />
            ))}
        </ul>
        {this.state.modalEnabled && (
          <EditModal
            id={this.state.selectedPost.id}
            title={this.state.selectedPost.title}
            updateTitle={this.updateTitle}
            editPost={this.editPost}
          />
        )}
      </div>
    );
  }
}

export default App;
