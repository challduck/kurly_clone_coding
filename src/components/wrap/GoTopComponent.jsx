import React from 'react';
// import goTop from './img/go_top/go_top.png';
import '../../scss/go_top.scss';
import $ from 'jquery';

export default function GoTopComponent() {

    React.useEffect(() => {
        let sec4Top = 0;
        let goTop = $('#goTop');
        let gotopBtn = $('.gotop-btn');
        try {
            sec4Top = $('#section4').offset().top;
        }
        catch (e) {
            sec4Top = 600;
        }
        // 스크롤이벤트
        $(window).scroll(function () {
            if ($(window).scrollTop() >= sec4Top) {
                goTop.stop().css({ bottom: '25px' });
            }
            else {
                goTop.stop().css({ bottom: '-50px' });
            }
        });
        // Smooth Scrolling
        gotopBtn.on({
            click() {
                $('html, body').stop().animate({ scrollTop: 0 }, 600);
            }
        });
    }, []);

    return (
        <div id='goTop'>
            <a href="#wrap" className='gotop-btn'>
                <img src="../../../public/images/go_top/go_top.png" alt="" />
            </a>
        </div>
    );
};