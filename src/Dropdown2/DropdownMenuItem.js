import React,{Component,PropTypes} from 'react';
import classNames from 'classnames';
const propTypes = {
    divider: PropTypes.bool,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    onSelect: PropTypes.func,
    onClick: PropTypes.func,
    eventKey: PropTypes.any,  // eslint-disable-line react/forbid-prop-types
};

const defaultProps = {

};

class DropdownMenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        let { onSelect, eventKey, disabled, onClick } = this.props;
        if (disabled) {
            event.preventDefault();
            return;
        }
        onSelect && onSelect(eventKey, this.props, event);
        onClick && onClick(event);
    }

    render() {

        let {children, divider, onSelect, active, disabled, className, eventKey, ...other} = this.props;

        let classNames = classNames({active,disabled},className);

        if (divider) {
            return <li className="divider" />;
        }
        return (
            <li
                className={classNames}
                {...other}
            >
                <a
                    onClick={this.handleClick}
                >
                    {children}
                </a>
            </li>
        );
    }
}
DropdownMenuItem.propTypes = propTypes;
DropdownMenuItem.defaultProps = defaultProps;

export default DropdownMenuItem;