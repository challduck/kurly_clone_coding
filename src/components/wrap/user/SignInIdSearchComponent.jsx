import React from 'react';
import '../../../scss/signin_id_search.scss';
import { ConfirmContext } from '../../../context/ConfirmContext';
import { GlobalContext } from '../../../context/GlobalContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { httpPostRequest } from '../../../lib/productApi';

export default function SignInIdSearchComponent() {

    // 라우터 네비게이트 훅 사용 등록
    const navigate = useNavigate();

    const { login, setLogin } = React.useContext(GlobalContext);
    const { confirmModalOpen, isConfirmModal } = React.useContext(ConfirmContext);

    // 타이머 상태관리 변수
    const [minutes, setMinutes] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0);


    const [isTab, setIsTab] = React.useState(true);
    const [isBtn, setIsBtn] = React.useState(false);
    const [isBtn2, setIsBtn2] = React.useState(false);


    // 휴대폰 인증 : 이름 휴대폰 입력상자
    const [userName, setUserName] = React.useState('');
    const [userHp, setUserHp] = React.useState('');

    // 이메일 인증 : 이름 이메일 입력상자
    const [userName2, setUserName2] = React.useState('');
    const [userEmail, setUserEmail] = React.useState('');

    // 발급된인증키
    const [hpAuth, setHpAuth] = React.useState('');

    // 인증키 사용자입력상자 
    const [userHpAuth, setUserHpAuth] = React.useState('');
    const [isAuth, setIsAuth] = React.useState(false);
    // 휴대폰 인증 useRef
    const userNameRef = React.useRef();
    const userHpRef = React.useRef();

    // 휴대폰 인증 useRef
    const userName2Ref = React.useRef();
    const userEmailRef = React.useRef();

    // 타이머 동작 3분 카운트
    React.useEffect(() => {
        let setId = 0;
        let startTime = 0;
        let nowTime = 0;
        let endTime = 0;
        let now = new Date();

        const timerCount = () => {
            startTime = new Date(now);  // 클릭싯점 스타트
            nowTime = new Date();

            startTime.setMinutes(startTime.getMinutes() + 3);
            endTime = startTime - nowTime;  // 1/1000 초단위로 변환  .getTime()
            if (nowTime >= startTime) { // 시작시간보다 현재 시간이 이상이면 종료 타임
                clearInterval(setId);
                setMinutes(0);
                setSeconds(0);
            }
            else {
                setMinutes(Math.floor(endTime / (60 * 1000) % 60));
                setSeconds(Math.floor(endTime / (1000) % 60));
            }

        }

        // 인증번호 발송하고 그리고
        // 모달창을 닫으면 타이머 동작
        if (isAuth === true && isConfirmModal === false && userHpAuth === '') {
            setId = setInterval(timerCount, 1000);
        }
    }, [isAuth, isConfirmModal]);

    // 이름 입력상자
    const onChangeName = (e) => {
        setUserName(e.target.value);
    }
    // 휴대폰 입력상자
    const onChangeHp = (e) => {
        // 휴대폰 번호 입력 형식 지정 저장하기
        setUserHp(e.target.value);
    }


    // 이름 입력상자
    const onChangeName2 = (e) => {
        setUserName2(e.target.value);
    }
    // 이메일 입력상자
    const onChangeEmail = (e) => {
        setUserEmail(e.target.value);
    }


    // 휴대폰 인증 입력상자
    const onChangeHpAuth = (e) => {
        setUserHpAuth(e.target.value);
    }

    // 탭메뉴 버튼 클릭 이벤트
    const onClickTabBtn = (e, value) => {
        e.preventDefault();

        if (value === "휴대폰") {
            setIsTab(true);
        }
        else {
            setIsTab(false);
        }
    }
    React.useEffect(() => {

        (userName !== '' && userHp !== '') ? setIsBtn(true) : setIsBtn(false);
        (userName2 !== '' && userEmail !== '') ? setIsBtn2(true) : setIsBtn2(false);

    }, [userName, userHp, userName2, userEmail]);


    // 휴대폰 인증번호 받기 버틑 클릭 이벤트
    // 이메일 인증번호 받기 버틑 클릭 이벤트
    const onClickHpAuth = (e) => {
        e.preventDefault();
        setIsAuth(true);
        // 인증번호 발송 7자리
        let authNum = Math.floor(Math.random() * (9000000 + 1000000));
        // 발급된인증키저장
        setHpAuth(authNum);
        confirmModalOpen(`인증번호가 발송되었습니다. 3분안에 인증번호를 입력해주세요.${authNum}`);
    }


    // 아이콘 삭제 버튼 클릭 이벤트
    const onClickIconDel = (e, value) => {
        e.preventDefault();
        switch (value) {
            case "userName":
                setUserName('');
                userNameRef.current.focus();
                return;
            case "userName2":
                setUserName2('');
                userName2Ref.current.focus();
                return
            case "userHp":
                setUserHp('');
                userHpRef.current.focus();
                return
            case "userEmail":
                setUserEmail('');
                userEmailRef.current.focus();
                return;
            default:
                return;
        }
    }

    // 인증키 확인 버튼 클릭 이벤트
    const onClickHpAuthOk = (e) => {
        e.preventDefault();

        const regExp = /[^0-9]/g;
        let 휴대폰 = '';

        // 숫자가 아니면 삭제
        휴대폰 = userHp.replace(regExp, '');

        if (userName === '') {
            confirmModalOpen('이름을 입력해 주세요');
        }
        else if (휴대폰 === '') {
            confirmModalOpen('휴대폰 번호를 입력해 주세요');
        }
        else {
            // 인증확인됐다고 하고
            // 비밀번호 재설정 페이지로 이동
            // 인증번호(키)를 상태변수랑 비교하고
            // 일치하면 인증에 true 지정 설정 변경하고 
            // 아이디를 찾아서 결과를 결과페이지에 전송한다.
            if (hpAuth === Number(userHpAuth)) {
                // 이름, 휴대폰을 데이터베이스 서버에 전송하고
                // 결과가 일치하면 아이디를 결과화면에 쿼리스트링 파라미터값으로 전송한다.
                // 그리고 결과화면에서 보여준다.
                const regExpHp = /^(\d{3})(\d{3,4})(\d{4})$/g;  //010-7942-5305   010-348-6441        
                const result = 휴대폰.replace(regExpHp, '$1-$2-$3');
                const url = '/idfindphone';

                const data = JSON.stringify({
                    userName: userName,
                    userPhone: result
                });
                httpPostRequest(url, data)
                    .then(data => {
                        if (data.user_name === '' || data.user_name === undefined) {
                            confirmModalOpen('가입된 회원이 아닙니다. 회원가입 후 이용해 주세요.');
                            navigate("/signup");
                        } else {
                            navigate('/idSearchResult', { state: { 아이디: data.user_id, 이름: data.userName, 가입일: data.user_join_date } });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            else {
                setIsAuth(false);
            }
        }

    }
    const onClickEmailAuthOk = (e) => {
        // e.preventDefault();
        if (userName2 === '') {
            confirmModalOpen('이름을 입력해 주세요');
        }
        else if (userEmail === '') {
            confirmModalOpen('이메일을 입력해 주세요');
        }
        else {
            const url = '/idfindemail';
            const data = JSON.stringify({
                userName: userName2,
                userEmail: userEmail
            });
            httpPostRequest(url, data)
                .then(data => {
                    if (data.user_name === '' || data.user_name === undefined) {

                        confirmModalOpen('가입된 회원이 아닙니다. 회원가입 후 이용해 주세요.');
                        navigate("/signup");
                    } else {
                        navigate('/idSearchResult', { state: { 아이디: data.user_id, 이름: data.user_name, 가입일: data.user_join_date } });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }

    }

    return (
        <main id='signInIdSearch' className='signInSearch'>
            <section id="secino1">
                <div className="container">
                    <div className="title">
                        <h2>아이디 찾기</h2>
                    </div>
                    <div className="content">
                        <form autoComplete='off'>
                            <ul>
                                <li>
                                    <button onClick={(e) => onClickTabBtn(e, '휴대폰')} className={isTab ? 'on' : ''}>휴대폰 인증</button>
                                    <button onClick={(e) => onClickTabBtn(e, "이메일")} className={isTab ? '' : 'on'}>이메일 인증</button>
                                </li>

                                {
                                    isTab ?
                                        (
                                            <>
                                                <li><label htmlFor="userName">이름</label></li>
                                                <li>
                                                    <input
                                                        onChange={onChangeName}
                                                        type="text"
                                                        name='user_name'
                                                        id='userName'
                                                        value={userName}
                                                        placeholder='이름을 입력헤 주세요'
                                                        ref={userNameRef}
                                                    />
                                                    {userName !== '' && <a onClick={(e) => onClickIconDel(e, 'userName')} href="!#"><img src={process.env.PUBLIC_URL + "/images/sigin_in/icon_del.svg"} alt="" /></a>}
                                                </li>
                                                <li><label htmlFor="userHp">휴대폰</label></li>
                                                <li>
                                                    <input
                                                        onChange={onChangeHp}
                                                        type="text"
                                                        name='user_hp'
                                                        id='userHp'
                                                        value={userHp}
                                                        placeholder='휴대폰 번호를 입력해 주세요'
                                                        ref={userHpRef}
                                                    />
                                                    {userHp !== '' && <a onClick={(e) => onClickIconDel(e, 'userHp')} href="!#"><img src={process.env.PUBLIC_URL + "/images/sigin_in/icon_del.svg"} alt="" /></a>}
                                                </li>
                                                <li>
                                                </li>

                                                {
                                                    isAuth && (<>
                                                        <li><label htmlFor="userHp">인증번호</label></li>
                                                        <li>
                                                            <input
                                                                onChange={onChangeHpAuth}
                                                                type="text"
                                                                name='user_hp_auth'
                                                                id='userHp'
                                                                value={userHpAuth}
                                                                placeholder='인증번호 7자리'
                                                            />

                                                            <button>재발송</button>

                                                            <span>
                                                                <em>{minutes < 10 ? `0${minutes}` : minutes}</em>
                                                                <i>:</i>
                                                                <em>{seconds < 10 ? `0${seconds}` : seconds}</em>
                                                            </span>
                                                        </li>
                                                    </>)
                                                }

                                                <li className='hp-btn'>
                                                    {
                                                        !isAuth ?
                                                            (
                                                                <button onClick={onClickHpAuth} className={isBtn ? 'on' : ''}>인증번호 받기</button>
                                                            )
                                                            :
                                                            (
                                                                <button onClick={onClickHpAuthOk} className={isBtn ? 'on' : ''}>확인</button>
                                                            )
                                                    }
                                                </li>
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                <li><label htmlFor="userName2">이름</label></li>
                                                <li>
                                                    <input
                                                        onChange={onChangeName2}
                                                        type="text"
                                                        name='user_name2'
                                                        id='userName2'
                                                        value={userName2}
                                                        placeholder='이름을 입력헤 주세요'
                                                        ref={userName2Ref}
                                                    />
                                                    {userName2 !== '' && <a onClick={(e) => onClickIconDel(e, 'userName2')} href="!#"><img src={process.env.PUBLIC_URL + "/images/sigin_in/icon_del.svg"} alt="" /></a>}
                                                </li>
                                                <li><label htmlFor="userHp">이메일</label></li>
                                                <li>
                                                    <input
                                                        onChange={onChangeEmail}
                                                        type="email"
                                                        name='user_email'
                                                        id='userEmail'
                                                        value={userEmail}
                                                        placeholder='이메일을 입력해 주세요'
                                                        ref={userEmailRef}
                                                    />

                                                    {userEmail !== '' && <a onClick={(e) => onClickIconDel(e, 'userEmail')} href="!#"><img src={process.env.PUBLIC_URL + "/images/sigin_in/icon_del.svg"} alt="" /></a>}
                                                </li>
                                                <li></li>
                                                <li className='email-btn'>
                                                    <button type='button' onClick={onClickEmailAuthOk} className={isBtn2 ? 'on' : ''}>확인</button>
                                                </li>
                                            </>
                                        )
                                }
                            </ul>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
};