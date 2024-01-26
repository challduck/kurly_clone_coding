import React from 'react';
import '../../../scss/notice_view.scss';
import { ConfirmContext } from '../../../context/ConfirmContext';
import { GlobalContext } from '../../../context/GlobalContext';
// 쿼리 스트링 => 키(번호)와 키값(item.NO)
// 파라미터 => 보내온 파라미터 데이터를 추출(검색)
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NoticeViewPageComponent() {

    const { isAdmin } = React.useContext(GlobalContext);
    const nav = useNavigate();

    const [param, setParam] = useSearchParams();
    const 번호 = param.get('번호'); // 보내온 키를 이용 키값을 가져온다.
    const 제목 = param.get('제목'); // 보내온 키를 이용 키값을 가져온다.
    const 내용 = param.get('내용'); // 보내온 키를 이용 키값을 가져온다.
    const 작성자 = param.get('작성자'); // 보내온 키를 이용 키값을 가져온다.
    const 작성일 = param.get('작성일'); // 보내온 키를 이용 키값을 가져온다.
    const 조회수 = param.get('조회수'); // 보내온 키를 이용 키값을 가져온다.

    const { ConfirmModalOkCancelOpen, isConfirmModalOkCancelResult } = React.useContext(ConfirmContext);

    React.useEffect(() => {

        let formData = new FormData();
        formData.append('bbsId', 번호);

        axios({
            url: 'https://adlaylatte.duckdns.org/portfolio/kurly/kurly_bbs/viewActionReact.jsp',
            method: 'POST',
            data: {},
            params: { 'bbsId': 번호 }
        })
            .then((res) => {

            })
            .catch((err) => {
                console.log('AXIOS 실패!' + err);
            });

    }, [번호]);

    // 삭제 수정하고자할 때 컨펌모달 닫기 할 때 실행하고자해서 만든것    
    React.useEffect(() => {

        if (isConfirmModalOkCancelResult === '확인') {
            sessionStorage.removeItem('NOTICE_UPDATE')

            // 삭제하고자하는 키
            let formData = new FormData();
            formData.append('bbsId', 번호);

            axios({
                url: 'https://adlaylatte.duckdns.org/portfolio/kurly/kurly_bbs/viewAction.jsp',
                // url:'./data/notice_page/board.json',
                method: 'POST',
                //method:'POST',
                data: {}, // => 해당하는 글번호 키 
                params: { 'bbsId': 번호 }
            })
                .then((res) => {
                    if (res.status === 200) {
                        alert('삭제되었습니다.');
                        nav('/notice');
                    }

                })
                .catch((err) => {
                    console.log('AXIOS 실패!' + err);
                });
        }

    }, [isConfirmModalOkCancelResult])


    // 글목록으로 이동
    const onClickNoticeList = (e) => {
        e.preventDefault();
        nav('/notice');
    }

    // 글삭제   
    const onClickDelete = (e) => {
        e.preventDefault();
        axios({
            url: 'https://adlaylatte.duckdns.org/portfolio/kurly/kurly_bbs/deleteActionReact.jsp',
            method: 'POST',
            data: {},
            params: {
                "bbsId": 번호
            }
        })
            .then((res) => {
                if (res.status === 200 && res.data !== -1) {
                    alert('삭제 되었습니다.');
                    nav('/notice');
                }
                else {
                    alert('삭제실패 데이터 확인하고 다시 시도하세요');
                }
            })
            .catch((err) => {
                console.log('AXIOS 실패!' + err);
            });
    }



    // 글수정
    const onClickUpdate = (e) => {
        e.preventDefault();
        // 수정페이지로 이동
        nav('/notice_update', { state: { 번호: 번호, 제목: 제목, 내용: 내용 } });
    }

    return (
        <div id='noticeView'>
            <div className="container">
                <div className="title">
                    <h2>공지사항</h2>
                    <p>컬리의 새로운 소식들과 유용한 정보들을 한곳에서 확인하세요.</p>
                </div>
                <div className="content">
                    <ul>
                        <li>
                            <div className="left">조회수</div>
                            <div className="right">{Number(조회수) + 1}</div>
                        </li>
                        <li>
                            <div className="left">제목</div>
                            <div className="right">{제목}</div>
                        </li>
                        <li>
                            <div className="left">작성자</div>
                            <div className="right">{작성자}</div>
                        </li>
                        <li>
                            <div className="left">작성일</div>
                            <div className="right">{작성일}</div>
                        </li>
                        <li>
                            <div className="contents">
                                {내용}
                            </div>
                        </li>
                    </ul>
                    <div className="button-box">
                        {isAdmin && <div className="left">
                            <button onClick={onClickUpdate}>수정</button>
                            <button onClick={onClickDelete}>삭제</button>
                        </div>}
                        <div className="right">
                            <button onClick={onClickNoticeList}>목록</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};