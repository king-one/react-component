import React,{Component,PropTypes} from 'react';
import classNames from 'classnames';
import Button from '../Button';


const propTypes = {
  noCaret: PropTypes.bool,
  title: PropTypes.node,
};

class DorpdownToggle extends Component {
  render() {
    const { noCaret, title, className, children, ...props } = this.props;
    const caret = noCaret ? null : (<span className="caret" />);
    return (
      <Button
        {...elementProps}
        className={classNames('dropdown-toggle', className)}
        role="button"
      >
        {title || children}{caret}
      </Button>
    );
  }
}

DorpdownToggle.propTypes = propTypes;

export default DorpdownToggle;