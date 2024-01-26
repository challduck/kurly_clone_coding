import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../../scss/singin_pw_reset.scss';
import { GlobalContext } from '../../../context/GlobalContext';
import { ConfirmContext } from '../../../context/ConfirmContext';
import { httpPostRequest } from '../../../lib/productApi';

export default function SignInPwResetComponent() {
    const navigate = useNavigate();

    const { confirmModalOpen, isConfirmModal } = React.useContext(ConfirmContext);

    // 상태관리, 로컬스토레이지 구현
    const { login, setLogin } = React.useContext(GlobalContext);

    const location = useLocation();
    React.useEffect(() => {
        setLogin({
            ...login,
            아이디: location.state.아이디
        })
    }, []);

    const [userPw, serUserPw] = React.useState('');
    const [userPw2, serUserPw2] = React.useState('');

    const onChangeNewPw = (e) => {
        e.preventDefault();
        serUserPw(e.target.value);
    }

    const onChangeNewPw2 = (e) => {
        e.preventDefault();
        serUserPw2(e.target.value);
    }

    const onClickPwSave = (e) => {
        e.preventDefault();

        if (userPw === '') {
            confirmModalOpen('비밀번호를 입력해 주세요');
        }
        else if (userPw2 === '') {
            confirmModalOpen('비밀번호를 한번더 입력해 주세요');
        }
        else {
            if (userPw === userPw2) {

                const url = '/pwchange';
                const data = JSON.stringify({
                    user_id: location.state.아이디,
                    new_password: userPw
                });
                httpPostRequest(url, data)
                    .then(data => {
                        if (data.result === '' || data.result === undefined) {
                            confirmModalOpen('비밀번호 변경을 실패하였습니다.');
                            navigate("/pwSearch");
                        } else if (data.result === 'success') {
                            confirmModalOpen('비밀번호 변경을 성공하였습니다. 로그인 후 이용해 주세요.');
                            setTimeout(navigate('/signin'), 3000);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            else {
                confirmModalOpen('비밀번호가 일치하지 않습니다.');
            }
        }
    }

    return (
        <main id='signInPwReset'>
            <section id="secino1">
                <div className="container">
                    <div className="title">
                        <h2>비밀번호 재설정</h2>
                    </div>
                    <div className="content">
                        <form>
                            <ul>
                                <li><label htmlFor="userPw">새 비밀번호 등록</label></li>
                                <li>
                                    <input
                                        onChange={onChangeNewPw}
                                        type="password"
                                        name='user_pw'
                                        id='userPw'
                                        value={userPw}
                                        placeholder='새 비밀번호를 입력해 주세요'
                                    />
                                </li>
                                <li><label htmlFor="userPw2">새 비밀번호 확인</label></li>
                                <li>
                                    <input
                                        onChange={onChangeNewPw2}
                                        type="password"
                                        name='user_pw2'
                                        id='userPw2'
                                        value={userPw2}
                                        placeholder='새 비밀번호를 한 번 더 입력해 주세요'
                                    />
                                </li>
                                <li><button onClick={onClickPwSave}>확인</button></li>
                            </ul>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
};