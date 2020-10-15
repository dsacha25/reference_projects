import React, { Component } from "react";

import "./App.css";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
      title: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users }));
  }

  filterMonster() {
    this.setState({});
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value, title: e.target.value });
  };

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="App">
        <header className="App-header">
          <h1>Monster Rolodex</h1>
          <SearchBox
            placeholder="Search Monsters"
            handleChange={this.handleChange}
          />
          <CardList monsters={filteredMonsters} />
        </header>
      </div>
    );
  }
}

export default App;
