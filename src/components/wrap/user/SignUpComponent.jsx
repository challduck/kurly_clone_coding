import React from 'react';
import axios from 'axios';
import { GlobalContext } from '../../../context/GlobalContext';
import { ConfirmContext } from '../../../context/ConfirmContext';
import '../../../scss/sign_up.scss';
import { useNavigate } from 'react-router-dom';
import { httpPostRequest } from '../../../lib/productApi';

export default function SignUpComponent({ 회원가입, timer, timerCounterfn, mapAddressFn }) {
    const navigate = useNavigate();

    const { openPopupDaumPostApi, addr, setAddr } = React.useContext(GlobalContext);
    const { confirmModalOpen } = React.useContext(ConfirmContext);

    const { setId, minutes, seconds, msg, isEnd } = timer;

    const [state, setState] = React.useState(회원가입);

    const createRef = React.useRef();

    React.useEffect(() => {

        isEnd && confirmModalOpen(msg);

    }, [confirmModalOpen, isEnd, msg]);  // false => true 싯점 실행 



    // 1. 아이디 입력상자 onChange 이벤트
    const onChangeUserId = (e) => {
        const { value } = e.target;
        const regExp1 = /[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]/g;
        const regExp2 = /^(.){6,16}$/g;
        const regExp3 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
        const regExp4 = /[A-Za-z]+[0-9]*/g;
        const regExp5 = /\s/g;

        let 아이디 = '';
        let isIdError = false;
        let isIdMsg = '';

        아이디 = value.replace(regExp1, '');


        if (regExp2.test(value) === false || regExp3.test(value) === true || regExp4.test(value) === false || regExp5.test(value) === true) {
            isIdError = true;
            isIdMsg = '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합';
        }
        else {
            isIdError = false;
            isIdMsg = '';
        }

        setState({
            ...state,
            아이디: 아이디,
            isIdError: isIdError,
            isIdMsg: isIdMsg
        })

    }

    // 2. 아이디 중복확인 onClick 이벤트
    const onClickUserIdOk = (e) => {
        e.preventDefault();
        const value = state.아이디;
        const regExp1 = /[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]/g;
        const regExp2 = /^(.){6,16}$/g;
        const regExp3 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
        const regExp4 = /[A-Za-z]+[0-9]*/g;
        const regExp5 = /\s/g;   // 공백

        if (regExp2.test(value) === false || regExp3.test(value) === true || regExp4.test(value) === false || regExp5.test(value) === true) {
            confirmModalOpen('6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합');
        }
        else {

            const url = '/idcheck';

            const data = JSON.stringify({
                userId: state.아이디,
            });

            httpPostRequest(url, data)
                .then(data => {
                    console.log(data);
                    if (data.response && data.response.data) {
                        const result = data.response.data.result;

                        if (result !== null) {
                            if (result === true) {
                                setState({
                                    ...state,
                                    isIdOk: false
                                });
                                confirmModalOpen('사용 불가능한 아이디 입니다.');
                            }
                        }
                    } else {
                        console.log('Invalid response format:', data);
                        if (data.result === false) {
                            setState({
                                ...state,
                                isIdOk: true
                            });
                            confirmModalOpen('사용 가능한 아이디 입니다.');
                        }
                    }

                }).catch(error => {
                    console.log(error);
                });
        }

    }

    // 3. 비밀번호 입력상자 onChange 이벤트
    const onChangeUserPw1 = (e) => {
        const { value } = e.target;
        let isPwError = false;
        let isPwMsg = '';
        const regExp1 = /^(.){10,16}$/g;
        const regExp2 = /([A-Za-z]+[0-9]+)+|([0-9]+[A-Za-z]+)+|([A-Za-z]+[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]+)+|([`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]+[A-Za-z]+)+|([0-9]+[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]+)+|([`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]+[0-9]+)+/g;   // true 정상
        const regExp3 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
        const regExp4 = /\s/g;
        const regExp5 = /(\d)\1\1/g;

        if (regExp1.test(value) === false) {
            isPwError = true;
            isPwMsg = '최소 10자 이상 입력';
        }
        else if (regExp2.test(value) === false || regExp3.test(value) === true || regExp4.test(value) === true) {
            isPwError = true;
            isPwMsg = '영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합';
        }
        else if (regExp5.test(value) === true) {
            isPwError = true;
            isPwMsg = '동일한 숫자 3개 이상 연속 사용 불가';
        }
        else {
            isPwError = false;
            isPwMsg = '';
        }

        setState({
            ...state,
            isPwError: isPwError,
            isPwMsg: isPwMsg,
            비밀번호: value
        })
    }


    // 3. 비밀번호확인  입력상자  onChange 이벤트
    const onChangeUserPw2 = (e) => {
        const { value } = e.target;
        let isPw2Error = false;
        let isPw2Msg = '';

        if (value === '') {
            isPw2Error = true;
            isPw2Msg = '비밀번호를 한번 더 입력해 주세요.';
        }
        else if (value !== state.비밀번호) {
            isPw2Error = true;
            isPw2Msg = '동일한 비밀번호를 입력';
        }
        else {
            isPw2Error = false;
            isPw2Msg = '';
        }

        setState({
            ...state,
            isPw2Error: isPw2Error,
            isPw2Msg: isPw2Msg,
            비밀번호확인: value
        })
    }

    // 4. 이름  입력상자 onChange 이벤트
    const onChangeName = (e) => {
        const { value } = e.target;
        let isNameError = false;
        let isNameMsg = '';
        let 이름 = '';
        const regExp = /[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]/g;

        이름 = value.replace(regExp, '');
        if (이름 === '') {
            isNameError = true;
            isNameMsg = '이름을 입력해 주세요.';
        }
        else {
            isNameError = false;
            isNameMsg = '';
        }

        setState({
            ...state,
            isNameError: isNameError,
            isNameMsg: isNameMsg,
            이름: 이름
        })
    }

    // 5-1. 이메일 입력상자  onChange  이벤트
    const onChangeUserEmail = (e) => {
        const { value } = e.target;
        let isEmailError = false;
        let isEmailMsg = '';
        const regExp = /^[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'/?]+(\.)?[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'/?]*@[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'/\.?]+\.[a-z]{2,3}$/gi;

        if (value === '') {
            isEmailError = true;
            isEmailMsg = '이메일을 입력해 주세요.';
        }
        else if (regExp.test(value) === false) {
            isEmailError = true;
            isEmailMsg = '이메일 형식으로 입력해 주세요.';
        }
        else {
            isEmailError = false;
            isEmailMsg = '';
        }

        setState({
            ...state,
            isEmailError: isEmailError,
            isEmailMsg: isEmailMsg,
            이메일: value
        })

    }

    // 5-2. 이메일 중복검사
    const onClickUserEmailOk = (e) => {
        e.preventDefault();
        const value = state.이메일;
        const regExp = /^[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'/?]+(\.)?[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'/?]*@[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'/\.?]+\.[a-z]{2,3}$/gi;

        if (value === '') {
            confirmModalOpen('이메일을 입력해 주세요.');
        }
        else if (regExp.test(value) === false) {
            confirmModalOpen('이메일을 입력해 주세요.');
        }
        else {


            const url = '/emailcheck';

            const data = JSON.stringify({
                userEmail: state.이메일,
            });

            httpPostRequest(url, data)
                .then(data => {
                    console.log(data);
                    if (data.response && data.response.data) {
                        const result = data.response.data.result;

                        if (result !== null) {
                            if (result === true) {
                                setState({
                                    ...state,
                                    isEmailOk: false
                                });
                                confirmModalOpen('사용 불가능한 이메일 입니다.');
                            }
                        }
                    } else {
                        console.log('Invalid response format:', data);
                        if (data.result === false) {
                            setState({
                                ...state,
                                isEmailOk: true
                            });
                            confirmModalOpen('사용 가능한 이메일 입니다.');
                        }
                    }

                }).catch(error => {
                    console.log(error);
                });

        }


    }

    // 6. 휴대폰
    const onChangeHp = (e) => {
        const regExp = /[^0-9]/g;
        let 휴대폰 = '';
        let isHpError = false;
        let isHpMsg = '';
        let isHpdisabled = true;
        const { value } = e.target;


        // 숫자가 아니면 삭제
        휴대폰 = value.replace(regExp, '');

        if (휴대폰 === '') {
            isHpError = true;
            isHpMsg = '휴대폰 번호를 입력해 주세요.'
        }
        else {
            isHpError = false;
            isHpMsg = ''
            if (휴대폰.length >= 1) {
                isHpdisabled = false;
            }
            else {
                isHpdisabled = true;
            }
        }

        setState({
            ...state,
            휴대폰: 휴대폰,
            isHpError: isHpError,
            isHpMsg: isHpMsg,
            isHpdisabled: isHpdisabled
        });

    }


    // 6-1 휴대폰 발송인증번호 받기 클릭 이벤트
    const onClickHpNum = (e) => {
        e.preventDefault();
        const regExp = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/;
        let num = 0;
        let 발송인증번호 = 0;

        if (regExp.test(state.휴대폰) === false) {
            confirmModalOpen('잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요.');
        }
        else {
            num = Math.floor(Math.random() * 900000 + 100000);
            발송인증번호 = num;
            confirmModalOpen(`인증번호가 발송되었습니다.  ${num}`);

        }
        setState({
            ...state,
            발송인증번호: 발송인증번호
        })


    }

    // 6-2 휴대폰 발송인증번호 확인 입력상자 onChange() 이벤트
    const onChangeHp2 = (e) => {
        const { value } = e.target;
        let isHpdisabled2 = true;

        if (value.length >= 1) {
            isHpdisabled2 = false;
        }
        else {
            isHpdisabled2 = true;
        }

        setState({
            ...state,
            입력인증번호: value,
            isHpdisabled2: isHpdisabled2
        })

    }

    // 6-3 휴대폰 발송인증번호 확인 버튼 클릭 이벤트
    const onClickHpNum2 = (e) => {
        e.preventDefault();
        let confirmMsg = '';
        let isHp3 = true;
        let isHpdisabled = true;
        let 발송인증번호 = state.발송인증번호;
        let isHpOk = false;

        if (state.발송인증번호 === Number(state.입력인증번호)) {
            confirmMsg = "인증에 성공 하였습니다.";
            isHp3 = false;
            발송인증번호 = '';
            isHpdisabled = true;
            isHpOk = true;

            clearInterval(timer.setId);
        }
        else {
            confirmMsg = "잘못된 인증 코드 입니다.";
            isHp3 = true;
            발송인증번호 = state.발송인증번호;
            isHpdisabled = false;
        }


        setState({
            ...state,
            isHp3: isHp3,
            발송인증번호: 발송인증번호,
            isHpdisabled: isHpdisabled,
            isHpOk: isHpOk
        })

        confirmModalOpen(confirmMsg);

    }

    // 6-4 다른번호 인증
    const onClickHpNum3 = (e) => {
        e.preventDefault();

        setState({
            ...state,
            isHp3: true,
            휴대폰: '',
            입력인증번호: '',
            발송인증번호: '',
        })

        createRef.current.focus();
    }


    // 7-1. 주소검색 API : 팝업창 구현
    const onClickAddrPopupOpenApi = (e) => {
        e.preventDefault();
        openPopupDaumPostApi(); // 팝업창 열기
    }

    // 7-3.  주소1 입력상자 onChange() 이벤트
    const onChangeAddr1 = (e) => {
        // 수정못함
    }

    // 7-4. 주소2 입력상자 onChange() 이벤트
    const onChangeAddr2 = (e) => {
        // 입력이 완료된 주소1, 주소2
        // 나머지 주소는 변경가능하도록 수정 주소2
        // 먼저 주소1을 임시 보관저장하고
        // 나머지주소 즉 주소2를 수정 입력하여 주소1과 주소2를 저장한다.

        const imsi = addr.주소1;

        setAddr({
            ...addr,
            주소2: e.target.value,
            isAddr: true
        })

        const obj = {
            주소1: imsi,
            주소2: addr.주소2
        }

        sessionStorage.setItem('ADDRESS', JSON.stringify(obj));

    }

    // 7-5. 주소검색 => 재검색 버튼 클릭 이벤트
    const onClickResearchBtn = (e) => {
        e.preventDefault();
        openPopupDaumPostApi(); // 팝업창 열기
    }

    // 8. 성별 : 라디오버튼 이벤트
    const onChangeGender = (e) => {
        setState({
            ...state,
            성별: e.target.value
        })
    }

    // 9. 생년월일
    React.useEffect(() => {
        const nowYear = new Date().getFullYear();
        let isBirth = false;
        let isBirthMsg = '';

        if (state.생년 === '' && state.생월 === '' && state.생일 === '') {
            isBirth = true;
            isBirthMsg = '';
        }
        else {

            if (state.생년.length < 4) {  // 생년(4자리 숫자)
                isBirth = true;
                isBirthMsg = '태어난 년도 4자리를 정확하게 입력해주세요.';
            }
            else if (Number(state.생년) > nowYear) { //생년(미래년도)
                isBirth = true;
                isBirthMsg = '생년월일 확인하세요(미래년도)';
            }
            else if (Number(state.생년) >= (nowYear - 14)) { //생년(14세미만) 나이가 어린나이
                isBirth = true;
                isBirthMsg = '생년월일 확인하세요(14세미만)';
            }
            else if (Number(state.생년) < (nowYear - 100)) {  // 생년(100세이하)
                isBirth = true;
                isBirthMsg = '생년월일 확인하세요(100세초과)';
            }
            else {
                // 생월 체크
                if (Number(state.생월) < 1 || Number(state.생월) > 12) { // 1 ~ 12
                    isBirth = true;
                    isBirthMsg = '생월 확인하세요';
                }
                else {
                    // 생일 체크
                    if (Number(state.생일) < 1 || Number(state.생일) > 31) { // 1 ~ 31
                        isBirth = true;
                        isBirthMsg = '생일 확인하세요';
                    }
                    else {
                        isBirth = false;
                        isBirthMsg = '';
                    }
                }

            }
        }

        // 상태관리
        setState({
            ...state,
            isBirth: isBirth,
            isBirthMsg: isBirthMsg
        })
    }, [state.생년, state.생월, state.생일]);

    const onChangeYear = (e) => {
        const regExtp = /[^0-9]/g;
        let 생년 = e.target.value.replace(regExtp, '');
        setState({
            ...state,
            생년: 생년
        })
    }

    const onChangeMonth = (e) => {
        const regExtp = /[^0-9]/g;
        let 생월 = e.target.value.replace(regExtp, '');

        setState({
            ...state,
            생월: 생월
        })

    }

    // 3) 생일 입력상자 onchange() 이벤트 상태관리자 연결 변수 만들어 줘야한다.
    const onChangeDate = (e) => {
        const regExtp = /[^0-9]/g; // 숫자가 아닌것
        let 생일 = e.target.value.replace(regExtp, '');
        setState({
            ...state,
            생일: 생일
        })

    }


    // 10-1. 추가입력사항 : 라디오버튼 이벤트
    const onChangeUserChooga = (e) => {
        let 추가입력사항 = '';
        let isChooga1 = false;
        let isChooga2 = false;

        if (e.target.checked === true) {
            추가입력사항 = e.target.value;
            if (e.target.id === 'userChooga1') {  // 선택: 라디오1, 라디오2 
                isChooga1 = true;
                isChooga2 = false;
            }
            else {
                isChooga1 = false;
                isChooga2 = true;
            }
        }

        setState({
            ...state,
            추가입력사항: 추가입력사항,
            isChooga1: isChooga1,
            isChooga2: isChooga2
        })
    }


    // 10-2. 추천인아이디 입력상자 onChange() 이벤트
    const onChangeUserChoogaId = (e) => {
        let ischoogaIdokBtn = false;
        let ischoogaIdokBtnDisabled = true;

        // 추천인아이디 글자 입력 1자이상이면 우측 아이디확인버튼 사용가능하도록 설정(setter)
        if (e.target.value.length > 1) {
            ischoogaIdokBtn = true;  // 사용가능 색상
            ischoogaIdokBtnDisabled = false; // 사용가능
        }
        else {
            ischoogaIdokBtn = false;
            ischoogaIdokBtnDisabled = true; // 사용불가능
        }

        setState({
            ...state,
            추천인아이디: e.target.value,
            ischoogaIdokBtn: ischoogaIdokBtn,
            ischoogaIdokBtnDisabled: ischoogaIdokBtnDisabled
        });
    }


    // 10-3. 추가 이벤트 입력상자 onChange() 이벤트
    const onChangeUserChoogaEvent = (e) => {
        setState({
            ...state,
            참여이벤트명: e.target.value
        });
    }


    // 10-4 추천인 아이디 확인 : 데이터베이스 조회
    // 서버에서 DB 정보와 비교 아이디가 있다면 이벤트 참여 가능
    // 버튼 클릭 이벤트
    const onClickChoogaIdokBtn = (e) => {

        e.preventDefault();


        const url = '/idcheck';

        const data = JSON.stringify({
            userId: state.추천인아이디
        });

        httpPostRequest(url, data)
            .then(data => {
                // console.log(data);
                if (data.response && data.response.data) {
                    const result = data.response.data.result;

                    if (result !== null) {
                        if (result === true) {
                            confirmModalOpen('존재하는 아이디 입니다. 친구초대 이벤트에 참여 가능해요.');
                        }
                    }
                } else {
                    // console.log('Invalid response format:', data);
                    if (data.result === false) {
                        confirmModalOpen('존재하지 않는 아이디 입니다.');
                    }
                }

            }).catch(error => {
                console.log(error);
            });

    }


    // 11. 이용약관동의
    const onChangeUserServiceAll = (e) => {
        let 이용약관동의 = [];

        if (e.target.checked === true) {  // 전체동의를 체크 했다면
            이용약관동의 = state.이용약관  // 이용약관 배열 7개의 항목 모두 => 이용약관동의 배열에 저장한다.
        }
        else {
            이용약관동의 = [];  // 빈배열 삭제
        }

        setState({
            ...state,
            이용약관동의: 이용약관동의
        })

    }


    // 체크박스 개별체크 7개
    const onChangeUserService = (e) => {

        if (e.target.checked === true) { // 체크되면 개별체크 선택항목 value 값을 이용약관동의 배열에 저장시킨다.

            if (e.target.value === '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)' && state.이용약관동의.includes('SMS') === false && state.이용약관동의.includes('이메일') === false) {
                setState({
                    ...state,
                    이용약관동의: [...state.이용약관동의, e.target.value, 'SMS', '이메일']
                })
            }
            else if (e.target.value === '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)' && state.이용약관동의.includes('SMS') === false && state.이용약관동의.includes('이메일') === true) {
                setState({
                    ...state,
                    이용약관동의: [...state.이용약관동의, e.target.value, 'SMS']  // '이메일'은 있데요 넣지 마세요
                })
            }
            else if (e.target.value === '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)' && state.이용약관동의.includes('SMS') === true && state.이용약관동의.includes('이메일') === false) {
                setState({
                    ...state,
                    이용약관동의: [...state.이용약관동의, e.target.value, '이메일']  // 'SMS'은 있데요 넣지 마세요
                })
            }
            else if (e.target.value === '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)' && state.이용약관동의.includes('SMS') === true && state.이용약관동의.includes('이메일') === true) {
                setState({
                    ...state,
                    이용약관동의: [...state.이용약관동의, e.target.value]  // '이메일'와 'SMS' 둘다 있데요 둘다 넣지 마세요
                })
            }
            // 현재 SNS를 체크했는데 이메일이 체크 되어있고 그리고 무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택) 선택이 안되어 있다면
            else if (e.target.value === 'SMS' && state.이용약관동의.includes('이메일') === true && state.이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)') === false) {
                setState({
                    ...state,
                    이용약관동의: [...state.이용약관동의, e.target.value, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)']  // '이메일'와 'SMS' 둘다 있데요 둘다 넣지 마세요
                })
            }
            // 현재 SNS를 체크했는데 이메일이 체크 되어있고 그리고 무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택) 선택이 안되어 있다면
            else if (e.target.value === '이메일' && state.이용약관동의.includes('SMS') === true && state.이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)') === false) {
                setState({
                    ...state,
                    이용약관동의: [...state.이용약관동의, e.target.value, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)']  // '이메일'와 'SMS' 둘다 있데요 둘다 넣지 마세요
                })
            }
            else {
                setState({
                    ...state,
                    이용약관동의: [...state.이용약관동의, e.target.value]
                })
            }



        }
        else { // 체크 안되면 개별체크 선택항목 value 값을 이용약관동의 배열에서 삭제시킨다.
            let 이용약관동의 = [];  // 임시배열

            if (e.target.value === '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)') {
                이용약관동의 = state.이용약관동의.filter((item) => item !== e.target.value);  // 삭제1 : '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택) 
                이용약관동의 = 이용약관동의.filter((item) => item !== 'SMS');  // 삭제2 : 'SMS' 
                이용약관동의 = 이용약관동의.filter((item) => item !== '이메일');  // 삭제3 : '이메일' 
                setState({
                    ...state,
                    이용약관동의: 이용약관동의  // 삭제되고 새롭게 배열 구성 완료
                })
            }
            else if (e.target.value === 'SMS' && state.이용약관동의.includes('이메일') === true) {
                이용약관동의 = state.이용약관동의.filter((item) => item !== e.target.value);
                이용약관동의 = 이용약관동의.filter((item) => item !== '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)');
                setState({
                    ...state,
                    이용약관동의: 이용약관동의  // 삭제되고 새롭게 배열 구성 완료
                })
            }

            else if (e.target.value === '이메일' && state.이용약관동의.includes('SMS') === true) {
                이용약관동의 = state.이용약관동의.filter((item) => item !== e.target.value);
                이용약관동의 = 이용약관동의.filter((item) => item !== '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)');
                setState({
                    ...state,
                    이용약관동의: 이용약관동의  // 삭제되고 새롭게 배열 구성 완료
                })
            }

            else {
                setState({
                    ...state,
                    이용약관동의: state.이용약관동의.filter((item) => item !== e.target.value)
                })
            }
        }
    }

    // 가입하기 버튼 클릭 이벤트 전송
    const onSubmitSignupEvent = (e) => {
        e.preventDefault();

        // 이용약관동의 필수항목 체크 3개
        let cnt = 0;
        state.이용약관동의.map((item) => {
            if (item.indexOf('필수') !== -1) {
                cnt++;
            }
        });

        // 최종 유효성 검사
        if (state.아이디 === '') {
            confirmModalOpen('아이디를 입력하세요');
        }
        else if (state.아이디중복확인 === false) {
            confirmModalOpen('아이디 중복확인을 해주세요');
        }
        else if (state.비밀번호 === '') {
            confirmModalOpen('비밀번호를 입력하세요');
        }
        else if (state.비밀번호확인 === '') {
            confirmModalOpen('한번더 비밀번호를 입력하세요');
        }
        else if (state.이름 === '') {
            confirmModalOpen('이름을 입력하세요');
        }
        else if (state.이메일 === '') {
            confirmModalOpen('이메일을 입력하세요');
        }
        else if (state.이메일중복확인 === false) {
            confirmModalOpen('이메일 중복확인을 해세요');
        }
        else if (state.휴대폰 === '') {
            confirmModalOpen('휴대폰을 입력하세요');
        }
        else if (state.isHpOk === false) {
            confirmModalOpen('휴대폰 인증을 해주세요');
        }
        else if (addr.주소1 === '') {
            confirmModalOpen('주소를 검색 해주세요');
        }
        else if (addr.주소2 === '') {
            confirmModalOpen('나머지 주소를 입력 해주세요');
        }
        else if (cnt < 3) { //이용약관동의 필수항목
            confirmModalOpen('이용약관동의 필수항목 3개를 선택해야합니다.');
        }
        else {

            const regExpHp = /^(\d{3})(\d{3,4})(\d{4})$/g;

            // AJAX 전송하기
            // 약관동의는 배열 그래서 문자열(String)로 변환
            let 약관동의 = '';
            state.이용약관동의.map((item, idx) => {
                if (idx === state.이용약관동의.length - 1) {
                    약관동의 += item
                }
                else {
                    약관동의 += item + ', '
                }

            })


            const url = '/signup';

            let userSex;
            switch (state.성별) {
                case "남성":
                    userSex = "M";
                    break;

                case "여성":
                    userSex = "F";
                    break;

                case "선택안함":
                    userSex = "N";
                    break;

                default:
                    break;
            }

            let userAgreementList = {
                requiredTermsCondition: false,
                requiredTermsOfPrivacy: false,
                optionalTermsOfPrivacy: false,
                optionalTermsOfSms: false,
                optionalTermsOfMailing: false,
                requiredSignupAge: false,
            }

            state.이용약관동의.map((item, idx) => {
                // 각 항목에 대한 동의 여부를 업데이트
                switch (item) {
                    case '이용약관 동의(필수)':
                        userAgreementList.requiredTermsCondition = true
                        break;
                    case '개인정보 수집∙이용 동의(필수)':
                        userAgreementList.requiredTermsOfPrivacy = true
                        break;
                    case '개인정보 수집∙이용 동의(선택)':
                        userAgreementList.optionalTermsOfPrivacy = true
                        break;
                    case 'SMS':
                        userAgreementList.optionalTermsOfSms = true
                        break;
                    case '이메일':
                        userAgreementList.optionalTermsOfMailing = true
                        break;
                    case '본인은 만 14세 이상입니다.(필수)':
                        userAgreementList.requiredSignupAge = true
                        break;
                    default:
                        break;
                }
            });
            let data;
            let userJoinDate = new Date().toISOString();
            if (sessionStorage.getItem('ADDRESS') !== null) {
                let address = JSON.parse(sessionStorage.getItem('ADDRESS'));
                data = JSON.stringify({
                    userId: state.아이디,
                    userPw: state.비밀번호,
                    userName: state.이름,
                    userEmail: state.이메일,
                    userPhone: state.휴대폰.replace(regExpHp, '$1-$2-$3'),
                    userPostcode: address.우편번호,
                    userAddr: address.주소1,
                    userDetailAddr: address.주소2,
                    userSex: userSex,
                    userBirth: `${state.생년}-${state.생월}-${state.생일}`,
                    userRecommender: state.추천인아이디,
                    userParticipationEventName: state.참여이벤트명,
                    userDelete: "N",
                    userJoinDate: userJoinDate,
                    requiredTermsCondition: userAgreementList.requiredTermsCondition,
                    requiredTermsOfPrivacy: userAgreementList.requiredTermsOfPrivacy,
                    optionalTermsOfPrivacy: userAgreementList.optionalTermsOfPrivacy,
                    optionalTermsOfSms: userAgreementList.optionalTermsOfSms,
                    optionalTermsOfMailing: userAgreementList.optionalTermsOfMailing,
                    requiredSignupAge: userAgreementList.requiredSignupAge,
                });
            }
            httpPostRequest(url, data)
                .then(data => {
                    console.log(data);
                    if (data.response && data.response.data) {
                        const result = data.response.data.result;

                        // 회원가입 실패
                        if (result !== null) {
                            if (result === false) {
                                confirmModalOpen("회원가입 실패하였습니다. 입력하신 항목을 다시 한번 확인 해 주세요.");
                            }
                        }
                    } else {
                        // 회원가입 성공
                        if (data.result === true) {
                            confirmModalOpen("회원가입을 성공하였습니다. 반갑습니다.");
                            navigate(`/signin`);
                        }
                    }

                }).catch(error => {
                    console.log(error);
                });
        }

    }


    return (
        <>
            <main id='signUp'>
                <section id="section1">
                    <div className="container">
                        <div className="gap">
                            <div className="title">
                                <h2>회원가입</h2>

                                <p><span><i>*</i>필수입력사항</span></p>
                            </div>
                            <div className="content">
                                <form autoComplete='off' onSubmit={onSubmitSignupEvent} name='sign_up_form' id='signUpForm' method='post' action="./sign_up.php">
                                    <ul>
                                        <li>
                                            <div>
                                                <label htmlFor="userId">아이디<i>*</i></label>
                                                <div className="center-box">
                                                    <input
                                                        type='text'
                                                        maxLength={16}
                                                        name='user_id'
                                                        id='userId'
                                                        placeholder='아이디를 입력해주세요'
                                                        onChange={onChangeUserId}
                                                        value={state.아이디}
                                                    />
                                                </div>
                                                <button
                                                    type='button'
                                                    onClick={onClickUserIdOk}
                                                >중복확인</button>
                                                <p className={`error-msg${state.isIdError ? ' on' : ''}`}>{state.isIdMsg}</p>
                                            </div>


                                        </li>
                                        <li>
                                            <div>
                                                <label htmlFor="userPw1">비밀번호<i>*</i></label>
                                                <div className="center-box">
                                                    <input
                                                        type='password'
                                                        maxLength={16}
                                                        name='user_pw1'
                                                        id='userPw1'
                                                        placeholder='비밀번호를 입력해주세요'
                                                        onChange={onChangeUserPw1}
                                                        value={state.비밀번호}
                                                    />
                                                </div>
                                                <p className={`error-msg${state.isPwError ? ' on' : ''}`}>{state.isPwMsg}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <label htmlFor="userPw2">비밀번호확인<i>*</i></label>
                                                <div className="center-box">
                                                    <input
                                                        type='password'
                                                        maxLength={16}
                                                        name='user_pw2'
                                                        id='userPw2'
                                                        placeholder='비밀번호를 한번 더 입력해주세요'
                                                        onChange={onChangeUserPw2}
                                                        value={state.비밀번호확인}
                                                    />
                                                </div>
                                                <p className={`error-msg${state.isPw2Error ? ' on' : ''}`}>{state.isPw2Msg}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <label htmlFor="userName">이름<i>*</i></label>
                                                <div className="center-box">
                                                    <input
                                                        type='text'
                                                        name='user_name'
                                                        id='userName'
                                                        placeholder='이름을 입력해주세요'
                                                        onChange={onChangeName}
                                                        value={state.이름}
                                                    />
                                                </div>
                                                <p className={`error-msg${state.isNameError ? ' on' : ''}`}>이름 메시지 텍스트{state.isNameMsg}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <label htmlFor="userEmail">이메일<i>*</i></label>
                                                <div className="center-box">
                                                    <input
                                                        type='email'
                                                        name='user_email'
                                                        id='userEmail'
                                                        placeholder='이메일을 입력해주세요'
                                                        onChange={onChangeUserEmail}
                                                        value={state.이메일}
                                                    />
                                                </div>
                                                <button
                                                    type='button'
                                                    onClick={onClickUserEmailOk}
                                                >중복확인</button>
                                                <p className={`error-msg${state.isEmailError ? ' on' : ''}`}>{state.isEmailMsg}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <label htmlFor="userHp">휴대폰<i>*</i></label>
                                                <div className="center-box">
                                                    <input
                                                        type='text'
                                                        maxLength={11}
                                                        name='user_hp'
                                                        id='userHp'
                                                        placeholder='숫자만 입력해주세요'
                                                        onChange={onChangeHp}
                                                        value={state.휴대폰}
                                                        ref={createRef}
                                                    />
                                                </div>
                                                <button className={`hp-num-btn ${state.isHpdisabled ? '' : ' on'}`} onClick={onClickHpNum} disabled={state.isHpdisabled} type='button'>인증번호 받기</button>
                                                <button className={`hp-num-btn hp-num-btn3${state.isHp3 ? '' : ' on'}`} onClick={onClickHpNum3} type='button'>다른번호 인증</button>
                                                <p className={`error-msg${state.isHpError ? ' on' : ''}`}>{state.isHpMsg}</p>
                                            </div>
                                        </li>

                                        {
                                            state.발송인증번호 !== '' && (
                                                <li>
                                                    <div>
                                                        <div className="center-box">
                                                            <input
                                                                type='text'
                                                                maxLength={6}
                                                                name='user_hp2'
                                                                id='userHp2'
                                                                placeholder='발송인증번호를 입력하세요'
                                                                onChange={onChangeHp2}
                                                                value={state.휴대폰발송인증번호}
                                                            />
                                                            <span className='hp-timer-counter'>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
                                                        </div>
                                                        <button className={`hp-num-btn${state.isHpdisabled2 ? '' : ' on'}`} onClick={onClickHpNum2} disabled={state.isHpdisabled2} type='button'>인증번호 확인</button>

                                                    </div>
                                                </li>
                                            )
                                        }

                                        <li>
                                            <div>
                                                <label htmlFor="userAddress1">주소<i>*</i></label>
                                                <div className="center-box">
                                                    <button className={`addr-search-btn${addr.isAddr ? ' on' : ''}`} onClick={onClickAddrPopupOpenApi} type='button'>주소검색</button>
                                                    <input
                                                        onChange={onChangeAddr1}
                                                        onFocus={onChangeAddr1}
                                                        type='text'
                                                        className={`${addr.isAddr ? 'on' : ''}`}
                                                        name='user_address1'
                                                        id='userAddress1'
                                                        placeholder='검색   주소1'
                                                        value={addr.주소1}
                                                    />
                                                    <input
                                                        onChange={onChangeAddr2}
                                                        type='text'
                                                        className={`${addr.isAddr ? 'on' : ''}`}
                                                        name='user_address2' id='userAddress2'
                                                        placeholder='나머지 주소2'
                                                        value={addr.주소2}
                                                    />
                                                    <h5>샛별배송</h5>

                                                    <h6>배송지에 따라 상품 정보가 달라질 수 있습니다.</h6>
                                                </div>

                                                <button
                                                    onClick={onClickResearchBtn}
                                                    className={`addr-research-btn${addr.isAddr ? ' on' : ''}`}
                                                    type='button'
                                                >재검색</button>

                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <label>성별</label>
                                                <div className="center-box gender">
                                                    {/* <label htmlFor="userMale"><input onChange={onChangeGender} type='radio' name='user_gender' id='userMale' value={'남자'} checked={state.성별.includes('남자')===true?true:false} />남자</label> */}
                                                    <label><input onChange={onChangeGender} type='radio' name='user_gender' id='userMale' value={'남자'} checked={state.성별.includes('남자')} />남자</label>
                                                    <label><input onChange={onChangeGender} type='radio' name='user_gender' id='userFemale' value={'여자'} checked={state.성별.includes('여자')} />여자</label>
                                                    <label><input onChange={onChangeGender} type='radio' name='user_gender' id='userNone' value={'선택안함'} checked={state.성별.includes('선택안함')} />선택안함</label>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <div>
                                                <label>생년월일</label>
                                                <div className="center-box birth">
                                                    <div className="birth-box">
                                                        <ul>
                                                            <li>
                                                                <input
                                                                    type="text"
                                                                    maxLength={4}
                                                                    name='user_birth_year'
                                                                    id='userBirthYear'
                                                                    placeholder='YYYY'
                                                                    onChange={onChangeYear}
                                                                    value={state.생년}
                                                                /></li>
                                                            <li><i>/</i></li>
                                                            <li>
                                                                <input
                                                                    type="text"
                                                                    maxLength={2}
                                                                    name='user_birth_month'
                                                                    id='userBirthMonth>'
                                                                    placeholder='MM'
                                                                    onChange={onChangeMonth}
                                                                    value={state.생월}
                                                                /></li>
                                                            <li><i>/</i></li>
                                                            <li>
                                                                <input
                                                                    type="text"
                                                                    maxLength={2}
                                                                    name='user_birth_date'
                                                                    id='userBirthDate'
                                                                    placeholder='DD'
                                                                    onChange={onChangeDate}
                                                                    value={state.생일}
                                                                /></li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <p className={`error-msg${state.isBirth ? ' on' : ''}`}>{state.isBirthMsg}</p>
                                            </div>
                                        </li>

                                        <li>
                                            <div>
                                                <label>추가입력사항</label>
                                                <div className="center-box chooga">
                                                    {/* <label htmlFor="userMale"><input onChange={onChangeGender} type='radio' name='user_gender' id='userMale' value={'남자'} checked={state.성별.includes('남자')===true?true:false} />남자</label> */}
                                                    <label>
                                                        <input
                                                            type='radio'
                                                            name='user_chooga'
                                                            id='userChooga1'
                                                            value={'친구초대 추천인 아이디'}
                                                            onChange={onChangeUserChooga}
                                                            checked={state.추가입력사항.includes('친구초대 추천인 아이디')}
                                                        />친구초대 추천인 아이디
                                                    </label>
                                                    <label>
                                                        <input
                                                            type='radio'
                                                            name='user_chooga'
                                                            id='userChooga2'
                                                            value={'참여 이벤트명'}
                                                            onChange={onChangeUserChooga}
                                                            checked={state.추가입력사항.includes('참여 이벤트명')}
                                                        />참여 이벤트명
                                                    </label>
                                                </div>

                                                <div className="chooga-box">
                                                    {
                                                        state.isChooga1 && (
                                                            <>
                                                                <input
                                                                    type="text"
                                                                    name='user_chooga_id'
                                                                    id='userChoogaId'
                                                                    placeholder='추천인 아이디를 입력해 주세요.'
                                                                    onChange={onChangeUserChoogaId}
                                                                    value={state.추천인아이디}
                                                                />
                                                                <h6>가입 후 7일 내 첫 주문 배송완료 시, 친구초대 이벤트 적립금이 지급됩니다.</h6>
                                                            </>
                                                        )
                                                    }

                                                    {
                                                        state.isChooga2 && (
                                                            <>
                                                                <input
                                                                    type="text"
                                                                    name='user_chooga_event'
                                                                    id='userChoogaEvent'
                                                                    placeholder='참여 이벤트명을 입력해 주세요.'
                                                                    onChange={onChangeUserChoogaEvent}
                                                                    value={state.참여이벤트명}
                                                                />
                                                                <h6>
                                                                    추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다.<br />
                                                                    가입 이후는 수정이 불가능 합니다.<br />
                                                                    대소문자 및 띄어쓰기에 유의해주세요.
                                                                </h6>
                                                            </>
                                                        )
                                                    }


                                                </div> {/* chooga-box */}

                                                {
                                                    state.isChooga1 && (
                                                        <button
                                                            className={`chooga-idok-btn${state.ischoogaIdokBtn === true ? ' on' : ''}`}
                                                            onClick={onClickChoogaIdokBtn}
                                                            disabled={state.ischoogaIdokBtnDisabled}
                                                        >아이디 확인</button>
                                                    )
                                                }
                                            </div>
                                        </li>


                                        <li className='hr'>
                                            <hr />
                                        </li>

                                        <li className='service-box'>
                                            <div>
                                                <label>이용약관동의<i>*</i></label>
                                                <div className="center-box service">
                                                    {/* <label htmlFor="userMale"><input onChange={onChangeGender} type='radio' name='user_gender' id='userMale' value={'남자'} checked={state.성별.includes('남자')===true?true:false} />남자</label> */}
                                                    <ul>
                                                        <li>
                                                            <label>
                                                                <input
                                                                    onChange={onChangeUserServiceAll}
                                                                    type='checkbox'
                                                                    name='user_service_all'
                                                                    id='userServiceAll'
                                                                    value={'전체 동의합니다.'}
                                                                    // checked={state.이용약관동의.length===7?true:false}
                                                                    checked={state.이용약관동의.length === 7}
                                                                />전체 동의합니다.</label>
                                                            <h5>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</h5>
                                                        </li>

                                                        <li>
                                                            <label>
                                                                <input
                                                                    type='checkbox'
                                                                    name='user_service_1'
                                                                    id='userService1'
                                                                    value={'이용약관 동의(필수)'}
                                                                    checked={state.이용약관동의.includes('이용약관 동의(필수)')}
                                                                    onChange={onChangeUserService}
                                                                />이용약관 동의</label><span>필수</span>
                                                        </li>
                                                        <li>
                                                            <label>
                                                                <input
                                                                    type='checkbox'
                                                                    name='user_service_2'
                                                                    id='userService2'
                                                                    value={'개인정보 수집∙이용 동의(필수)'}
                                                                    checked={state.이용약관동의.includes('개인정보 수집∙이용 동의(필수)')}
                                                                    onChange={onChangeUserService}
                                                                />개인정보 수집∙이용 동의</label><span>필수</span>
                                                        </li>
                                                        <li>
                                                            <label>
                                                                <input
                                                                    type='checkbox'
                                                                    name='user_service_3'
                                                                    id='userService3'
                                                                    value={'개인정보 수집∙이용 동의(선택)'}
                                                                    checked={state.이용약관동의.includes('개인정보 수집∙이용 동의(선택)')}
                                                                    onChange={onChangeUserService}
                                                                />개인정보 수집∙이용 동의</label><span>선택</span>
                                                        </li>
                                                        <li>
                                                            <label>
                                                                <input
                                                                    type='checkbox'
                                                                    name='user_service_4'
                                                                    id='userService4'
                                                                    value={'무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'}
                                                                    checked={state.이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)')}
                                                                    onChange={onChangeUserService}
                                                                />무료배송, 할인쿠폰 등 혜택/정보 수신 동의</label><span>선택</span>
                                                        </li>
                                                        <li className='service56'>
                                                            <label>
                                                                <input
                                                                    type='checkbox'
                                                                    name='user_service_5'
                                                                    id='userService5'
                                                                    value={'SMS'}
                                                                    checked={state.이용약관동의.includes('SMS')}
                                                                    onChange={onChangeUserService}
                                                                />SMS</label>
                                                            <label>
                                                                <input
                                                                    type='checkbox'
                                                                    name='user_service_6'
                                                                    id='userService6'
                                                                    value={'이메일'}
                                                                    checked={state.이용약관동의.includes('이메일')}
                                                                    onChange={onChangeUserService}
                                                                />이메일</label>
                                                            <h6>동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</h6>
                                                        </li>
                                                        <li>
                                                            <label><input
                                                                type='checkbox'
                                                                name='user_service_7'
                                                                id='userService7'
                                                                value={'본인은 만 14세 이상입니다.(필수)'}
                                                                checked={state.이용약관동의.includes('본인은 만 14세 이상입니다.(필수)')}
                                                                onChange={onChangeUserService}
                                                            />본인은 만 14세 이상입니다.</label><span>본인은 만 14세 이상입니다.(필수)</span>
                                                        </li>

                                                    </ul>

                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <button type='submit'>가입하기</button>
                                        </li>

                                    </ul>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>

    );
};

SignUpComponent.defaultProps = {
    회원가입: {
        // 1-1. 아이디
        아이디: '',         // String(VARCHAR) 입력상자 아이디 저장  
        isIdError: false,  // 입력상자 아이디 유효성 검사 오류 여부
        isIdMsg: '',


        // 1-2. 아이디 중복확인 : 모달창
        isIdOk: false,


        // 2. 비밀번호
        비밀번호: '',
        isPwError: false,
        isPwMsg: '',


        // 3. 비밀번호확인
        비밀번호확인: '',
        isPw2Error: false,
        isPw2Msg: '',


        // 4. 이름
        이름: '',
        isNameError: false,
        isNameMsg: '',


        // 5-1. 이메일
        이메일: '',
        isEmailError: false,
        isEmailMsg: '',



        // 5-2. 이메일 중복확인 : 모달창
        isEmailOk: false,


        // 6-1. 휴대폰
        휴대폰: '',
        isHpError: false,
        isHpMsg: '',


        // 6-2. 휴대폰 발송인증번호 받기 버튼 디세이블드 
        isHpdisabled: true, // 휴대폰 발송인증번호 받기 버튼 사용불가 (true)
        발송인증번호: '',

        // 6-3. 휴대폰 입력인증번호 확인 입력상자
        입력인증번호: '',
        isHpdisabled2: true, // 휴대폰 인증번호 확인 버튼 사용불가 (true)

        // 6-4. 휴대폰 입력인증번호 확인 버튼 클릭 이벤트


        // 6-5. 다른번호인증 : 인증번호 성공하면 보임
        isHp3: true,

        // 6-6 휴대폰인증성공 저장
        isHpOk: false,


        // 주소
        isAddress: true,  // Boolean
        userPostcode: '',
        주소1: '',
        주소2: '',


        // 생년월일
        생년: '',
        생월: '',
        생일: '',
        isBirth: false,
        isBirthMsg: '',



        // 성별
        성별: '선택안함', // String


        // 추가입력사항
        추가입력사항: '', // String
        참여이벤트명: '',
        추천인아이디: '',
        isChooga1: false,
        isChooga2: false,
        ischoogaIdokBtn: false,
        ischoogaIdokBtnDisabled: true,


        // 이용약관
        이용약관: [
            "이용약관 동의(필수)",
            "개인정보 수집∙이용 동의(필수)",
            "개인정보 수집∙이용 동의(선택)",
            "무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)",
            "SMS",
            "이메일",
            "본인은 만 14세 이상입니다.(필수)"
        ],

        // 이용약관동의 : 내용이 체크박스 VALUE 값과 같다면 체크된다.
        이용약관동의: []
    }
}
