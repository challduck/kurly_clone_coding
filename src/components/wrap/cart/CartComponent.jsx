import React from 'react';
import '../../../scss/cart.scss';
import '../../../scss/confirm_modal.scss';
// 사용자 컨텍스트
import { GlobalContext } from '../../../context/GlobalContext';
import { httpDeleteRequest, httpPostRequest } from '../../../lib/productApi';


export default function CartComponent({ confirmModalOpen }) {

    const { getCartCount, CARTPRODUCTKEY, VIEWPRODUCTKEY, openPopupDaumPostApi, addr, isLogin, signin } = React.useContext(GlobalContext);

    const [isDelete, setIsDelete] = React.useState(false);  // 로그인상태 true, 로그인안한상태 false
    const [delCode, setDelCode] = React.useState('');  // 로그인상태 true, 로그인안한상태 false
    const [isConfirm, setIsConfirm] = React.useState(false);  // 로그인상태 true, 로그인안한상태 false
    const [isButtonSUB, setIsButtonSUB] = React.useState(false);  // 로그인상태 true, 로그인안한상태 false
    const [cart, setCart] = React.useState([]);
    const [arr1, setArr1] = React.useState([]);
    const [arr2, setArr2] = React.useState([]);
    const [arr3, setArr3] = React.useState([]);


    // const [isCheckAll, setIsCheckAll] = React.useState(false); // 모두선택 부울 변수
    const [isSelectDel, setIsSelectDel] = React.useState(false); // 선택삭제 부울 변수

    // 모두선택 배열 => 장바구니에 들어온 모든 리스트 목록 저장 
    const [checkAll, setCheckAll] = React.useState([]);
    const [check, setCheck] = React.useState([]);

    // 장바구니 목록 리스트 아코디언 효과
    const ddRef = React.useRef([]);
    const [isUp, setIsUp] = React.useState([true, true, true]);

    const [isItemDel, setIsItemDel] = React.useState(false);

    // React.useEffect(() => {
    //     setIsCheckAll(true);
    //     setCheck(checkAll);  // 제품코드 모두 저장
    // }, [checkAll]);

    const onClickSlideUpDown = (e, n) => {
        e.preventDefault();
        if (isUp[n] === true) {
            ddRef.current[n].style.height = '60px';
            isUp[n] = false;
        }
        else {
            ddRef.current[n].style.height = 'auto';
            isUp[n] = true;
        }
        setIsUp([...isUp]);
    }

    // 체크박스 이벤트 구현
    // 선택 삭제 클릭하면 삭제 모달창 띄운다
    // 그러면 취소 확인버튼 중 확인버튼
    // 클릭하면 삭제된다.
    const onClickSelectDelete = (e) => {
        e.preventDefault();
        setIsConfirm(true);
    }
    // 체크 올 버튼
    // const onClickCheckAll = (e) => {
    //     e.preventDefault();
    //     if (isCheckAll === false) { // 모두 체크 선택
    //         setIsCheckAll(true);
    //         setCheck(checkAll);  // 제품코드 모두 저장
    //     }
    //     else {  // 모두 체크 선택해체
    //         setIsCheckAll(false);
    //         setCheck([]);  // 제품코드 모두 삭제
    //     }
    // }
    // 개별 체크 체크박스
    const onChangeCheck = (e) => {
        let imsi = [];
        if (e.target.checked === true) {
            setCheck([...check, e.target.value]);
        }
        else if (e.target.checked === false) {    // 선택취소 삭제                          
            imsi = check.filter((item) => item !== e.target.value); // 제품코드 값만 들어있다.
            setCheck(imsi);
        }
    }
    // React.useEffect(() => {
    //     // 전체 선택 체크 
    //     if (check.length === cart.length) {
    //         setIsCheckAll(true);
    //     }
    //     else {
    //         setIsCheckAll(false);
    //     }

    //     // 선택삭제 버튼 true, false
    //     if (check.length > 0) {
    //         setIsSelectDel(true);
    //     }
    //     else {
    //         setIsSelectDel(false);
    //     }
    // }, [cart.length, check]);

    // 장바구니의 오측 금액 표기 집계표(피벗테이블) 상태변수
    const [state, setState] = React.useState({
        총상품금액: 0,    //  누계금액
        상품할인상품할인금액: 0, // 누계금액
        배송비: 0,      // 결정금액 
        결재예정금액: 0  // 결정금액
    });

    const { 총상품금액, 상품할인금액, 배송비, 결재예정금액 } = state;

    const onClickSUB = (e, record) => {
        e.preventDefault();
        console.log(record);
        if (record.productQuantity === 1) return;
        if (isLogin) {
            const url = '/decrement';

            const data = JSON.stringify({
                userId: signin.user_id,
                productId: record.productId,
            });

            httpPostRequest(url, data)
                .then(data => {
                    console.log(data);
                    if (data !== null && data.result === "success") {
                        initMethod();
                    }
                    if (data.response && data.response.data) {
                        const result = data.response.data.result;
                        if (result === "fail") {
                            console.log("상품감소 실패");
                        }
                    }
                }).catch(error => {
                    console.log(error);
                });

        } else {
            const result = cart.map((item) => {
                return (
                    item.productCode === record.productCode ? ({ ...item, productQuantity: (item.productQuantity >= 2 ? item.productQuantity - 1 : 1) }) : ({ ...item })
                )
            });
            console.log(result);
            setCart(result);
            localStorage.setItem(CARTPRODUCTKEY, JSON.stringify(result));
        }
    }


    // 수량 증가 카운트 => 1행 데이터 레코드(record)
    const onClickADD = (e, record) => {
        e.preventDefault();
        if (isLogin) {
            const url = '/increment';

            const data = JSON.stringify({
                userId: signin.user_id,
                productId: record.productId,
            });
            httpPostRequest(url, data)
                .then(data => {
                    console.log(data);
                    if (data !== null && data.result === "success") {
                        initMethod();
                    }
                    if (data.response && data.response.data) {
                        const result = data.response.data.result;
                        if (result === "fail") {
                            console.log("상품증가 실패");
                        }
                    }
                }).catch(error => {
                    console.log(error);
                });

        } else {
            const result = cart.map((item) => {
                return (
                    item.productCode === record.productCode ? ({ ...item, productQuantity: (item.productQuantity + 1) }) : ({ ...item })
                )
            });
            console.log(result);
            // 리턴받는 결과 데이터를 cart 배열에 저장한다.
            setCart(result);
            // 리턴받는 결과 데이터를 로컬스토레이지에 저장한다.
            localStorage.setItem(CARTPRODUCTKEY, JSON.stringify(result));
        }
    }


    // 장바구니 제품삭제
    const onClickDel = (e, record) => {
        e.preventDefault();
        setIsDelete(true);
        setDelCode(record.productCode);  // 삭제 상태관리변수
    }

    React.useEffect(() => {
        isDelete && setIsConfirm(true); // 모달창 취소 & 확인버튼
    }, [delCode, isDelete]); // 삭제 상태관리변수가 변경되면 모달창 띄운다


    // 삭제 모달창 취소 & 확인 번튼 클릭이벤트 구현
    const onClickConfirmModalClose = (e, value) => {
        e.preventDefault();
        let result = '';
        if (isLogin) {
            if (value === '확인') {
                const url = '/cartdelete';
                const data = JSON.stringify({
                    userId: signin.user_id,
                    productCode: delCode,
                });
                console.log(data);
                httpPostRequest(url, data)
                    .then(data => {
                        console.log(data);
                        if (data !== null && data.result === "success") {
                            initMethod();
                        }
                        if (data.response && data.response.data) {
                            const result = data.response.data.result;
                            if (result === "fail") {
                                console.log("상품삭제 실패");
                            }
                        }
                    }).catch(error => {
                        console.log(error);
                    });
            }

        } else {
            if (value === '확인') {
                // check['a', 'c']   cart['a','b','c','d','e'] => 결과 cart['b','d','e'];
                if (isSelectDel === true) { // 선택삭제 : 선택삭제목록을 제외한 내용 재편집
                    result = cart.filter((item) => !check.includes(item.productCode))
                }
                else {  // 목록 개별삭제
                    result = cart.filter((item) => item.productCode !== delCode)
                }

                // 선택삭제후 배열 비운다.        
                setCheck([]);     //삭제내용
                setCart(result);
                localStorage.setItem(CARTPRODUCTKEY, JSON.stringify(result));
                // 초기 init
                initMethod();
            }
        }
        getCartCount();
        setDelCode('');         // 제품코드 상태변수삭제
        setIsConfirm(false);    // 초기화
        setIsDelete(false);     // 초기화
        setIsItemDel(false);

    }

    //1. 냉장
    const res1 = cart.map((item, idx) => {
        if (item.productStorage === '냉장') {
            return (
                <dd key={idx}>
                    <ul>
                        <li>
                            <input onChange={onChangeCheck} checked={check.includes(item.productCode)} type="checkbox" name='chk' id='chk1' value={item.productCode} />
                        </li>
                        <li>
                            <span className='cart-small-bgimg '><img src={`/images/kurly_product/${item.productThumbnailImage}`} alt=''></img></span>
                        </li>
                        <li>
                            <a href="!#">{`[${item.productDistributor}] ${item.productName}`}</a>
                        </li>
                        <li>
                            <div>
                                <button onClick={(e) => onClickSUB(e, item)} className={`sub-bgimg-btn blind${item.productQuantity === 1 ? ' on' : ''}`}>빼기</button>
                                <strong>{item.productQuantity}</strong>
                                <button onClick={(e) => onClickADD(e, item)} className='add-bgimg-btn blind'>더하기</button>
                            </div>
                        </li>
                        <li>
                            <span>{Math.round((item.productPrice * (1 - (Number.parseInt(item.productDiscount) / 100))) * item.productQuantity)}원</span>
                        </li>
                        <li>
                            <a onClick={(e) => onClickDel(e, item)} href="!#" className='del-bgimg-btn blind'>삭제버튼</a>
                        </li>
                    </ul>
                </dd>
            )
        }
    })


    //2. 냉동
    const res2 = cart.map((item, idx) => {
        if (item.productStorage === '냉동') {
            return (
                <dd key={idx}>
                    <ul>
                        <li>
                            <input onChange={onChangeCheck} checked={check.includes(item.productCode)} type="checkbox" name='chk' id='chk1' value={item.productCode} />
                        </li>
                        <li>
                            <span className='cart-small-bgimg '><img src={`/images/kurly_product/${item.productThumbnailImage}`} alt=''></img></span>
                        </li>
                        <li>
                            <a href="!#">{item.productName}</a>
                        </li>
                        <li>
                            <div>
                                <button onClick={(e) => onClickSUB(e, item)} className={`sub-bgimg-btn blind${item.productQuantity === 1 ? ' on' : ''}`}>빼기</button>
                                <strong>{item.productQuantity}</strong>
                                <button onClick={(e) => onClickADD(e, item)} className='add-bgimg-btn blind'>더하기</button>
                            </div>
                        </li>
                        <li>
                            <span>{Math.round((item.productPrice * (1 - (Number.parseInt(item.productDiscount) / 100))) * item.productQuantity)}원</span>
                        </li>
                        <li>
                            <a onClick={(e) => onClickDel(e, item)} href="!#" className='del-bgimg-btn blind'>삭제버튼</a>
                        </li>
                    </ul>
                </dd>
            )
        }
    })

    //3. 상온
    const res3 = cart.map((item, idx) => {
        if (item.productStorage === '상온') {
            return (

                <dd key={idx}>
                    <ul>
                        <li>
                            <input onChange={onChangeCheck} checked={check.includes(item.productCode)} type="checkbox" name='chk' id='chk1' value={item.productCode} />
                        </li>
                        <li>
                            <span className='cart-small-bgimg '><img src={`/images/kurly_product/${item.productThumbnailImage}`} alt=''></img></span>
                        </li>
                        <li>
                            <a href="!#">{item.productName}</a>
                        </li>
                        <li>
                            <div>
                                <button onClick={(e) => onClickSUB(e, item)} className={`sub-bgimg-btn blind${item.productQuantity === 1 ? ' on' : ''}`}>빼기</button>
                                <strong>{item.productQuantity}</strong>
                                <button onClick={(e) => onClickADD(e, item)} className='add-bgimg-btn blind'>더하기</button>
                            </div>
                        </li>
                        <li>
                            <span>{Math.round((item.productPrice * (1 - (Number.parseInt(item.productDiscount) / 100))) * item.productQuantity)}원</span>
                        </li>
                        <li>
                            <a onClick={(e) => onClickDel(e, item)} href="!#" className='del-bgimg-btn blind'>삭제버튼</a>
                        </li>
                    </ul>
                </dd>

            )
        }
    })


    // 장바구니(CART) 가져오기

    const initMethod = () => {
        if (isLogin) {
            const url = '/getcart';

            const data = JSON.stringify({
                userId: signin.user_id
            });

            httpPostRequest(url, data)
                .then(data => {
                    if (data !== null) {
                        data.sort((a, b) => {
                            if (a.productStorage > b.productStorage) return 1;
                            if (a.productStorage < b.productStorage) return -1;
                            if (a.productStorage === b.productStorage) return 0;
                        })

                        setCart(data);
                        setIsSelectDel(false);
                        let arr1 = [];
                        let arr2 = [];
                        let arr3 = [];

                        let imsi = [];
                        data.map((item, idx) => {

                            imsi = [...imsi, item.productCode]; // 제품코드

                            if (item.productStorage === '냉장') {
                                arr1 = [...arr1, item];
                            }
                            else if (item.productStorage === '냉동') {
                                arr2 = [...arr2, item];
                            }
                            else if (item.productStorage === '상온') {
                                arr3 = [...arr3, item];
                            }
                        });

                        setCheckAll(imsi);

                        setArr1(arr1)
                        setArr2(arr2)
                        setArr3(arr3)
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
            if (localStorage.getItem(CARTPRODUCTKEY) !== null) {
                let result = JSON.parse(localStorage.getItem(CARTPRODUCTKEY));

                // 정렬 : 보관방법 오름차순 ASC
                result.sort((a, b) => {
                    if (a.productStorage > b.productStorage) return 1;
                    if (a.productStorage < b.productStorage) return -1;
                    if (a.productStorage === b.productStorage) return 0;
                });

                setCart(result);
                setIsSelectDel(false);
                let arr1 = [];
                let arr2 = [];
                let arr3 = [];


                // console.log( result );
                // 임시 배열변수에 제품코드 저장
                let imsi = [];
                result.map((item, idx) => {

                    imsi = [...imsi, item.productCode]; // 제품코드

                    if (item.productStorage === '냉장') {
                        arr1 = [...arr1, item];
                    }
                    else if (item.productStorage === '냉동') {
                        arr2 = [...arr2, item];
                    }
                    else if (item.productStorage === '상온') {
                        arr3 = [...arr3, item];
                    }
                });

                // 장바구니에 있는 모든 리스트 목록 저장 
                // 임시배열변수에 저장된 배열값을 모두 checkAll[] 저장한다.
                setCheckAll(imsi);

                setArr1(arr1)
                setArr2(arr2)
                setArr3(arr3)
            }
        }
    }

    React.useEffect(() => {
        initMethod();
    }, []);



    // 카트가 들어오면 계산
    React.useEffect(() => {
        let totalPrice = 0;
        let productDiscount = 0;
        let shippingPrice = 0;
        let paymentPrice = 0;

        cart.map((item, idx) => {
            if (item.productQuantity !== undefined && item.productPrice !== undefined) {
                totalPrice += item.productPrice * item.productQuantity;
                productDiscount += Math.round(item.productPrice * (Number.parseFloat(item.productDiscount) / 100) * item.productQuantity);
                shippingPrice = ((totalPrice - productDiscount) < 40000 ? 3000 : 0);
                paymentPrice = isLogin === true ? ((totalPrice - productDiscount) + shippingPrice) : (totalPrice + shippingPrice)
            }
        });
        setState({
            총상품금액: totalPrice,
            상품할인금액: productDiscount,
            배송비: shippingPrice,
            결재예정금액: paymentPrice
        })
    }, [cart]);

    return (
        <>
            <div id='cart'>
                <div className="container">
                    <div className="gap">
                        <div className="title">
                            <h1>장바구니</h1>
                        </div>
                        <div className="content">
                            <div className="left">
                                <ul>
                                    <li>
                                        <span>
                                            {/* <button onClick={onClickCheckAll} className={`select-all-btn${isCheckAll ? ' on' : ''}`}>
                                                전체선택
                                                <strong>
                                                    (
                                                    <em className='select-count'>{check.length}</em>
                                                    <i>/</i>
                                                    <em className='cart-tot'>{cart.length}</em>
                                                    )
                                                </strong>
                                            </button>
                                            <i>|</i>
                                            <button onClick={onClickSelectDelete} disabled={!isSelectDel} className={`delete-btn${isSelectDel ? ' on' : ''}`}>
                                                선택삭제
                                            </button> */}
                                        </span>

                                    </li>


                                    <li>  {/*  중간 장바구니 리스트 */}
                                        {
                                            cart.length === 0 ?
                                                (
                                                    <p className='empty-box'>장바구니에 담긴 상품이 없습니다</p>
                                                )
                                                :
                                                (
                                                    <>
                                                        {
                                                            arr1.length >= 1 && (  // 냉장
                                                                <div className='acodian' ref={(el) => (ddRef.current[0] = el)}>
                                                                    <dl>
                                                                        <dt>
                                                                            <div><img src={process.env.PUBLIC_URL + "/images/cart/icon_01.svg"} alt="" /><h3>냉장 상품</h3></div>
                                                                            <div><button onClick={(e) => onClickSlideUpDown(e, 0)}><img className={isUp[0] ? '' : 'on'} src={"/images/cart/icon_arrow_up.svg"} alt="" /></button></div>
                                                                        </dt>
                                                                        {res1}
                                                                    </dl>
                                                                </div>
                                                            )
                                                        }

                                                        {
                                                            arr2.length >= 1 && (  // 냉동
                                                                <div className='acodian' ref={(el) => (ddRef.current[1] = el)}>
                                                                    <dl>
                                                                        <dt>
                                                                            <div><img src={process.env.PUBLIC_URL + "/images/cart/icon_02.svg"} alt="" /><h3>냉동 상품</h3></div>
                                                                            <div><button onClick={(e) => onClickSlideUpDown(e, 1)}><img className={isUp[1] ? '' : 'on'} src={"/images/cart/icon_arrow_up.svg"} alt="" /></button></div>
                                                                        </dt>
                                                                        {res2}
                                                                    </dl>
                                                                </div>
                                                            )
                                                        }

                                                        {
                                                            arr3.length >= 1 && (  // 상온
                                                                <div className='acodian' ref={(el) => (ddRef.current[2] = el)}>
                                                                    <dl>
                                                                        <dt>
                                                                            <div><img src={process.env.PUBLIC_URL + "/images/cart/icon_03.svg"} alt="" /><h3>상온 상품</h3></div>
                                                                            <div><button onClick={(e) => onClickSlideUpDown(e, 2)}><img className={isUp[2] ? '' : 'on'} src={"/images/cart/icon_arrow_up.svg"} alt="" /></button></div>
                                                                        </dt>
                                                                        {res3}
                                                                    </dl>
                                                                </div>
                                                            )
                                                        }
                                                    </>
                                                )
                                        }
                                    </li>

                                    <li>
                                        <span>
                                            {/* <button onClick={onClickCheckAll} className={`select-all-btn${isCheckAll ? ' on' : ''}`}>
                                                전체선택
                                                <strong>
                                                    (
                                                    <em className='select-count'>{check.length}</em>
                                                    <i>/</i>
                                                    <em className='cart-tot'>{cart.length}</em>
                                                    )
                                                </strong>
                                            </button>
                                            <i>|</i>
                                            <button onClick={onClickSelectDelete} disabled={!isSelectDel} className={`delete-btn${isSelectDel ? ' on' : ''}`}>
                                                선택삭제
                                            </button> */}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="right">
                                <ul>
                                    <li>
                                        <h3>
                                            <img src={process.env.PUBLIC_URL + "/images/cart/icon_94.svg"} alt="" />
                                            배송지
                                        </h3>
                                        <p>
                                            {
                                                addr.isAddr === true ?
                                                    (
                                                        `${addr.주소1} ${addr.주소2}`

                                                    )
                                                    :
                                                    (
                                                        <>
                                                            <em>배송지를 등록</em> 하고<br />
                                                            구매 가능한 상품을 확인하세요!
                                                        </>
                                                    )
                                            }
                                        </p>
                                        <button onClick={() => openPopupDaumPostApi()}>
                                            {
                                                addr.isAddr === true ?
                                                    (

                                                        <>배송지변경</>

                                                    )
                                                    :
                                                    (
                                                        <><img src={process.env.PUBLIC_URL + "/images/cart/icon_zoom.svg"} alt="" />주소 검색</>
                                                    )
                                            }
                                        </button>
                                    </li>
                                    <li>
                                        <div>
                                            <div className="row1">
                                                <p><strong>상품금액</strong><strong>{총상품금액.toLocaleString('ko-KR')}원</strong></p>
                                                <p>
                                                    {/* <strong>상품할인금액</strong><strong>{isLogin === true ? (상품할인금액 > 0 ? `-${상품할인금액.toLocaleString('ko-KR')}` : 0) : 0}원</strong> */}
                                                    <strong>상품할인금액</strong><strong>{(상품할인금액 > 0 ? `-${상품할인금액.toLocaleString('ko-KR')}` : 0)}원</strong>
                                                    {isLogin === true ? '' : <span>로그인 후 할인 금액 적용</span>}
                                                </p>
                                                <p><strong>배송비</strong><strong>{배송비 > 0 ? `+${배송비.toLocaleString('ko-KR')}` : 0}원</strong></p>
                                                {총상품금액 < 40000 && <p>{(40000 - (총상품금액 - 상품할인금액)).toLocaleString('ko-KR')}원 추가주문 시, <em>무료배송</em></p>}
                                            </div>
                                            <div className="row2">
                                                <p><strong>결제예정금액</strong><strong>{(결재예정금액).toLocaleString('ko-KR')}원</strong></p>
                                                <p><strong><em>적립</em>로그인 후 회원 등급에 따라 적립</strong></p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <button>배송지를 입력해주세요</button>
                                        <p>
                                            [주문완료] 상태일 경우에만 주문 취소 가능합니다.<br />
                                            [마이컬리 &gt; 주문내역 상세페이지] 에서 직접 취소하실 수 있습니다.
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                isConfirm && (
                    <div id="confirmModal2" className='confirm'>
                        <div className="wrap2">
                            <div className="container">
                                <div className="content">
                                    <div className="title-box">
                                        <h1>삭제하시겠습니까?</h1>
                                    </div>
                                    <div className="button-box">
                                        <button onClick={(e) => onClickConfirmModalClose(e, "취소")}>취소</button>
                                        <button onClick={(e) => onClickConfirmModalClose(e, "확인")}>확인</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};