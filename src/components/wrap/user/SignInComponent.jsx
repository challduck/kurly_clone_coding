import React from 'react';
import { Link } from 'react-router-dom';
import '../../../scss/signin.scss';
import axios from 'axios';
import { ConfirmContext } from '../../../context/ConfirmContext';
import { GlobalContext } from '../../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { httpPostRequest } from '../../../lib/productApi';

export default function SignInComponent() {


    // 라우터 네비게이트 훅 사용 등록
    const navigate = useNavigate();
    const { setIsAdmin, login, setLogin, signin, setSigin, expires, setIsLogin } = React.useContext(GlobalContext);
    const { confirmModalOpen, isConfirmModal } = React.useContext(ConfirmContext);

    // 아이디, 비밀번호 
    const [state, setState] = React.useState({
        user_id: '',
        user_pw: ''
    });
    const { user_id, user_pw } = state;

    // 아이디 입력상자
    const onChangeUser_id = (e) => {
        setState({
            ...state,
            user_id: e.target.value
        })
    }

    // 비밀번호 입력상자
    const onChangeUser_pw = (e) => {
        setState({
            ...state,
            user_pw: e.target.value
        })
    }

    // 로그인 구현
    // user_signin_action.jsp
    const onClickLogin = (e) => {
        e.preventDefault();

        if (user_id === '') {
            confirmModalOpen('아이디를 확인하고 입력하세요!');
        }
        else if (user_pw === '') {
            confirmModalOpen('비밀번호를 확인하고 입력하세요!');
        }
        else {
            const url = '/signin';

            const data = JSON.stringify({
                userId: user_id,
                userPw: user_pw,
            });

            httpPostRequest(url, data)
                .then(data => {
                    console.log(data);
                    if (data.result === 1) {
                        let toDay = new Date();
                        toDay.setDate(toDay.getDate() + 3);
                        const obj = {
                            user_id: user_id,
                            expires: toDay.getTime(),
                        };
                        localStorage.setItem(process.env.REACT_APP_USER_LOGIN_KEY, JSON.stringify(obj)); // 로그인정보 저장

                        setSigin({
                            ...signin,
                            user_id: user_id,
                            expires: toDay.getTime(),
                        });

                        confirmModalOpen('로그인이 되었습니다.');
                        setIsLogin(true);
                        setTimeout(function () {
                            navigate(`/main`);
                        }, 1000);
                    }

                    if (data.response && data.response.data) {
                        const result = data.response.data.result;
                        if (result === -1) {
                            confirmModalOpen('가입회원이 아닙니다. 회원가입하세요');
                            setTimeout(function () {
                                navigate(`/signup`);
                            }, 1000);
                        } else if (result === 0) {
                            confirmModalOpen('아이디 또는 비밀번호를 확인하고 다시 시도해주세요');
                        }
                    }
                }).catch(error => {
                    console.log(error);
                });
        }
    }

    return (
        <main id='signIn'>
            <section id="secino1">
                <div className="container">
                    <div className="title">
                        <h2>로그인</h2>
                    </div>
                    <div className="content">
                        <form autoComplete='off'>
                            <ul>
                                <li>
                                    <input
                                        onChange={onChangeUser_id}
                                        type="text"
                                        name='user_id'
                                        id='userId'
                                        value={user_id}
                                        placeholder='아이디를 입력해주세요'
                                    />
                                </li>
                                <li>
                                    <input
                                        onChange={onChangeUser_pw}
                                        type="password"
                                        name='user_pw'
                                        id='userPw'
                                        value={user_pw}
                                        placeholder='비밀번호를 입력해주세요'
                                    />
                                </li>
                                <li>
                                    <span>
                                        <Link to="/idSearch">아이디 찾기</Link>
                                        <i>|</i>
                                        <Link to="/pwSearch">비밀번호 변경</Link>
                                    </span></li>
                                <li><button onClick={onClickLogin}>로그인</button></li>
                                <li><Link to="/signup">회원가입</Link></li>
                            </ul>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
};