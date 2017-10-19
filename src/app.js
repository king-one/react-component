import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import { Col, Row } from './Layout';
import Menu from './Menu';
import Modal from './Modal';
const MenuItem = Menu.MenuItem;
const SubMenu = Menu.SubMenu;
class Root extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: false };
    }
    handleClick() {
        alert(0)
    }
    onClick = (e, key) => {
        console.log(key);
    }
    show() {
        this.setState({ visible: true });
    }

    hide() {
        this.setState({ visible: false });
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
                    <Menu className="simple" onClick={this.onClick}>
                        <MenuItem>广东</MenuItem>
                        <SubMenu title="江苏">
                            <MenuItem>苏州</MenuItem>
                            <MenuItem>无锡</MenuItem>
                            <MenuItem>常州</MenuItem>
                            <MenuItem>镇江</MenuItem>
                            <SubMenu title="南京">
                                <MenuItem>江宁区</MenuItem>
                                <MenuItem>仙林区</MenuItem>
                            </SubMenu>
                        </SubMenu>
                        <MenuItem disabled>山东</MenuItem>
                        <MenuItem >湖北</MenuItem>
                        <SubMenu title="浙江">
                            <SubMenu title="杭州">
                                <MenuItem>西湖区</MenuItem>
                                <MenuItem>上城区</MenuItem>
                            </SubMenu>
                            <MenuItem>温州</MenuItem>
                            <MenuItem>绍兴</MenuItem>
                            <MenuItem>嘉兴</MenuItem>
                        </SubMenu>
                    </Menu>
                </div>
                <br></br>
                <div>
                        <Button onClick={this.show.bind(this)}>show</Button>

                        <Modal visible={this.state.visible} onClose={this.hide.bind(this)}>
                            <div>Content</div>
                        </Modal>
            </div>
            </div>

        )
    }
}
ReactDOM.render(
    <Root />,
    document.getElementById('app')
)