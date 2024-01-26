import React from 'react';
import NoticeLeftNavComponent from './NoticeComponent/NoticeLeftNavComponent';
import NoticeRightListComponent from './NoticeComponent/NoticeRightListComponent';
import '../../../scss/notice.scss';
import { GlobalContext } from '../../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function NoticeComponent() {
    const nav = useNavigate();
    // 관리자 로그인 하면 글쓰기 가능
    const { isAdmin } = React.useContext(GlobalContext);

    const onClickWrite = (e) => {
        nav('/notice_write');
    }

    const [notice, setNotice] = React.useState([]);

    React.useEffect(() => {
        axios({
            url: "https://adlaylatte.duckdns.org/portfolio/kurly/kurly_bbs/bbsNoticeJSON.jsp",
            method: "get"
        })
            .then((res) => {
                let response = res.data;
                if (response !== '') {
                    setNotice(response.공지사항);
                }
            })
            .catch((err) => err)
        // bbsAxiosGetRequest('https://adlaylatte.duckdns.org/portfolio/kurly/kurly_bbs/bbsNoticeJSON.jsp')
        //     .then((data) => {
        //         if (data !== '') {
        //             setNotice(data.공지사항);
        //         }
        //     });
    }, []);

    return (
        <div id='notice'>
            <div id="container">
                <NoticeLeftNavComponent />
                <NoticeRightListComponent notice={notice} />
                {
                    isAdmin && (
                        <div className="button-box">
                            <button onClick={onClickWrite}>글쓰기</button>
                        </div>
                    )
                }
            </div>
        </div>
    );
};