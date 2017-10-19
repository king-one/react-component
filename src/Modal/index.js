import React, {Component,PropTypes} from 'react';
import Dialog from './Dialog'
import classnames from 'classnames';
import './index.less';
// env
const inBrowser = typeof window !== 'undefined';
const UA = inBrowser && window.navigator.userAgent.toLowerCase();
const isIE9 = UA && UA.indexOf('msie 9.0') > 0;

/*const Dialog = props => {
    const animation = (props.animationType === 'enter' ? props.enterAnimation : props.leaveAnimation) || props.animation;
    const className = `rodal-dialog rodal-${animation}-${props.animationType}`;
    const CloseButton = props.showCloseButton ? <span className="rodal-close" onClick={props.onClose} /> : null;
    const { width, height, measure, duration, customStyles } = props;
    const style = {
        width: width + measure,
        height: height + measure,
        animationDuration: duration + 'ms',
        WebkitAnimationDuration: duration + 'ms'
    };
    const mergedStyles = { ...style, ...customStyles };

    return (
        <div style={mergedStyles} className={className}>
            {CloseButton}
            {props.children}
        </div>
    )
};*/
class Modal extends Component {

    static propTypes = {
        prefixCls        :PropTypes.string,
        width            : PropTypes.number,
        height           : PropTypes.number,
        measure          : PropTypes.string,
        visible          : PropTypes.bool,
        showMask         : PropTypes.bool,
        closeOnEsc       : PropTypes.bool,
        closeMaskOnClick : PropTypes.bool,
        showCloseButton  : PropTypes.bool,
        animation        : PropTypes.string, //zoom fade flip door rotate slideUp slideDown slideLeft slideRight
        enterAnimation   : PropTypes.string,
        leaveAnimation   : PropTypes.string,
        duration         : PropTypes.number,
        className        : PropTypes.string,
        customStyles     : PropTypes.object,
        customMaskStyles : PropTypes.object,
        onClose          : PropTypes.func.isRequired,
        onAnimationEnd   : PropTypes.func
    };

    static defaultProps = {
        prefixCls: _PRE_ +'-modal',
        width            : 400,
        height           : 240,
        measure          : 'px',
        visible          : false,
        showMask         : true,
        closeOnEsc       : false,
        closeMaskOnClick : true,
        showCloseButton  : true,
        animation        : 'zoom',
        enterAnimation   : '',
        leaveAnimation   : '',
        duration         : 300,
        className        : '',
        customStyles     : {},
        customMaskStyles : {},
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
        this.setState(isIE9
            ? { isShow: false }
            : { animationType: 'leave' }
        );
    }

    onKeyUp = event => {
        if (this.props.closeOnEsc && event.keyCode === 27) {
            this.props.onClose();
        }
    }

    animationEnd = event => {
        if (this.state.animationType === 'leave') {
            this.setState({ isShow: false });
        } else if (this.props.closeOnEsc) {
            this.el.focus();
        }

        if (event.target === this.el) {
            const { onAnimationEnd } = this.props;
            onAnimationEnd && onAnimationEnd();
        }
    }

    render() {
        debugger
        const {prefixCls,className,children,closeMaskOnClick,onClose,showMask,
              animationType,isShow,duration,customMaskStyles,...ohter} = this.props;
        const onClick = closeMaskOnClick ? onClose : null;
        const classNames = classnames(
            prefixCls,
            {
             [`${prefixCls}-fade-${animationType}`]:animationType
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
                onAnimationEnd={this.animationEnd}
                tabIndex="-1"
                ref={el => { this.el = el; }}
                onKeyUp={this.onKeyUp}
            >
                {mask}
                <Dialog 
                     {...ohter} 
                     animationType={animationType}>
                    {children}
                </Dialog>
            </div>
        )
    }
}

export default Modal;