import React from 'react';

export default function Sub3ComponentChild({ 특가혜택 }) {
    return (
        <ul>
            {
                특가혜택.map((item, idx) => {
                    return (
                        <li key={idx}>
                            <a href="!#">
                                <div className="img-box">
                                    <img src={process.env.PUBLIC_URL + `/images/sub4/${item.이미지}`} alt="" />
                                </div>
                            </a>
                        </li>
                    )
                })
            }
        </ul>
    );
};
