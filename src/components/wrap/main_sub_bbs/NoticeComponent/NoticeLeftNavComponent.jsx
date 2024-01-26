import React from 'react';
import '../../../../scss/notice_left.scss';

export default function NoticeLeftNavComponent() {
    return (
        <div id='noticeLeft'>
            <div className="container">
                <div className="title">
                    <h2>고객센터</h2>
                </div>
                <nav className='nav'>
                    <ul>
                        <li><a href="!#" className='on'>공지사항</a></li>
                        <li><a href="!#">자주하는질문</a></li>
                        <li><a href="!#">1:1문의</a></li>
                        <li><a href="!#">대량주문문의</a></li>
                    </ul>
                </nav>
                <div className="bottom">
                    <a href="!#">
                        <span>도움이 필요하신가요?</span>
                        <em>1:1문의하기</em>
                    </a>
                </div>
            </div>
        </div>
    );
};