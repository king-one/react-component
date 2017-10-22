import React, { Component, PropTypes } from 'react';
import {Dialog,ModalBody,ModalFooter,ModalHeader} from './Dialog'
import classnames from 'classnames';
import './index.less';
// env

const inBrowser = typeof window !== 'undefined';
class Modal extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        measure: PropTypes.string,
        visible: PropTypes.bool,
        showMask: PropTypes.bool,
        closeOnEsc: PropTypes.bool,
        closeMaskOnClick: PropTypes.bool,
        showCloseButton: PropTypes.bool,
        animation: PropTypes.string, //zoom fade flip door rotate slideUp slideDown slideLeft slideRight
        enterAnimation: PropTypes.string,
        leaveAnimation: PropTypes.string,
        duration: PropTypes.number,
        className: PropTypes.string,
        customStyles: PropTypes.object,
        customMaskStyles: PropTypes.object,
        onClose: PropTypes.func.isRequired,
        onAnimationEnd: PropTypes.func
    };

    static defaultProps = {
        prefixCls: _PRE_ + '-modal',
        width: 400,
        height: 240,
        measure: 'px',
        visible: false,
        showMask: true,
        closeOnEsc: true,
        closeMaskOnClick: true,
        showCloseButton: true,
        animation: 'zoom',
        duration: 200,
        customStyles: {},
        customMaskStyles: {},
    };

    state = {
        isShow: false,
        animationType: 'leave'
    };

    componentDidMount() {
        if (this.props.visible) {
            this.enter();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.visible && nextProps.visible) {
            this.enter();
        } else if (this.props.visible && !nextProps.visible) {
            this.leave();
        }
    }

    enter() {
        this.setState({
            isShow: true,
            animationType: 'enter'
        });
    }

    leave() {
        const { duration } = this.props;
        this.setState({
            animationType: 'leave'     
        }, () => {
            setTimeout(
                () => this.setState({
                    isShow: false
                }), duration)
        }
        );
    }

    onKeyUp = e => {
        const {closeOnEsc,onClose} = this.props
        if (closeOnEsc && e.keyCode === 27) {
            onClose();
        }
    }
    render() {
        const { prefixCls, className, children, closeMaskOnClick, onClose, showMask, duration, customMaskStyles, ...ohter } = this.props;
        const { animationType, isShow } = this.state;
        const onClick = closeMaskOnClick ? onClose : null;
        const classNames = classnames(
            prefixCls,
            {
                [`${prefixCls}-fade-${animationType}`]: animationType
            },
            className
        ) 
        const mask = showMask ? <div className={`${prefixCls}-mask`} style={customMaskStyles} onClick={onClick} /> : null;
        const style = {
            display: isShow ? '' : 'none',
            animationDuration: duration + 'ms',
            WebkitAnimationDuration: duration + 'ms'
        };
        return (
            <div
                style={style}
                className={classNames}
                tabIndex="-1"
                ref={el => { this.el = el; }}
                onKeyUp={this.onKeyUp}
            >
                {mask}
                <Dialog
                    {...ohter}
                    duration={duration}
                    onClose={onClose}
                    animationType={animationType}>
                    {children}
                </Dialog>
            </div>
        )
    }
}
Modal.ModalHeader = ModalHeader;
Modal.ModalBody = ModalBody;
Modal.ModalFooter = ModalFooter;
export default Modal;