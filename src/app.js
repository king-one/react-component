import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import Col from './Layout/Col';
class Root extends Component {
    handleClick() {
        alert(0)
    }
    render() {
        return (
            <div>
                <div>
                    <h4>按钮</h4>
                    <Button>primary</Button>
                    <Button feature='minor'>minor</Button>
                    <Button feature='success'>success</Button>
                    <Button feature='warning'>warning</Button>
                    <Button feature='danger'>danger</Button>
                    <Button circle >start</Button>
                    <Button icon="plus">add</Button>
                    <Button icon="plus" circle />
                    <Button size="lg">大尺寸</Button>
                    <Button size="sm">小尺寸</Button>
                    <Button feature="transparent">transparent</Button>
                    <Button disabled >disabled</Button>
                </div>
                <div>
                    <h4>按钮组</h4>
                    <ButtonGroup>
                        <Button>按钮1</Button>
                        <Button>按钮2</Button>
                        <Button>按钮3</Button>
                        <Button>按钮4</Button>
                        <Button>按钮5</Button>
                    </ButtonGroup>
                    <br></br>
                    <br></br>
                    <ButtonGroup feature='vertical'>
                        <Button>按钮1</Button>
                        <Button>按钮2</Button>
                        <Button>按钮3</Button>
                        <Button>按钮4</Button>
                        <Button>按钮5</Button>
                    </ButtonGroup>
                    <br></br>
                    <br></br>
                    <ButtonGroup feature='bettween'>
                        <Button>按钮1</Button>
                        <Button>按钮2</Button>
                        <Button>按钮3</Button>
                        <Button>按钮4</Button>
                        <Button>按钮5</Button>
                    </ButtonGroup>
                      <br></br>
                    <br></br>
                     <ButtonGroup feature='around'>
                        <Button>按钮1</Button>
                        <Button>按钮2</Button>
                        <Button>按钮3</Button>
                        <Button>按钮4</Button>
                        <Button>按钮5</Button>
                    </ButtonGroup>
                </div>
                <div>
                    <h4>布局</h4>
                    <Col col="md-4" style={{padding: '20px', backgroundColor: '#e8e8e8'}}>md-4</Col>
                    <Col col="md-8" style={{padding: '20px', backgroundColor: '#f5f5f5'}}>md-8</Col>
                </div>
            </div>

        )
    }
}
ReactDOM.render(
    <Root />,
    document.getElementById('app')
)