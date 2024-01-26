import React from 'react';

import { useNavigate } from 'react-router-dom';
import { httpGetRequest } from '../../../../lib/productApi';
export default function Section5SlideComponent({ setViewProduct }) {

    const nav = useNavigate();
    // 섹션4
    // 판매가격, 정가 콤머형식 함수

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        const url = '/product';

        httpGetRequest(url)
            .then(data => {
                // 데이터를 받은 후 shuffleArray 함수를 사용하여 섞음
                const res = [...data];
                const sec5Data = res.slice(100, 101);
                setData(sec5Data)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const onClickProductList = (e, item) => {
        e.preventDefault();
        let obj = {
            productCode: item.productCode,
            productStorage: item.productStorage,
            productThumbnailImage: `${process.env.PUBLIC_URL}/toothpaste.jpg`,
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


    return (
        <div className="right">
            <ul>
                {
                    data.map((item) => {
                        return (
                            <li className="slide slide0" key={item.productCode}>
                                <div className="col-gap">
                                    <a href="!#" onClick={(e) => onClickProductList(e, item)}>
                                        <div className="img-box">
                                            <img src={process.env.PUBLIC_URL + `/images/kurly_product/${item.productThumbnailImage}`} alt="" />
                                            <span>
                                                <img src={process.env.PUBLIC_URL + "/images/sub1/icon_cart.svg"} alt="" />
                                            </span>
                                        </div>
                                        <div className="tex-box">
                                            <ul>
                                                <li>{item.배송구분 === undefined ? "샛별배송" : item.배송구분}</li>
                                                <li>{item.productDistributor === "" ? <></> : <strong>&#91;{item.productDistributor}&#93;</strong>} <em>{item.productName}</em></li>
                                                <li><span className='rate-price'>
                                                    {Number.parseInt(item.productDiscount) === 0 ? `` : `${item.productDiscount}%`}</span>{Number.parseInt(item.productDiscount) > 0 && (<span className='panme-price'>{Math.round(item.productPrice * (1 - Number.parseInt(item.productDiscount) / 100))}원</span>)}</li>
                                                <li>{Number.parseInt(item.productDiscount) === 0 ? <span className='panme-price'>{(item.productPrice)}원</span> : <s>{(item.productPrice)}원</s>}</li>
                                                {/* <li>{item.판매처}</li> */}
                                            </ul>
                                        </div>
                                    </a>
                                </div>
                            </li>
                        )
                    })

                }
            </ul>
        </div>
    );
};