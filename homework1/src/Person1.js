import "./Person.css";
import { Component } from "react";

class Person1 extends Component {
  constructor() {
    super();
    this.state = {
      name: "Stepan",
      age: 25,
      initialPerson: false,
    };
  }

  changePerson = () => {
    this.setState({
      initialPerson: !this.state.initialPerson,
      name: this.state.initialPerson ? "Stepan" : "Mykola",
      age: this.state.initialPerson ? 25 : 30,
    });
  };

  render() {
    return (
      <div className="person">
        <p>
          Name: {this.state.name}, age: {this.state.age}
        </p>
        <button onClick={this.changePerson}>Change person</button>
      </div>
    );
  }
}

export default Person1;
