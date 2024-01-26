import React from 'react';
import '../../../scss/quick_menu.scss';
import $ from 'jquery';
import { GlobalContext } from '../../../context/GlobalContext';


export default function QuickMenuComponent({ product, isIntro }) {

    const { VIEWPRODUCTKEY } = React.useContext(GlobalContext);
    const [state, setState] = React.useState({
        isFixed: false,
        isViewProduct: true,
    });

    const [viewData, setViewData] = React.useState([]);


    // 스크롤이벤트 동작시 스크롤탑값이 섹션1의 탑값에 도달하면
    // fixed 로 구현한다.
    React.useEffect(() => {

        let quickMenu = $('#quickMenu');
        let sec1Top = 0;
        let isFixed = false;

        try {
            sec1Top = $('#section1').offset().top + 40;
        }
        catch (e) {

        }


        $(window).scroll(function () {

            if ($(window).scrollTop() >= sec1Top) {
                isFixed = true;
                quickMenu.css({ marginTop: -quickMenu.height() / 2 });
            }
            else {
                isFixed = false;
                quickMenu.css({ marginTop: 0 });
            }

            setState({
                ...state,
                isFixed: isFixed
            });

        });

    }, [state.isFixed]);

    // 로컬스토레이지 getItem();
    const getLocalStorage = () => {
        let key = VIEWPRODUCTKEY;

        if (localStorage.getItem(key) !== null) {
            let viewData = JSON.parse(localStorage.getItem(key));
            setViewData(viewData);
        }

    }

    React.useEffect(() => {
        getLocalStorage();
    }, []);


    React.useEffect(() => {
        getLocalStorage();
    }, [product.sign]);

    // 최근 본 상품 위 아래 슬라이드 이동
    const refList = React.useRef();
    const [cnt, setCnt] = React.useState(1);

    const listMainSlide = () => {
        refList.current.style.transition = 'all .6s ease-in-out';
        refList.current.style.transform = `translateY(${-84 * cnt}px)`;
    }

    React.useEffect(() => {
        listMainSlide();
    }, [cnt]);

    // 최근 본상품 위로 클릭이벤트
    const onClickUpEvent = (e) => {
        e.preventDefault();

        if (viewData !== null) {
            if (cnt <= viewData.length - 4) {
                setCnt(cnt => cnt + 1);
            }
        }

    }
    // 최근 본상품 아래로 클릭이벤트
    const onClickDownEvent = (e) => {
        e.preventDefault();

        if (cnt > 0) {
            setCnt(cnt => cnt - 1);
        }

    }




    return (
        <div id='quickMenu' className={`${isIntro ? 'intro' : ''}${state.isFixed ? ' on' : ''}`}>
            <ul>
                <li>
                    <a href="!#">
                        <img src="/public/images/quick_menu/deliveryInfo.png" alt="" />
                    </a>
                </li>
                <li>
                    <span><a href="!#">등급별혜택</a></span>
                    <span><a href="!#">페시피</a></span>
                </li>
                <li className='view-product'>
                    {
                        state.isViewProduct && (
                            <div>
                                <span><a href="!#" onClick={onClickDownEvent}><img src="/public/images/quick_menu/icon_arrow_up.svg" alt="" /></a></span>
                                <h3>최근 본상품</h3>
                                <div className="view-box">
                                    <ul className='wrap-box' ref={refList}>
                                        {
                                            (() => {
                                                try {
                                                    viewData.map((item, idx) => {
                                                        return (
                                                            <li key={idx}><a href="!#"><img src={item.이미지} alt="" /></a></li>
                                                        )
                                                    })
                                                } catch (error) {
                                                    return null
                                                }
                                            })()
                                        }
                                    </ul>
                                </div>
                                <span><a href="!#" onClick={onClickUpEvent}><img src="/public/images/quick_menu/icon_arrow_up.svg" alt="" /></a></span>
                            </div>
                        )
                    }
                </li>
            </ul>
        </div>
    );
};