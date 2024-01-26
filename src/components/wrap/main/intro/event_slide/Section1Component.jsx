import React from 'react';
import '../../../../../scss/section1.scss';
import Section1SlideComponent from './Section1SlideComponent';
import axios from 'axios';

export default function Section1Component() {

    const [state, setState] = React.useState({
        슬라이드: [],
        n: 0
    });

    // 슬라이드 데이터 가져오기
    React.useEffect(() => {

        axios({
            url: './data/intro_page/section1.json',
            method: 'GET'
        })
            .then((res) => {
                if (res.status === 200) {
                    setState({
                        ...state,
                        슬라이드: res.data.slide,
                        n: res.data.slide.length - 2
                    })
                }
            })
            .catch((err) => {
                console.log(`AXIOS 실패! ${err}`);
            });

    }, []);  // 빈배열 : 로딩시 화면이 그려지고(마운트) 난 뒤 1회실행




    return (
        <section id="section1">
            <div className="container">
                <div className="gap">
                    <div className="title  hide">
                        <h2>마켓컬리 메인 슬라이드 문종 슬라이드</h2>
                    </div>
                    <div className="content">

                        <Section1SlideComponent 슬라이드={state.슬라이드} n={state.n} />

                    </div>
                </div>
            </div>
        </section>
    );
};