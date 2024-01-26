import React from 'react';
import '../../../../../scss/section_link_image.scss';
import axios from 'axios';

export default function Section6Component() {

    const [state, setState] = React.useState({
        이미지: ''
    });


    React.useEffect(() => {
        axios({
            url: './data/intro_page/section_link_image.json',
            method: 'GET'
        })
            .then((res) => {
                if (res.status === 200) {
                    setState({
                        이미지: res.data.섹션6이미지
                    });
                }
            })
            .catch((err) => {
                console.log(`AXIOS 실패! ${err}`);
            });
    }, []);



    return (
        <section id='section6' className='section-link-image'>
            <div className="container">
                <div className="gap">
                    <div className="title hide">
                        <h2>섹션탑배너</h2>
                    </div>
                    <div className="content">
                        <a href="!#">
                            <img src={process.env.PUBLIC_URL + `/images/intro/${state.이미지}`} alt="" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};