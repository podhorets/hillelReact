import "./Person.css";
import { Component } from "react";

class Person3 extends Component {
  constructor() {
    super();
    this.state = {
      textHidden: false,
    };
  }

  hidePerson = () => {
    this.setState({ textHidden: !this.state.textHidden });
  };

  render() {
    return (
      <div className="person">
        <p hidden={this.state.textHidden}>Name: Stepan, age: 25</p>
        <button onClick={this.hidePerson}>
          {this.state.textHidden ? "Show" : "Hide"}
        </button>
      </div>
    );
  }
}

export default Person3;
