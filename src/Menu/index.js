import React, {PropTypes} from 'react';
import classnames from 'classnames';
import CommonMenu from './CommonMenu';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
import './index.less';
const propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func
};
const defaultProps = {
    prefixCls: _PRE_,
};
class Menu extends CommonMenu {
    handleClick = (e, key) => {
        e.stopPropagation();
        const { onClick } = this.props;
        onClick && onClick(e, key);
    };

    renderMenuItem = (c, i, index) => {
        if (!c) {
            return null;
        }
        return this.renderCommonMenuItem(c, i, index);
    };

    render() {
        const { children, prefixCls, className } = this.props;
        return (
            <ul className={classnames(`${prefixCls}-menu`, className)}>
                {React.Children.map(children, this.renderMenuItem)}
            </ul>
        );
    }
}

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;
Menu.MenuItem = MenuItem;
Menu.SubMenu = SubMenu;
export default Menu;