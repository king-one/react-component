import React, { Component, PropTypes } from 'react';
import Button from '../Button';
import classnames from 'classnames';
const propTypes = {
    prefixCls: PropTypes.string
}
const defaultProps = {
    prefixCls: _PRE_ + '-modal'
}
const ModalHeader = props =>{
    const{prefixCls,children} = props;
    return(
        <div className={`${prefixCls}-header`}>{children}</div>
    )
}
const ModalBody = props => {
    const {prefixCls,children} = props;
    return(
    <div className={`${prefixCls}-body`}>{children}</div>
    )
}
const ModalFooter = props => {
    const {prefixCls,children,onClose} = props;
    return(
        <div className={`${prefixCls}-footer`}>
        <Button className="confirm-btn" onClick={() => onClose(true) }>确定</Button>
        <Button className="cancel-btn" feature='minor' onClick={() => onClose(false)}>取消</Button>
        </div>
    )
}
class Dialog extends Component{
    state = {
        top : 0,
        left : 0
    }
    mouseDown = (e) => {
        const { top,left } = this.state;
        const {version} = this.props;
        console.log("down:"+top+"-"+left);
        const x = e.clientX;
        const y = e.clientY;
        const $target = $(this.refs.move);
        const dialog = this;
        let isMove = false;

        $("body").on("mousemove",function(el){
            isMove = true;
            const rTop =(top || 0) - (y-el.clientY)*2;
            const rLeft = (left || 0) - (x-el.clientX)*2;
            console.log("move:"+rTop+"-"+rLeft);
            $target.css({
                top : rTop,
                left : rLeft
            });
            $(this).css({    cursor: 'move'})
        }).on("mouseup",function(el){
            if(isMove){
                const rTop =(top || 0) - (y-el.clientY)*2;
                const rLeft = (left || 0) - (x-el.clientX)*2;
                console.log("up:"+rTop+"-"+rLeft);
                dialog.setState({
                    top : rTop,
                    left : rLeft
                });
                localStorage.setItem("dialog-"+version,JSON.stringify({
                    top : rTop,
                    left : rLeft
                }))
            }
            $("body").off("mousemove").off("mouseup");
            $(this).css({    cursor: 'default'})
        })
    }
    componentWillMount(){
        const {version} = this.props;
        if(version){
            const prop = localStorage.getItem("dialog-"+version);
            prop && this.setState(JSON.parse(prop))
        }
    }
  render(){
        const { prefixCls, className, children, closeMaskOnClick,showCloseButton, animation,
        width,height,measure,customStyles,animationType,
        onClose, showMask, duration, customMaskStyles, ...ohter} = this.props;
        const { top,left } = this.state;
        const onClick = closeMaskOnClick ? onClose : null;
        const CloseButton = showCloseButton ? <span className={`${prefixCls}-close`} onClick={onClose} /> : null;
        const classNames = classnames(
            prefixCls,
            {
                [`${prefixCls}-fade-${animationType}`]: animationType
            },
            className
        ) 
        const childCls = classnames(
            prefixCls,
            `${prefixCls}-dialog`,
            {  
                [`${prefixCls}-${animation}-${animationType}`]: animation && animationType
            },
            className
        );
        const mask = showMask ? <div className={`${prefixCls}-mask`} style={customMaskStyles} onClick={onClick} /> : null;
        const style = {
            animationDuration: duration + 'ms',
            WebkitAnimationDuration: duration + 'ms'
        };
        const childStyle = {
            width: width + measure,
            height: height + measure,
            top,
            left,
            animationDuration: duration + 'ms',
            WebkitAnimationDuration: duration + 'ms'
        };
        const mergedStyles = { ...childStyle, ...customStyles };
        return(
           <div
                className={classNames}
                ref={el => { this.el = el; }}
                onKeyUp={this.onKeyUp}
            >
                {mask}
                <div ref="move" style={mergedStyles} onMouseDown={this.mouseDown} className={childCls}>
                {CloseButton}
                {children}
            </div>
            </div>
        )
                
      }
  }
Dialog.defaultProps = defaultProps;
ModalHeader.defaultProps = defaultProps;
ModalBody.defaultProps = defaultProps;
ModalFooter.defaultProps = defaultProps;
Dialog.propTypes = propTypes;
export {Dialog,ModalHeader,ModalBody,ModalFooter};