/*
 * @Author: chen gong 
 * @Date: 2018-04-04 18:08:37 
 * @Last Modified by: chen gong
 * @Last Modified time: 2018-04-04 18:34:47
 */
import React, { Component, PureComponent } from 'react';
import PanelHeader from './PanelHeader';
export default class DatePanel extends (PureComponent || Component) {
    static defaultProps = {
        showPrev: true,
        showNext: true
    };
    state = {
        showMonth: false
    };
    showMonth = () => {
        this.setState({
            showMonth: true
        });
    };
    render() {
        const {
            props: { actived, disabledDate, onHover, onNext, onPrev, onSelect, range, selected, showNext, showPrev, showTime },
            state: { showMonth } } = this;
        return (
            <div className="date-panel">
                <PanelHeader
                    onClickTitle={this.showMonth}
                    prev={onPrev}
                    next={onNext}
                    showPrev={showPrev}
                    showNext={showNext}
                />
                <div className="date-table panel-table">
                    <ul className="panel-table__row panel-table__head">
                        <li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li>
                    </ul>
                    <PanelGrid units={days} />
                </div>
            </div>
        );
    }
}
