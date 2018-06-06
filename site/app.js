import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import demos from "./demos"
class Root extends Component {
    getCompontents(category) {
       const demo = Object.values(demos.components)[0]
       return React.createElement(demo[category].default,null)
    }
    render() {
        return (
            <div>
                {this.getCompontents("button")}
            </div>
        )
    }
}
ReactDOM.render(
    <Root />,
    document.getElementById('app')
)