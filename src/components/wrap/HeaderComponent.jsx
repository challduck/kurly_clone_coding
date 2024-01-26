import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
// 컨텍스트를 사용하고자하면 해당 컴포넌트에서 가져와서 사용등록
import { GlobalContext } from '../../context/GlobalContext';
import { CartContext } from '../../context/CartContext';
import { ConfirmContext } from '../../context/ConfirmContext';
import { httpGetRequest, httpPostRequest } from '../../lib/productApi';

export default function HeaderComponent({ setIsIntroFn }) {


    // 컨텍스트 사용 전역 변수 상태관리 
    const { openPopupDaumPostApi, addr, signin, setSigin, isLogin, setAddr, setIsLogin } = React.useContext(GlobalContext);
    const { cartCount, cartCountNumber } = React.useContext(CartContext);
    const { confirmModalOpen } = React.useContext(ConfirmContext);


    const navigate = useNavigate();
    const location = useLocation();

    // console.log( navigate('경로', '옵션') );
    // console.log( location.pathname );

    const [state, setState] = React.useState({
        isFixed: false,
        isSub1: false,
        isSub2: false
    });

    // 고객센터 서브메뉴(툴팁메뉴) 마우스 엔터 이벤트
    const onMouseEnterSub1 = (e) => {
        e.preventDefault();
        setState({
            ...state,
            isSub1: true
        })
    }

    // 고객센터 서브1 메뉴를 마우스가 떠나면
    const onMouseLeaveSub1 = (e) => {
        e.preventDefault();
        setState({
            ...state,
            isSub1: false
        })
    }

    // 배송지 등록 서브2 메뉴를 마우스 오버 이벤트
    // isSub2 : false  조건부 연산자 이용 show & hide 구현
    const onMouseOverSub2 = (e) => {
        e.preventDefault();
        setState({
            ...state,
            isSub2: true
        })
    }


    // 배송지 등록 서브2 메뉴를 마우스 아웃 이벤트
    const onMouseOutSub2 = (e) => {
        e.preventDefault();
        setState({
            ...state,
            isSub2: false
        })
    }



    React.useEffect(() => {
        const row3Top = document.querySelector('#header .row3').offsetTop;

        window.addEventListener('scroll', function () {
            let isFixed = false;
            if (window.scrollY >= row3Top) {
                isFixed = true;
            }
            else {
                isFixed = false;
            }
            setState({
                ...state,
                isFixed: isFixed
            });
        })

    }, []);


    // 메인메뉴 클릭 이벤트
    const onClickLinkMain = (e) => {
        e.preventDefault();
        setIsIntroFn(true);
    }

    // 서브메뉴 클릭 이벤트
    const onClickLinkSub = (e) => {
        e.preventDefault();
        setIsIntroFn(false);
    }

    // 화면 새로 고침시 카운트 동작
    React.useEffect(() => {
        if (isLogin === true) {
            const url = '/getcart';

            const data = JSON.stringify({
                userId: signin.user_id
            });

            httpPostRequest(url, data)
                .then(data => {
                    console.log(data);
                    if (data !== null) {
                        cartCountNumber(data.length);
                    }
                    if (data.response && data.response.data) {
                        const result = data.response.data.result;
                        if (result === "fail") {
                            console.log("장바구니 가져오기 오류");
                        }
                    }
                }).catch(error => {
                    console.log(error);
                });

        } else {
            cartCountNumber(0);
            if (localStorage.getItem('KURLY_CART_PRODUCT') !== null) {
                let arr = JSON.parse(localStorage.getItem('KURLY_CART_PRODUCT'));
                cartCountNumber(arr.length);
            }
        }
    }, [isLogin, cartCount]);

    const onClickSignOut = (e) => {
        e.preventDefault();
        localStorage.removeItem(process.env.REACT_APP_USER_LOGIN_KEY); // 로그인 정보 모두 삭제
        setSigin({
            ...signin,
            user_id: '',
            expires: 0
        })
        setIsLogin(false);

        confirmModalOpen('로그아웃 되었습니다.');
        setTimeout(function () {
            location.pathname = '/main';
        }, 1000);

    }


    return (
        <>
            <header id='header'>
                <div className="container">
                    <div className="gap">
                        <div className="content">
                            <div className="row1">
                                <div className="container">
                                    <ul>
                                        <li><Link to="/signup" className={location.pathname === '/signup' ? 'on' : ''} title='회원가입'>회원가입</Link></li>
                                        <li><i>|</i></li>
                                        <li>
                                            {
                                                signin.user_id === '' || signin.user_id === undefined ?
                                                    (<Link to="/signin" className={location.pathname === '/signup' ? 'on' : ''} title='로그인'>로그인</Link>)
                                                    :
                                                    (<button onClick={onClickSignOut} title='로그아웃'>로그아웃</button>)
                                            }
                                        </li>
                                        <li><i>|</i></li>
                                        <li>
                                            <Link onMouseOver={onMouseEnterSub1} to="/notice" title='고객센터'>고객센터 <img src={process.env.PUBLIC_URL + "/images/sign_up/ico_down_16x10.png"} alt="" /></Link>
                                            {
                                                state.isSub1 && (
                                                    <div className="sub" onMouseLeave={onMouseLeaveSub1}>
                                                        <ul>
                                                            <li><Link to="/notice">공지사항</Link></li>
                                                            <li><Link to="/bbs1">자주하는 질문</Link></li>
                                                            <li><Link to="/bbs2">1:1문의</Link></li>
                                                            <li><Link to="/bbs3">대량주문 문의</Link></li>
                                                        </ul>
                                                    </div>
                                                )
                                            }
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={`row2${state.isFixed ? ' on' : ''}`}>
                                <div className="container">
                                    <div className="left">
                                        <h1>
                                            <img src={process.env.PUBLIC_URL + "/images/sign_up/logo.svg"} alt="" />
                                            <span onClick={onClickLinkMain}><Link to="/main">마켓컬리</Link></span>
                                            <span><i>|</i></span>
                                            <span><a href="/뷰티컬리">뷰티컬리</a></span>
                                        </h1>
                                    </div>
                                    <div className="center">
                                        <div>
                                            <input type="text" name='' id='' placeholder='검색어를 입력해 주세요' />
                                            <a href='!#'><img src={process.env.PUBLIC_URL + "/images/sign_up/search.svg"} alt="" /></a>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <span onMouseLeave={onMouseOutSub2} >
                                            <a onMouseOver={onMouseOverSub2} href="!#"><img src={process.env.PUBLIC_URL + "/images/sign_up/map.svg"} alt="" /></a>
                                            {/* 배송지 등록 */}

                                            {
                                                state.isSub2 && (
                                                    <div className="sub2">
                                                        <ul>
                                                            <li>
                                                                {
                                                                    addr.isAddr === true ?
                                                                        (
                                                                            <>
                                                                                <h2 className='map-address'>{`${addr.주소1} ${addr.주소2}`}</h2>
                                                                                <p>샛별배송</p>
                                                                            </>
                                                                        )
                                                                        :
                                                                        (

                                                                            <>
                                                                                <span>배송지를 등록</span>하고<br />
                                                                                구매 가능한 상품을 확인하세요!
                                                                            </>
                                                                        )
                                                                }

                                                            </li>
                                                            <li>
                                                                {
                                                                    addr.isAddr === true ?
                                                                        (

                                                                            <button onClick={() => openPopupDaumPostApi()} className='map-repace-btn'>배송지변경</button>

                                                                        )
                                                                        :
                                                                        (
                                                                            <>
                                                                                <button>로그인</button>
                                                                                <button onClick={() => openPopupDaumPostApi()}>
                                                                                    <img src={process.env.PUBLIC_URL + "/images/sign_up/ico_search.svg"} alt="" />
                                                                                    주소검색
                                                                                </button>
                                                                            </>
                                                                        )
                                                                }
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )
                                            }

                                        </span>
                                        <span><a href="!#"><img src={process.env.PUBLIC_URL + "/images/sign_up/heart.svg"} alt="" /></a></span>
                                        <span><Link to="/cart"><img src={process.env.PUBLIC_URL + "/images/sign_up/cart.svg"} alt="" /><em><i>{cartCount}</i></em></Link></span>
                                    </div>
                                </div>
                            </div>
                            <nav id='nav' className={`row3${state.isFixed ? ' on' : ''}`}>
                                <div className="container">
                                    <div className="left">
                                        <a href="!#"><img src={process.env.PUBLIC_URL + "/images/sign_up/nav_bar.svg"} alt="" /><span>카테고리</span></a>
                                    </div>
                                    <div className="center">
                                        <ul>
                                            <li onClick={onClickLinkSub}><Link to='/sub1' className={location.pathname === '/sub1' ? 'on' : ''}>신상품</Link></li>
                                            <li onClick={onClickLinkSub}><Link to='/sub2' className={location.pathname === '/sub2' ? 'on' : ''}>베스트</Link></li>
                                            <li onClick={onClickLinkSub}><Link to='/sub3' className={location.pathname === '/sub3' ? 'on' : ''}>알뜰상품</Link></li>
                                            <li onClick={onClickLinkSub}><Link to='/sub4' className={location.pathname === '/sub4' ? 'on' : ''}>특가혜택</Link></li>
                                        </ul>
                                    </div>
                                    <div className="right">
                                        <a href="!#">샛별・택배<span>배송안내</span></a>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    );
};
