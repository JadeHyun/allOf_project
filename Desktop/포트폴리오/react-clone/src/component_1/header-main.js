import React, {Component} from 'react';
import FirHeader from "./header-1/header-fir";
import SecHeader from "./header-1/header-sec";


class HeaderMainTxt extends Component{
    render(){
        return(
            <FirHeader></FirHeader>,
            <SecHeader></SecHeader>
        )
    };
};

export default HeaderMainTxt;