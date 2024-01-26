import React from 'react';
import '../../../scss/product.scss';
import { CartContext } from '../../../context/CartContext';
import { GlobalContext } from '../../../context/GlobalContext';
import { httpPostRequest } from '../../../lib/productApi';


export default function DetailProductComponent() {

    const { cartCountNumber } = React.useContext(CartContext);
    const { CARTPRODUCTKEY, VIEWPRODUCTKEY, isLogin, signin } = React.useContext(GlobalContext);

    const [cnt, setCnt] = React.useState(1);
    const [state, setState] = React.useState({
        상품: {},
    });
    const [isCart, setIsCart] = React.useState(false);
    const [isCartOk, setIsCartOk] = React.useState(false);

    const { 상품 } = state; // 비구조화

    // React.useEffect(() => {
    //     setState({
    //         ...state,
    //         상품: {
    //             ...state.상품,
    //             수량: cnt,
    //             총상품금액: Math.round(cnt * (상품.정가 * (1 - (상품.할인율 / 100))))
    //         }
    //     })
    // }, [cnt]);

    // 개수 증가 함수
    const onClickAdd = (e) => {
        e.preventDefault();
        setCnt(cnt + 1);
        setIsCart(true);
    }
    // 개수 감소 함수
    const onClickSub = (e) => {
        e.preventDefault();
        if (cnt <= 1) return;
        setCnt(cnt - 1);
        setIsCart(true);
    }

    React.useEffect(() => {
        // 최근 본 상품정보 가져오기
        if (localStorage.getItem(VIEWPRODUCTKEY) !== null) {
            let result = JSON.parse(localStorage.getItem(VIEWPRODUCTKEY));
            setState({
                ...state,
                상품: result[0] // 스택 LIFO
            })
        }
    }, []);


    // 장바구니 클릭 이벤트 : 장바구니에 담기(Cart Save)
    const onClickCart = (e) => {
        e.preventDefault();
        if (isLogin === true) {
            const url = '/cart';

            const data = JSON.stringify({
                userId: signin.user_id,
                quantity: cnt,
                productCode: 상품.productCode
            });

            httpPostRequest(url, data)
                .then(data => {
                    if (data.result === "success") {
                        if (isCart === false) {
                            setState({
                                ...state,
                                상품: {
                                    ...state.상품,
                                    productQuantity: 1,
                                    총상품금액: Math.round(1 * (상품.productPrice * (1 - (상품.productDiscount / 100))))
                                }
                            })
                        }
                    }

                    if (data.response && data.response.data) {
                        const result = data.response.data.result;
                        if (result === "fail") {
                            console.log("장바구니 저장 실패");
                        }
                    }
                }).catch(error => {
                    console.log(error);
                });
        } else if (isLogin === false) {
            if (isCart === false) {
                setState({
                    ...state,
                    상품: {
                        ...state.상품,
                        productQuantity: 1,
                        총상품금액: Math.round(1 * (상품.productPrice * (1 - (상품.productDiscount / 100))))
                    }
                })
            } else {
                setState({
                    ...state,
                    상품: {
                        ...state.상품,
                        productQuantity: cnt,
                        총상품금액: Math.round(1 * (상품.productPrice * (1 - (상품.productDiscount / 100))))
                    }
                })
            }
        }
        setIsCart(false);
        setIsCartOk(true); // 장바구니 버튼 클릭 했다.

    }


    // 상품 수량이 증가하지 않은 상태에서
    // 장바구니 클릭시 수량이 장바구니에 적용이 안된다.
    // 그래서 훅을 사용한다.
    React.useEffect(() => {
        let arr = [];
        if (isCartOk === true) {  //장바구니를 클릭하면 실행
            // 1. 저장소(장바구니)가 비어 있으면 배열을 생성하여 저장소에 저장
            if (localStorage.getItem(CARTPRODUCTKEY) === null) {
                arr = [상품]
            }
            // 2. 저장소(장바구니)가 비어 있지 않으면 기존 배열에 1행 상품목록을 추가한다.
            else {
                arr = JSON.parse(localStorage.getItem(CARTPRODUCTKEY));

                //4. 중복데이터 비교하고 수량, 상품금액 합산
                // - 중복데이터 확인
                const result = arr.map((item) => item.productCode === 상품.productCode ? true : false);
                arr.map((item) => item.productCode === 상품.productCode ? { ...item, productQuantity: item.productQuantity += 상품.productQuantity, 총상품금액: item.총상품금액 += 상품.총상품금액 } : item);
                if (result.includes(true) !== true) {
                    arr = [상품, ...arr]
                }
            }
            // 3. 장바구니에 저장
            localStorage.setItem(CARTPRODUCTKEY, JSON.stringify(arr));
            setIsCartOk(false);  // 다음에 다시 클릭할 경우 초기화  버튼 클릭 안한 상태로 다시 유지
            // 여기에서 최상위 컴포넌트에게 수량을 전달한다.
            // 그럼 최상위 컴포넌트는 헤더컴포넌트에게 프롭스로 전달한다.
            cartCountNumber(arr.length);
            setCnt(1);
        }
    }, [isCartOk])


    // 화면 새로 고침시 카운트 동작
    React.useEffect(() => {
        if (localStorage.getItem(CARTPRODUCTKEY) !== null) {
            let arr = JSON.parse(localStorage.getItem(CARTPRODUCTKEY));
            cartCountNumber(arr.length);
        }
    }, []);


    return (
        <div id='product'>
            <div className="container">
                <section id="section1">
                    <div className="content">
                        <div className="left">
                            <div className="img-box">
                                <img src={`/images/kurly_product/${상품.productThumbnailImage}`} alt="" />
                            </div>
                        </div>
                        <div className="right">
                            <div className="top">
                                <ul>
                                    <li><h4>{상품.배송구분}</h4></li>
                                    <li><h2>{`[${상품.productDistributor}]${상품.productName}`}</h2></li>
                                    <li><p>{상품.productDescription}</p></li>
                                    <li>
                                        {
                                            상품.productDiscount > 0 ? <span>{Math.round(상품.productDiscount)}%&nbsp;&nbsp;&nbsp;</span> : <></>
                                        }<strong>{Math.round(상품.productPrice * (1 - (상품.productDiscount / 100))).toLocaleString('ko-KR')}원</strong></li>
                                    <li>{상품.productDiscount === 0 ? <></> : <em>{상품.productPrice}원</em>}</li>
                                    <li><h5>로그인 후, 할인 및 적립 혜택 이 제공됩니다.</h5></li>
                                    <li><a href="!#">컬리카드 - 최대 <strong>472원</strong> 적립 + 첫 결제 3만원 할인</a></li>
                                </ul>
                            </div>
                            <div className="middle">
                                <ul>
                                    <li>
                                        <div className="col1">
                                            배송
                                        </div>
                                        <div className="col2">
                                            <strong>{상품.배송구분}</strong><br />
                                            23시 전 주문 시 내일 아침 7시 전 도착(대구·부산·울산 샛별배송 운영시간 별도 확인)
                                        </div>
                                    </li>
                                    <li>
                                        <div className="col1">
                                            판매자
                                        </div>
                                        <div className="col2">
                                            {상품.productDistributor}
                                        </div>
                                    </li>
                                    <li>
                                        <div className="col1">
                                            포장타입
                                        </div>
                                        <div className="col2">
                                            1통
                                        </div>
                                    </li>
                                    <li>
                                        <div className="col1">
                                            판매단위
                                        </div>
                                        <div className="col2">
                                            368g 내외
                                        </div>

                                    </li>
                                    <li>
                                        <div className="col1">
                                            <strong>원산지</strong>
                                        </div>
                                        <div className="col2">
                                            <strong>상품설명/상세정보 참조</strong>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="col1">
                                            알레르기정보
                                        </div>
                                        <div className="col2">
                                            -
                                        </div>
                                    </li>
                                    <li>
                                        <div className="col1">
                                            유통기한(또는 소비기한)정보
                                        </div>
                                        <div className="col2">
                                            수령일 포함 최소 125일 남은 제품을 보내드립니다.
                                        </div>
                                    </li>
                                    <li>
                                        <div className="col1">
                                            상품선택
                                        </div>
                                        <div className="col2">
                                            {상품.productName}<br />
                                            적립제외상품
                                        </div>
                                    </li>
                                    <li>
                                        <div className="col1">
                                            &nbsp;
                                        </div>
                                        <div className="col2">
                                            <div className="count-number-price">
                                                <div className="col2-left">
                                                    <button onClick={onClickSub}>-</button>
                                                    <span>{cnt}</span>
                                                    <button onClick={onClickAdd}>+</button>
                                                </div>
                                                <div className="col2-right">
                                                    <em>{상품.productDiscount === 0 ? ("") : (상품.productPrice * 1).toLocaleString('ko-KR') + "원"}</em>
                                                    <strong>{Math.round(상품.productPrice * (1 - (상품.productDiscount / 100))).toLocaleString('ko-KR')}원</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="bottom">
                                <div className="total-calc">
                                    <h2>총 상품금액 : <strong>{Math.round(cnt * (상품.productPrice * (1 - (상품.productDiscount / 100)))).toLocaleString('ko-KR')}</strong><em>원</em></h2>
                                    <p><em>적립</em> 로그인 후, 할인 및 적립 혜택 제공</p>
                                </div>
                                <div className="cart-btn-box">
                                    <button><img src={process.env.PUBLIC_URL + `/images/product/icon_heart.svg`} alt="" /></button>
                                    <button><img src={process.env.PUBLIC_URL + `/images/product/icon_ball.svg`} alt="" /></button>
                                    <button onClick={onClickCart}>장바구니담기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="section2">
                    <div className="content">

                    </div>
                </section>
                <section id="section3">
                    <div className="content">

                    </div>
                </section>
                <section id="section4">
                    <div className="content">

                    </div>
                </section>
                <section id="section5">
                    <div className="content">

                    </div>
                </section>
                <section id="section6">
                    <div className="content">

                    </div>
                </section>
                <section id="section7">
                    <div className="content">

                    </div>
                </section>
                <section id="section8">
                    <div className="content">

                    </div>
                </section>
                <section id="section9">
                    <div className="content">

                    </div>
                </section>
                <section id="section10">
                    <div className="content">

                    </div>
                </section>
                <section id="section11">
                    <div className="content">

                    </div>
                </section>
                <section id="section12">
                    <div className="content">

                    </div>
                </section>
                <section id="section13">
                    <div className="content">

                    </div>
                </section>
            </div>
        </div>
    );
};
