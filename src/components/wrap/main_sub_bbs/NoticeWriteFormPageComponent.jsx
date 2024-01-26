import React from 'react';
import '../../../scss/notice_write.scss';
import NoticeLeftNavComponent from './NoticeComponent/NoticeLeftNavComponent';
import axios from 'axios';
import { GlobalContext } from '../../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
export default function NoticeWriteFormPageComponent() {
    const nav = useNavigate();
    const { signin, setSigin } = React.useContext(GlobalContext);

    const [state, setState] = React.useState({
        제목: '',
        내용: ''
    });

    const onSubmitWrite = (e) => {
        e.preventDefault();
        axios({
            url: 'https://adlaylatte.duckdns.org/portfolio/kurly/kurly_bbs/writeAction_react.jsp',
            method: 'POST',
            data: {},
            params: {
                "userId": signin.user_id,
                // "userId": 'love',
                "subject": state.제목,
                "content": state.내용
            }
        })
            .then((res) => {
                console.log(res)
                console.log(res.data);
                if (res.status === 200 && res.data === 1) {
                    alert('글이 등록 되었습니다.');
                    nav('/notice');
                }
                else {
                    alert('등록실패 데이터 확인하고 다시 시도하세요');
                }
            })
            .catch((err) => {
                console.log('AXIOS 실패!' + err);
            });
    }

    const onChangeSubject = (e) => {
        setState({
            ...state,
            제목: e.target.value,
        })
    }
    const onChangeContents = (e) => {
        setState({
            ...state,
            내용: e.target.value,
        })
    }

    return (
        <div id='noticeWrite' className='noticeWrite'>
            <div className="container">
                <div className="left">
                    <NoticeLeftNavComponent />
                </div>
                <div className="right">
                    <div className="title">
                        <h2>공지사항</h2>
                    </div>
                    <div className="content">
                        <form onSubmit={onSubmitWrite}>
                            <ul>
                                <li>
                                    <label htmlFor="subject">제목<i>*</i></label>
                                    <input
                                        onChange={onChangeSubject}
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

                            <div className="button-box">
                                <button type='submit'>등록</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

