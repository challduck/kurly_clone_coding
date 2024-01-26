import React from 'react';
import '../../../scss/signin_id_result.scss';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../../context/GlobalContext';
export default function SignInIdSearchResultComponent() {
    const nav = useNavigate();

    // 상태관리, 로컬스토레이지 구현
    const { login, setLogin } = React.useContext(GlobalContext);

    const location = useLocation();

    React.useEffect(() => {
        setLogin({
            ...login,
            아이디: location.state.아이디,
            가입년도: new Date(location.state.가입일).getFullYear(),
            가입월: new Date(location.state.가입일).getMonth() + 1,
            가입일: new Date(location.state.가입일).getDate()
        })
    }, []);


    const onClickPwSearch = (e) => {
        e.preventDefault();
        nav('/pwSearch');
    }

    const onClickLogin = (e) => {
        e.preventDefault();
        nav('/signin');
    }


    return (
        <main id='signInIdResult'>
            <section id="secino1">
                <div className="container">
                    <div className="title">
                        <h2>고객님의 컬리 계정을 찾았습니다.</h2>
                        <p>아이디 확인 후 로그인 해주세요.</p>
                    </div>
                    <div className="content">
                        <form>
                            <ul>
                                <li>
                                    <span><img src={process.env.PUBLIC_URL + "/images/sigin_in/icon_id_search_result.svg"} alt="" /></span>
                                    <span>
                                        <strong>{login.아이디}</strong>
                                        <em>컬리와 함께한 날짜는 {`${login.가입년도}년 ${login.가입월}월 ${login.가입일}입니다.`}</em>
                                    </span>
                                </li>
                                <li></li>
                                <li><button onClick={onClickPwSearch}>비밀번호변경</button></li>
                                <li><button onClick={onClickLogin}>로그인</button></li>
                            </ul>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
};