import React, { Component, PropTypes } from 'react';
import Icon from '../Icon';
import classnames from 'classnames';
import SubPopupMenu from './SubPopupMenu';
export default class SubMenu extends Component {
    static propTypes = {
        title: PropTypes.string,
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        overlayClassName: PropTypes.string,
        disabled: PropTypes.bool,
        onClick: PropTypes.func
    };

    static defaultProps = {
        prefixCls: _PRE_
    };

    state = {
        subMenuVisible: false
    };

    handleClick = (e, index) => {
        const { onClick } = this.props;
        this.setState({ subMenuVisible: false });
        onClick(e, index);
    };

    titleClickHandler = e => {
        e.stopPropagation();
    };

    onMouseEnter = () => {
        if (this.leaveTimer) {
            clearTimeout(this.leaveTimer);
        }
        this.enterTimer = setTimeout(() => {
            this.setState({ subMenuVisible: true });
        }, 200);
    };

    onMouseLeave = () => {
        if (this.enterTimer) {
            clearTimeout(this.enterTimer);
        }
        this.leaveTimer = setTimeout(() => {
            this.setState({ subMenuVisible: false });
        }, 200);
    };

    renderContent = () => {
        const { prefixCls, children, index, overlayClassName } = this.props;

        return (
            <SubPopupMenu
                prefixCls={prefixCls}
                visible={this.state.subMenuVisible}
                onClick={this.handleClick}
                index={index}
                overlayCls={overlayClassName}
            >
                {children}
            </SubPopupMenu>
        );
    };

    render() {
        const { prefixCls, className, disabled, title, ...other } = this.props;

        const mouseEvents = disabled
            ? {}
            : {
                onMouseEnter: this.onMouseEnter,
                onMouseLeave: this.onMouseLeave
            };
        const classNames = classnames(
            `${prefixCls}-menu-item`,
            `${prefixCls}-submenu`,
            {
                [`${prefixCls}-menu-item-disabled`]: disabled
            },
            className
        );

        return (
            <li className={classNames}
                {...mouseEvents}
                {...other}>
                <div
                    className={classnames(`${prefixCls}-submenu-title`, {
                        [`${prefixCls}-submenu-disabled`]: disabled
                    })}
                    onClick={this.titleClickHandler}
                >
                    {title}
                    {!disabled && <Icon type="angle-right" />}
                </div>
                {!disabled && this.renderContent()}
            </li>
        );
    }
}