import React, { Component } from 'react';

import FooterFir from "./footer-1/footer-fir";
import FooterSec from "./footer-1/footer-sec";
// import FooterThir from "./footer-1/footer-thir";
// import FooterFourth from "./footer-1/footer-fourth";
// import FooterFifth from "./footer-1/footer-fifth";





class FooterMain extends Component{
    render(){
        return(
            <FooterFir></FooterFir>,
            <FooterSec></FooterSec>
            // <FooterThir></FooterThir>,
            // <FooterFourth></FooterFourth>,
            // <FooterFifth></FooterFifth>
        )
    };
};

export default FooterMain;