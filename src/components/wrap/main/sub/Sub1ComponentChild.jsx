import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sub1ComponentChild({ setViewProduct, product }) {

    const nav = useNavigate();

    const onClickProductList = (e, item) => {
        e.preventDefault();
        let obj = {
            productCode: item.productCode,
            productStorage: item.productStorage,
            productThumbnailImage: `${process.env.PUBLIC_URL}/${item.productThumbnailImage}`,
            배송구분: "샛별배송",
            productDistributor: item.productDistributor,
            productName: item.productName,
            productDescription: item.productDescription,
            productPrice: item.productPrice,
            productDiscount: Number.parseInt(item.productDiscount),
            판매처: "",
            저장일시: new Date().getTime()
        }
        setViewProduct(obj);  // 최상위 컴포넌트에게 전달
        nav('/product');
    }

    const [list] = React.useState(9);  // 한화면에 보여질 목록개수
    const [pageNumber, setPageNumber] = React.useState(1); // 페이지번호
    const [groupPage] = React.useState(5); // 페이지번호 그룹1(1(1~5) 그룹2(6!~10) 그룹3(11~15) 그룹4(16~20))
    const [cnt, setCnt] = React.useState(1); // 페이지번호 그룹 1

    const [startNum, setStartNum] = React.useState(); // 그룹 시작 번호
    const [endtNum, setEndtNum] = React.useState();  // 그룹 끝 번호

    //  페이지번호 클릭 이벤트
    const onClickPageNum = (e, num) => {
        e.preventDefault();
        setPageNumber(num);
    }

    // 그룹페이지 클릭  다음카운트 이벤트
    const onClickNextGroup = (e) => {
        e.preventDefault();
        setCnt(cnt + 1);
    }

    // 그룹페이지 클릭  이전카운트 이벤트
    const onClickPrevGroup = (e) => {
        e.preventDefault();
        setCnt(cnt - 1);
    }

    // 그룹 시작번호 설정 => cnt 또는 groupPage 값 변경이 있거나 설정되었다면 시작번호 설정 실행
    React.useEffect(() => {
        setStartNum((cnt - 1) * groupPage);
    }, [cnt, groupPage]);

    // 그룹 끝번호 설정
    React.useEffect(() => {
        setEndtNum(startNum + groupPage);
    }, [startNum, groupPage]);

    // 그룹 시작페이지 설정 => 그룹페이지 이동시 그룹의 첫페이지 설정
    React.useEffect(() => {
        setPageNumber(startNum + 1);
    }, [endtNum, startNum]);


    return (
        <>
            <ul>
                {product.length === 0 ? (
                    <li>상품이 없습니다.</li>
                ) : (
                    product.map((item, idx) => {
                        if (Math.ceil((idx + 1) / list) === pageNumber) { // 클릭한 번호 전달 1(100~86) 2(85~70) 3 4 5 6 7
                            return (
                                <li key={item.productCode} data-key={item.productCode}>
                                    <a href="!#" onClick={(e) => onClickProductList(e, item)}>
                                        <div className="img-box">
                                            <img src={process.env.PUBLIC_URL + `/images/kurly_product/${item.productThumbnailImage}`} alt="" />
                                            <span>
                                                <img src={process.env.PUBLIC_URL + "/images/sub1/icon_cart.svg"} alt="" />
                                            </span>
                                        </div>
                                        <div className="tit-box">
                                            <ul>
                                                <li>샛별배송</li>
                                                <li>{item.productDistributor === "" ? <></> : <strong>[{item.productDistributor}]</strong>} <em>{item.productName}</em></li>
                                                <li>{item.productDescription}</li>
                                                <li>
                                                    <span className='rate-price'>{Number.parseInt(item.productDiscount, 10) === 0 ? `` : `${Number.parseInt(item.productDiscount, 10)}%`}</span>
                                                    {Number.parseInt(item.productDiscount, 10) > 0 ? (
                                                        <span className='panme-price'>
                                                            &nbsp;{Math.round(item.productPrice * (1 - (Number.parseInt(item.productDiscount, 10) / 100))).toLocaleString('ko-KR')}원
                                                        </span>
                                                    ) : (
                                                        <span className='panme-price'>
                                                            &nbsp;{Math.round(item.productPrice).toLocaleString('ko-KR')}원
                                                        </span>
                                                    )
                                                    }
                                                </li>
                                                <li>{Number.parseInt(item.productDiscount, 10) === 0 ? <></> : <s>{(item.productPrice).toLocaleString('ko-KR')}원</s>}</li>
                                            </ul>
                                        </div>
                                    </a>
                                </li>
                            );
                        }
                    })
                )}
            </ul>

            <div className="page-button-box">

                {cnt > 1 && <a href="!#" className="prev-btn" onClick={onClickPrevGroup}>&lt;</a>}
                {
                    (() => {
                        let arr = [];  // 페이지번호와 a 태그 모두 저장된 배열변수
                        for (let i = startNum; i < endtNum; i++) {
                            if (i < Math.ceil(product.length / list)) { // 100/6
                                arr = [...arr, <a key={i} data-key={i + 1} className={pageNumber === (i + 1) ? 'on' : null} href="!#" onClick={(e) => onClickPageNum(e, (i + 1))}>{i + 1}</a>]
                            }
                        }
                        return arr
                    })()
                }
                {cnt < Math.ceil(product.length / list / groupPage) && <a href="!#" className="next-btn" onClick={onClickNextGroup}>&gt;</a>}

            </div>
        </>
    );
};