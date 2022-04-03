import React, { Component } from 'react';
import './header-fir-css.css';

class FirHeader extends Component {
    render(){
        return(
        <div className="header_top">
            <h1 className="header">
            <a href="" className="header_txt">에어비앤비의 코로나19 대응 방안에 대한 최신 정보를 확인하세요.</a>
            </h1>
        </div>
        );
    };
};

export default FirHeader;