import "./Person.css";
import { Component } from "react";

class Person2 extends Component {
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
        <button onClick={this.hidePerson}>Press me</button>
      </div>
    );
  }
}

export default Person2;
