import React from 'react';
import Section5SlideComponent from './Section5SlideComponent';
import axios from 'axios';
import $ from 'jquery';
import '../../../../scss/section5.scss';
import { httpGetRequest } from '../../../../lib/productApi';

export default function Section5Component({ setViewProduct }) {

    return (
        <section id="section5">
            <div className="container">
                <div className="gap">
                    <div className="content">
                        <div className="left">
                            <ul>
                                <li>
                                    <h2>뷰티컬리페스타 특가🎉</h2>
                                </li>
                                <li>
                                    <h3>매일 쏟아지는 특가 찬스!</h3>
                                </li>
                                <li>
                                    <p>망설이면 늦어요!</p>
                                </li>
                            </ul>
                        </div>
                        <Section5SlideComponent setViewProduct={setViewProduct} />
                    </div>
                </div>
            </div>
        </section>
    );
};