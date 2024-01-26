import React from 'react';
import axios from 'axios';
import Sub1ComponentChild from './Sub1ComponentChild';
import '../../../../scss/sub1.scss';
import { httpGetRequest } from '../../../../lib/productApi';
import { GlobalContext } from '../../../../context/GlobalContext';

export default function Sub1Component({ setViewProduct, category }) {

    const { shuffleArray, productData } = React.useContext(GlobalContext);
    const [product, setProduct] = React.useState([]);

    React.useEffect(() => {
        const product = productData;
        shuffleArray(product);
        setProduct(product);
    }, [productData]);

    const [isClass, setIsClass] = React.useState([true, true, true, true, true]);
    const [subH, setSubH] = React.useState([0, 0, 0, 0, 0]); //서브메뉴 각각의 높이 배열
    const subRef = React.useRef([]);

    // 로딩시 서브메뉴의 높이를 설정
    React.useEffect(() => {
        subH.map((item, i) => {
            subH[i] = subRef.current[i].offsetHeight;  // 서브메뉴 각각의 높이 설정값
        })
    }, []);


    // 카테고리 버튼 클릭 이벤트 5개 아코디언 구현
    const onClickCategory = (e, n) => { //0 ~ 4
        e.preventDefault();
        if (isClass[n] === true) {
            isClass[n] = false;
            subRef.current[n].style.height = `0px`;
        }
        else {
            isClass[n] = true;
            subRef.current[n].style.height = `${subH[n]}px`;
        }
        setIsClass([...isClass]);
    }

    const onClickOrder = (e, value) => {
        e.preventDefault();
        if (value === '추천순') { // 추천순 오름차순
            setProduct([...product.sort((a, b) => (a.추천 < b.추천) ? (-1) : ((a.추천 > b.추천) ? (1) : (0)))])
        }
        else if (value === '신상품순') { // 제품코드
            setProduct([...product.sort((a, b) => (a.productCode < b.productCode) ? (-1) : ((a.productCode > b.productCode) ? (1) : (0)))])
        }
        else if (value === '판매처순') {
            setProduct([...product.sort((a, b) => (a.productDistributor < b.productDistributor) ? (-1) : ((a.productDistributor > b.productDistributor) ? (1) : (0)))])
        }
        else if (value === '혜택순') { // 할인율 높은거 내림차순(Descending): b.속성이름 - a.속성이름  / 오름차순(Ascending): a.속성이름 - b.속성이름
            setProduct([...product.sort((a, b) => b.productDiscount - a.productDiscount)])
        }
        else if (value === '낮은가격순') { // 정가의 오름차순(Ascending)
            setProduct([...product.sort((a, b) => a.productPrice - b.productPrice)])
        }
        else if (value === '높은가격순') {
            setProduct([...product.sort((a, b) => b.productPrice - a.productPrice)])
        }
    }

    const [arr, setArr] = React.useState({
        상품: []
    });

    // 필터링 
    const onChangeFilter = (e) => {

        if (e.target.checked === true) {
            setArr({
                상품: [...arr.상품, e.target.value]
            })
            console.log(e.target.value);
        }
        else {
            setArr({
                상품: arr.상품.filter((item) => item !== e.target.value)
            })
        }
    }



    return (
        <main id='sub1'>
            <section id='section1'>
                <div className="container">
                    <div className="gap">
                        <div className="content">
                            <a href="!#">
                                <img src={process.env.PUBLIC_URL + "/images/sub1/0HpXehniZlRXiBeSfEFpPK8rSl35tGLPMUOwNNWK.png"} alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section id='section2'>
                <div className="container">
                    <div className="gap">
                        <div className="title">
                            <h2>{category}</h2>
                        </div>
                        <div className="content">
                            <div className="left">
                                <div className="left-title">
                                    <strong>필터</strong>
                                    <span>
                                        <img src={""} alt="" />
                                        <em>초기화</em>
                                    </span>
                                </div>
                                <div className="left-content">
                                    <div>
                                        <a onClick={(e) => onClickCategory(e, 0)} href="!#" className={`category-btn category1${isClass[0] ? ' on' : ''}`}><span>카테고리</span><img src={process.env.PUBLIC_URL + "/images/sub1/icon_arrow_up.svg"} alt="" /></a>
                                        <div ref={(el) => (subRef.current[0] = el)} className="sub">
                                            <ul>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' onChange={onChangeFilter} value={'샐러드 간편식'} />
                                                        샐러드 간편식
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' onChange={onChangeFilter} value={'생수 음료 우유 커피'} />
                                                        생수 음료 우유 커피
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' onChange={onChangeFilter} value={'국 반찬 메인요리'} />
                                                        국 반찬 메인요리
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' onChange={onChangeFilter} value={'주방용품'} />
                                                        주방용품
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' onChange={onChangeFilter} value={'간식 과자 떡'} />
                                                        간식 과자 떡
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' onChange={onChangeFilter} value={'베이커리 치즈 델리'} />
                                                        베이커리 치즈 델리
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' onChange={onChangeFilter} value={'건강식품'} />
                                                        건강식품
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' onChange={onChangeFilter} value={'과일 견과 쌀'} />
                                                        과일 견과 쌀
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' onChange={onChangeFilter} value={'생활용품 리빙 캠핑'} />
                                                        생활용품 리빙 캠핑
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' onChange={onChangeFilter} value={'수산 해산 건어물'} />
                                                        수산 해산 건어물
                                                    </label>
                                                </li>

                                            </ul>
                                        </div>
                                        <a onClick={(e) => onClickCategory(e, 1)} href="!#" className={`category-btn category2${isClass[1] ? ' on' : ''}`}><span>브랜드</span><img src={process.env.PUBLIC_URL + "/images/sub1/icon_arrow_up.svg"} alt="" /></a>
                                        <div ref={(el) => (subRef.current[1] = el)} className="sub">
                                            <ul>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category2_chk1' id='category2Chk1' value={'브랜드 A'} />
                                                        브랜드 A
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category2_chk1' id='category2Chk1' value={'브랜드 B'} />
                                                        브랜드 B
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category2_chk1' id='category2Chk1' value={'브랜드 C'} />
                                                        브랜드 C
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category2_chk1' id='category2Chk1' value={'브랜드 D'} />
                                                        브랜드 D
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                        <a onClick={(e) => onClickCategory(e, 2)} href="!#" className={`category-btn category3${isClass[2] ? ' on' : ''}`}><span>가격</span><img src={process.env.PUBLIC_URL + "/images/sub1/icon_arrow_up.svg"} alt="" /></a>
                                        <div ref={(el) => (subRef.current[2] = el)} className="sub">
                                            <ul>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'6,400원 미만'} />
                                                        6,400원 미만
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'6,400원 ~ 9,900원'} />
                                                        6,400원 ~ 9,900원
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'9,900원 ~ 17,900원'} />
                                                        9,900원 ~ 17,900원
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'17,900원 이상'} />
                                                        17,900원 이상
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                        <a onClick={(e) => onClickCategory(e, 3)} href="!#" className={`category-btn category4${isClass[3] ? ' on' : ''}`}><span>혜택</span><img src={process.env.PUBLIC_URL + "/images/sub1/icon_arrow_up.svg"} alt="" /></a>
                                        <div ref={(el) => (subRef.current[3] = el)} className="sub">
                                            <ul>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'할인상품'} />
                                                        할인상품
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                        <a onClick={(e) => onClickCategory(e, 4)} href="!#" className={`category-btn category5${isClass[4] ? ' on' : ''}`}><span>유형</span><img src={process.env.PUBLIC_URL + "/images/sub1/icon_arrow_up.svg"} alt="" /></a>
                                        <div ref={(el) => (subRef.current[4] = el)} className="sub">
                                            <ul>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'Kurly Only'} />
                                                        Kurly Only
                                                    </label>
                                                </li>
                                                <li>
                                                    <label>
                                                        <input type="checkbox" name='category1_chk1' id='category1Chk1' value={'희소가치 프로젝트'} />
                                                        희소가치 프로젝트
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="right">
                                <div className="right-title">
                                    <strong>총 215건</strong>
                                    <span>
                                        <a href="!#" onClick={(e) => onClickOrder(e, '추천순')} className='order-btn'><span>추천순</span><img src={process.env.PUBLIC_URL + "/images/sub1/icon_quet.svg"} alt="" /></a>
                                        <i>|</i>
                                        <a href="!#" onClick={(e) => onClickOrder(e, '신상품순')} className='order-btn on'>신상품순</a>
                                        <i>|</i>
                                        <a href="!#" onClick={(e) => onClickOrder(e, '판매처순')} className='order-btn'>판매처순</a>
                                        <i>|</i>
                                        <a href="!#" onClick={(e) => onClickOrder(e, '혜택순')} className='order-btn'>혜택순</a>
                                        <i>|</i>
                                        <a href="!#" onClick={(e) => onClickOrder(e, '낮은가격순')} className='order-btn'>낮은 가격순</a>
                                        <i>|</i>
                                        <a href="!#" onClick={(e) => onClickOrder(e, '높은가격순')} className='order-btn'>높은 가격순</a>
                                    </span>
                                </div>
                                <div className="right-content">
                                    {/* state.신상품 => 하위컴포넌트 프롭스 데이터 내려주기 */}

                                    <Sub1ComponentChild /* 신상품={state.신상품} */ product={product} setViewProduct={setViewProduct} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};