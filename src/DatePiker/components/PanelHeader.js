import React from 'react';
import Icon from 'Icon';

const PanelHeader = props => {
  const { onClickTitle, onClickNext, onCkickPrev, showPrev, showNext, title } = props;

  return (
    <div className="panel-header">
      {showPrev ? (
        <span className="link-prev" onClick={onCkickPrev}>
          <Icon type="angle-left" />
        </span>
      ) : null}
      <span className="panel-title" onClick={onClickTitle}>
        {title}
      </span>
      {showNext ? (
        <span className="link-next" onClick={onClickNext}>
          <Icon type="angle-left" />
        </span>
      ) : null}
    </div>
  );
};

PanelHeader.defaultProps = {
  showPrev: true,
  showNext: true
};

export default PanelHeader;
