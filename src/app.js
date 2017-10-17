import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import { Col, Row } from './Layout';
import Menu from './Menu';
const MenuItem = Menu.MenuItem;
const SubMenu = Menu.SubMenu;
class Root extends Component {
    handleClick() {
        alert(0)
    }
    onClick = (e, key) => {
     console.log(key);
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
                    <Row gutther>
                        <Col col="md-4" style={{ padding: '20px', backgroundColor: '#e8e8e8' }}>md-4</Col>
                        <Col col="md-6" style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>md-8</Col>
                    </Row>
                </div>
                <div>
                    <Menu
                        className="hello"
                        onClick={this.onClick}
                    >
                        <MenuItem key="1-1" className="food">食品分类</MenuItem>
                        <MenuItem key="1-2" disabled>服装分类</MenuItem>
                        <SubMenu title={"电器分类"} overlayClassName="sub">
                            <MenuItem key="2-1" className="tv">电视机</MenuItem>
                            <MenuItem key="2-2" disabled>笔记本</MenuItem>
                            <MenuItem key="2-3">洗衣机</MenuItem>
                        </SubMenu>
                        <SubMenu title={"美妆分类"}>
                            <MenuItem key="3-1">眼影</MenuItem>
                            <MenuItem key="3-2">洗面奶</MenuItem>
                        </SubMenu>
                    </Menu>
                </div>
            </div>

        )
    }
}
ReactDOM.render(
    <Root />,
    document.getElementById('app')
)