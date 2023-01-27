import "./App.css";
import Post from "./components/Post/Post";
import { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchPosts();
  }

  componentDidUpdate(props, state) {
    console.log("Posts number before update: " + state.posts.length);
    console.log("Posts number after update: " + this.state.posts.length);
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
        console.log("HTTP DELETE call was successful.");
        this.setState({
          posts: this.state.posts.filter((post) => post.id !== id),
        });
      }
    });
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
          {this.state.posts &&
            this.state.posts.map((post) => (
              <Post
                key={post.id.toString()}
                id={post.id}
                userId={post.userId}
                title={post.title}
                body={post.body}
                deletePost={this.deletePost}
              />
            ))}
        </ul>
      </div>
    );
  }
}

export default App;
