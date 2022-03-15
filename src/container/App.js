import React, { Component } from "react";
import { robots } from './robots';
import CardList from "../components/CardList";
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css'

class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchfield: ''
        }
        // console.log("Constructor")
    }

    

    onSearchChange = (e) => {
        this.setState({ searchfield: e.target.value });

    }

    componentDidMount() {
        // console.log("ComponentDidMount")
        fetch("http://jsonplaceholder.typicode.com/users")
            .then(response => {
                return response.json()
            })
            .then(users => this.setState({ robots: users }))
    }

    render() {
        const {robots , searchfield} = this.state;
        const filteredRobots = robots.filter(robot => {
            return (robot.name.toLowerCase().includes(searchfield.toLowerCase()));
        })
        console.log("Render");
        // console.log(filteredRobots);
       return !robots.length ?  <h1>Loading</h1> :  (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <CardList robots={filteredRobots} />
                    </Scroll>
                </div>

            )
        }
    }





export default App;