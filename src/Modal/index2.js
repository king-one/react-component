/* ===============================
 * Rodal v1.5.4 http://rodal.cn
 * =============================== */

import React from 'react';
import PropTypes from 'prop-types';
const inBrowser = typeof window !== 'undefined';
const UA = inBrowser && window.navigator.userAgent.toLowerCase();
const isIE9 = UA && UA.indexOf('msie 9.0') > 0;

const Dialog = props => {
    const className = `rodal-dialog rodal-${props.animation}-${props.animationType}`;
    const CloseButton = props.showCloseButton ? (<span className="rodal-close" onClick={props.onClose} >88</span>) : null;
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
};

class Rodal extends React.Component {

    static propTypes = {
        width            : PropTypes.number,
        height           : PropTypes.number,
        measure          : PropTypes.string,
        visible          : PropTypes.bool,
        showMask         : PropTypes.bool,
        closeMaskOnClick : PropTypes.bool,
        showCloseButton  : PropTypes.bool,
        animation        : PropTypes.string,
        duration         : PropTypes.number,
        className        : PropTypes.string,
        customStyles     : PropTypes.object,
        customMaskStyles : PropTypes.object,
        onClose          : PropTypes.func.isRequired,
        onAnimationEnd   : PropTypes.func
    };

    static defaultProps = {
        width            : 400,
        height           : 240,
        measure          : 'px',
        visible          : false,
        showMask         : true,
        closeMaskOnClick : true,
        showCloseButton  : true,
        animation        : 'zoom',
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

    animationEnd = () => {
        if (this.state.animationType === 'leave') {
            this.setState({ isShow: false });
        }

        const { onAnimationEnd } = this.props;
        onAnimationEnd && onAnimationEnd();
    }

    render() {
        const { props, state } = this;
        const onClick = props.closeMaskOnClick ? props.onClose : null;
        const mask = props.showMask ? <div className="rodal-mask" style={props.customMaskStyles} onClick={onClick} /> : null;
        const style = {
            display: state.isShow ? '' : 'none',
            animationDuration: props.duration + 'ms',
            WebkitAnimationDuration: props.duration + 'ms'
        };

        return (
            <div style={style}
                 className={"rodal rodal-fade-" + state.animationType + ' ' + props.className}
                 onAnimationEnd={this.animationEnd}
            >
                {mask}
                <Dialog {...props} animationType={state.animationType}>
                    {props.children}
                </Dialog>
            </div>
        )
    }
}

export default Rodal;
