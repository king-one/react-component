import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import pages from "./pages"
import Header from "./components/Header"
import Side from "./components/Side"
import "./index.less"
class Root extends Component {
    constructor(props) {
        super(props)
        const routes = location.hash.match(/(?:\/(.+))?\/(.+)/);
        this.state = {
            currentPage: routes ? routes[2] ? routes[2] : "Button" : "Button"
        }
        this.allPages = [];
        pages.map(v => {
            this.allPages = this.allPages.concat(v.components)
        })
    }

    componentWillMount() {
        window.addEventListener("hashchange", () => {
            const routes = location.hash.match(/(?:\/(.+))?\/(.+)/);
            window.scrollTo(0, 0);
            console.log(routes[2])
            this.setState({
                currentPage: routes[2]
            })
        }, false);
    }
    getPageComponent(page) {
        let pageComponent = null;
        this.allPages.some(v => {
            if (v.en === page) {
                pageComponent = React.createElement(v.component.default, null)
                return true
            }
        })
        return pageComponent
    }
    render() {
        const {currentPage} = this.state
        return (
            <div className="container">
                <Header />
                <div className="main-content">
                    <Side currentPage={currentPage}/>
                    <div className="page-container">
                        {this.getPageComponent(currentPage)}
                    </div>
                </div>
            </div>
        )
    }
}
ReactDOM.render(
    <Root />,
    document.getElementById('app')
)