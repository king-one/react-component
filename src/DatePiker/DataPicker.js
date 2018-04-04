import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import assign from 'lodash/assign';
import Input from 'input';
import Popover from 'popover';
import getWidth from 'utils/getWidth';
import DatePanel from './date/DatePanel';
import PanelFooter from './common/PanelFooter';
import {
    goMonths,
    setSameDate,
    formatDate,
    parseDate,
    dayStart,
    dayEnd,
    setTime,
    commonFns
} from './utils';
import {
    CURRENT_DAY,
} from './constants';

function extractStateFromProps(props) {
    let selected;
    let actived;
    let showPlaceholder;
    const { openPanel, value, format, defaultValue, defaultTime } = props;

    if (value) {
        const tmp = parseDate(value, format);

        if (tmp) {
            showPlaceholder = false;
            selected = tmp;
            actived = setTime(tmp);
        } else {
            console.warn("date and format don't match."); // eslint-disable-line
            showPlaceholder = true;
            actived = dayStart();
        }
    } else {
        showPlaceholder = true;

        /**
         * 当前面板显示优先级：
         * defalutValue > currentDay
         */

        if (defaultValue) {
            actived = parseDate(defaultValue, format);
        } else {
            actived = dayStart();
        }

        actived = parseDate(actived, format);
    }

    if (defaultTime) {
        actived = setTime(actived, defaultTime);
    }

    /**
     * actived 用来临时存放日期，改变年份和月份的时候只会改动 actived 的值
     * selected 用来存放用户选择的日期，点击日期时会设置 selected 的值
     * activedTime 用来存放用户选择的时间
     */

    return {
        value: selected && formatDate(selected, format),
        actived,
        selected,
        activedTime: selected || actived,
        openPanel,
        showPlaceholder
    };
}

class DatePicker extends (PureComponent || Component) {
    renderPanner() {
       return (
            <div className={datePickerCls} ref={ref => (this.picker = ref)}>
                <DatePanel
                    showTime={showTime}
                    actived={actived}
                    selected={selected}
                    disabledDate={this.isDisabled}
                    onSelect={this.onSelectDate}
                    onChange={this.onChangeDate}
                    onPrev={this.onChangeMonth('prev')}
                    onNext={this.onChangeMonth('next')}
                    i18n={i18n}
                />
                {this.isfooterShow ? (
                    <PanelFooter
                        buttonText={confirmText || i18n.confirm}
                        onClickButton={this.onConfirm}
                        linkText={i18n.current.date}
                        linkCls={linkCls}
                        showLink={!isDisabled}
                        onClickLink={() => this.onSelectDate(CURRENT_DAY)}
                    />
                ) : null}
            </div>
        );
    }
}

togglePicker = () => {
    const { onOpen, onClose, disabled } = this.props;
    const openPanel = !this.state.openPanel;
    if (disabled) return;

    openPanel ? onOpen && onOpen() : onClose && onClose();
    this.setState({
        openPanel
    });
};

render() {
    const {
      props: {
        prefix,
        className,
        disabled,
        width,
        popPosition,
        name,
        placeholder
      },
        state: { showPlaceholder, openPanel, value }
    } = this;
    const wrapperCls = cx(`${prefix}-datetime-picker`, className);
    const inputCls = cx({
        'picker-input': true,
        'picker-input--filled': !showPlaceholder,
        'picker-input--disabled': disabled
    });
    const widthStyle = getWidth(width);

    return (
        <div style={widthStyle} className={wrapperCls}>
            <Receiver componentName="TimePicker" defaultI18n={I18nDefault}>
                {i18n => (
                    <Popover
                        cushion={5}
                        visible={openPanel}
                        onVisibleChange={this.togglePicker}
                        className={`${prefix}-datetime-picker-popover ${className}-popover`}
                        position={popPositionMap[popPosition.toLowerCase()]}
                    >
                        <Popover.Trigger.Click>
                            <div
                                style={widthStyle}
                                className={inputCls}
                                onClick={evt => evt.preventDefault()}
                            >
                                <Input
                                    name={name}
                                    value={showPlaceholder ? placeholder || i18n.date : value}
                                    onChange={noop}
                                    disabled={disabled}
                                />
                                <span className="zenticon zenticon-calendar-o" />
                                <span
                                    onClick={this.onClearInput}
                                    className="zenticon zenticon-close-circle"
                                />
                            </div>
                        </Popover.Trigger.Click>
                        <Popover.Content>{this.renderPicker(i18n)}</Popover.Content>
                    </Popover>
                )}
            </Receiver>
        </div>
    );
}
}
assign(DatePicker, commonFns); // 挂载一些常用方法暴露出去
export default DatePicker;
