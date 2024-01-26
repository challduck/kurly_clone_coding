import React from 'react';
import '../../../scss/notice_write.scss';
import NoticeLeftNavComponent from './NoticeComponent/NoticeLeftNavComponent';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function NoticeUpdateFormPageComponent() {
    const nav = useNavigate();
    const location = useLocation();
    const [param, setParam] = useSearchParams();
    const 번호 = location.state.번호;
    const 제목 = location.state.제목;
    const 내용 = location.state.내용;
    // const 번호 = param.get('번호'); // 보내온 키를 이용 키값을 가져온다.
    // const 제목 = param.get('제목'); // 보내온 키를 이용 키값을 가져온다.
    // const 내용 = param.get('내용'); // 보내온 키를 이용 키값을 가져온다.
    // const 작성일 = param.get('작성일'); // 보내온 키를 이용 키값을 가져온다.

    React.useEffect(() => {
        setState({
            번호: 번호,
            제목: 제목,
            내용: 내용
        })

    }, [번호]);
    // 리액트에서 수정한 내용 상태변수
    const [state, setState] = React.useState({
        번호: '',
        제목: '', // => 입력사자에 입력값(Value)으로 
        내용: ''
    });
    // 수정시 입력
    const onChangeSubject = (e) => {
        setState({
            ...state,
            제목: e.target.value
        })
    }
    // 수정시 입력
    const onChangeContents = (e) => {
        setState({
            ...state,
            내용: e.target.value,
        })
    }
    // 저장
    const onClickSave = async (e) => {
        e.preventDefault();

        axios({
            url: 'https://adlaylatte.duckdns.org/portfolio/kurly/kurly_bbs/updateActionReact.jsp',
            method: 'POST',
            data: {},
            params: {
                "bbsId": state.번호,
                "subject": state.제목,
                "content": state.내용
            }
        })
            .then((res) => {
                if (res.status === 200 && res.data !== -1) {
                    alert('수정 되었습니다.');
                    // nav('/notice');
                }
                else {
                    alert('수정실패 데이터 확인하고 다시 시도하세요');
                }
            })
            .catch((err) => {
                console.log('AXIOS 실패!' + err);
            });

    }
    // 목록
    const onClickNoticeList = (e) => {
        e.preventDefault();
        nav('/notice');
    }
    return (
        <div id='noticeUpdate' className='noticeWrite'>
            <div className="container">
                <div className="left">
                    <NoticeLeftNavComponent />
                </div>
                <div className="right">
                    <div className="title">
                        <h2>공지사항 수정</h2>
                    </div>
                    <div className="content">
                        <form>
                            <ul>
                                <li>
                                    <label htmlFor="subject">제목<i>*</i></label>
                                    <input
                                        onChange={onChangeSubject}  /* 입력상자에 키보드입력 변화를 감지해서적용 */
                                        type="text"
                                        name='subject'
                                        id='subject'
                                        value={state.제목}
                                        placeholder='제목을 입력해 주세요'
                                    />
                                </li>
                                <li>
                                    <label htmlFor="contents">내용<i>*</i></label>
                                    <textarea
                                        onChange={onChangeContents}
                                        name="contents"
                                        id="contents"
                                        placeholder='내용을 입력해 주세요'
                                        value={state.내용}
                                    ></textarea>
                                </li>
                            </ul>

                            <div className="button-box update">
                                <button onClick={onClickSave}>저장</button>

                                <button onClick={onClickNoticeList}>목록</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

