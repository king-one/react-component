import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from './Button'
class Root extends Component {
    render() {
        return (
            <div>
                 <h4>Button</h4>
                 <Button>primary</Button>
                 <Button feature='minor'>minor</Button>
                 <Button feature='success'>success</Button>
                 <Button feature='warning'>warning</Button>
                 <Button feature='danger'>danger</Button>
                 <Button circle >start</Button>
                 <Button icon="plus">add</Button>
                 <Button icon="plus" circle />
                 <Button feature="transparent" >transparent</Button>
                 <Button disabled >disabled</Button>
            </div>
           
        )
    }
}
ReactDOM.render(
    <Root />,
    document.getElementById('app')
)