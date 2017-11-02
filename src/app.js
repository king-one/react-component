import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import { Col, Row } from './Layout';
import Menu from './Menu';
import Modal from './Modal';
import confirm from './confirm';
import Input from './Input';
import Icon from './Icon';
import Tooltip from './Tooltip';
import Limit from './Limit';
import { CheckBox, CheckBoxGroup } from './CheckBox';
import SearchInput from './SearchInput';
import Switch from './Switch';
import { Messager, Notfify } from './Alert';
import { Option, Select } from './Select';
const MenuItem = Menu.MenuItem;
const SubMenu = Menu.SubMenu;
const ITEMS = [1,2,3,4,5]
class Root extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            visible: false,
            checkedList: [] 
    };
    }
    // checkbox 全选
  handleCheckedAll = (e) => {
    this.setState({
      checkedList: e.target.checked ? ITEMS.slice() : []
    })
  }

  handleChange =  (v) => {
      Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
        this.splice(index, 1);
        }
        };
    const {checkedList} = this.state;
    console.log(v);
    checkedList.indexOf(v) === -1 ? checkedList.push(v) : checkedList.remove(v);
    this.setState({ checkedList })
  }
    handleClick() {
        alert(0)
    }
    onClick = (e, key) => {
        console.log(key);
    }
    show = () => {
        this.setState({ visible: true });
    }

    hide = () => {
        this.setState({ visible: false });
    }
    render() {
            const { checkedList } = this.state
            const checkedAll = !!checkedList.length && (checkedList.length === ITEMS.length)
            const indeterminate = !!checkedList.length && (checkedList.length !== ITEMS.length)
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
                    <Button onClick={this.show}>show</Button>
                    <Modal visible={this.state.visible} onClose={this.hide}>
                        <Modal.ModalHeader>modal</Modal.ModalHeader>
                        <Modal.ModalBody>这是一个modal组件</Modal.ModalBody>
                        <Modal.ModalFooter onClose={this.hide}></Modal.ModalFooter>
                    </Modal>
                </div>
                <br />
                <div>
                    <Button onClick={() => {
                        confirm('确认删除吗', () => {
                            console.log('confirmed')
                        })
                    }}>删除确认</Button>
                </div>
                <br />
                <div>
                    <Input placeholder={'123456'} ref='inp'
                        onChange={(e) => console.log(this.refs.inp.input.value)}
                        onPressEnter={e => console.log('enter')}
                    />
                </div>
                <div>

                    <Tooltip title="这是一个tooltip 这是一个tooltip 这是一个tooltip 这是一个tooltip">
                        <span>---------------<Icon type="circle" /></span>
                    </Tooltip>
                    <Limit>
                        <p style={{ width: '100px', marginLeft: '100px' }}>我是很长的一段文字，鼠标滑过可显示全部</p>
                    </Limit>
                    <CheckBox value="apple" onChange={e => console.log(e)}>苹果</CheckBox>
                    <CheckBox value="samsung">三星</CheckBox>
                    <CheckBox value="mi" disabled>小米</CheckBox>



                    <CheckBox
                            checked={checkedAll}
                            indeterminate={indeterminate}
                            onChange={this.handleCheckedAll}
                    >全选</CheckBox>
                    <CheckBoxGroup block
                    checkedList={checkedList}
                    onChange = {(v) => this.handleChange(v)}>
                      {ITEMS.map(item => {
                        return <CheckBox key={item} value={item}>{item}</CheckBox>
                      })}
                    </CheckBoxGroup>
                    <SearchInput mode='inner' onSearch={v => console.log(v)} />
                    <SearchInput block onSearch={v => console.log(v)} />
                    <Switch labelOn="打开" labelOff="关闭" />
                    <Switch labelOn="解锁" labelOff="锁定" iconOn='lock' iconOff='unlock' />
                </div>
                <div>
                    <Button onClick={() => {
                        Messager.info({ content: 'this is info message' });
                    }}> 全局提示
                     </Button>
                    <Select>
                        <Option>请选择</Option>
                        <Option value="0">苹果</Option>
                        <Option value="1">三星</Option>
                        <Option value="2">小米</Option>
                    </Select>
                </div>
            </div>
        )
    }
}
ReactDOM.render(
    <Root />,
    document.getElementById('app')
)