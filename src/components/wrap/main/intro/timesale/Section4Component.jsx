import React from 'react';
import '../../../../../scss/section4.scss';
import Section4SlideComponent from './Section4SlideComponent';
import axios from 'axios';

export default function Section4Component({ setViewProduct }) {

    const [state, setState] = React.useState({
        일일특가: []
    });

    const [timer, setTimer] = React.useState({
        houres: 0,
        minutes: 0,
        seconds: 0
    });


    React.useEffect(() => {
        axios({
            url: './data/intro_page/section4.json',
            method: 'GET'
        })
            .then((res) => {
                if (res.status === 200) {
                    setState({
                        ...state,
                        일일특가: res.data.일일특가,
                        n: res.data.일일특가.length
                    });
                }
            })
            .catch((err) => {
                console.log(`AXIOS 실패! ${err}`);
            });
    }, [])




    React.useEffect(() => {
        let setId = 0;

        function saleTimer() {
            let now = new Date();
            let start = new Date(now);
            start.setHours(9, 0, 0, 0);
            if (now.getHours() >= 9) {
                start.setDate(now.getDate() + 1);
            }
            let end = start - now;

            let eH = Math.floor(end / (60 * 60 * 1000) % 24);
            let eM = Math.floor(end / (60 * 1000) % 60);
            let eS = Math.floor(end / 1000 % 60);

            if (now >= start) {
                clearInterval(setId);
                setTimer({
                    houres: '00',
                    minutes: '00',
                    seconds: '00'
                });
            } else {
                setTimer({
                    houres: eH < 10 ? `0${eH}` : eH,
                    minutes: eM < 10 ? `0${eM}` : eM,
                    seconds: eS < 10 ? `0${eS}` : eS
                });
            }
        }

        setId = setInterval(saleTimer, 1000);

        return () => {
            clearInterval(setId);
        };
    }, [state.n, setTimer]);

    return (
        <section id="section4">
            <div className="container">
                <div className="gap">
                    <div className="content">
                        <div className="left">
                            <ul>
                                <li>
                                    <h2>일일특가</h2>
                                </li>
                                <li>
                                    <h3>24시간 한정 특가</h3>
                                </li>
                                <li>
                                    <span><img src={process.env.PUBLIC_URL + "/images/intro/icon_timer.svg"} alt="" /></span>
                                    <span className='houres'>{timer.houres}</span>
                                    <span>:</span>
                                    <span className='minutes'>{timer.minutes}</span>
                                    <span>:</span>
                                    <span className='seconds'>{timer.seconds}</span>
                                </li>
                                <li>
                                    <p>망설이면 늦어요!</p>
                                </li>
                            </ul>
                        </div>
                        <Section4SlideComponent 일일특가={state.일일특가} setViewProduct={setViewProduct} />
                    </div>
                </div>
            </div>
        </section>
    );
};