import React from 'react';
import '../../../../../scss/section3.scss';
import Section3SlideComponent from './Section3SlideComponent';
import axios from 'axios';

export default function Section3Component({ setViewProduct }) {

    const [state, setState] = React.useState({
        n: 20
    });

    return (
        <section id="section3">

            <Section3SlideComponent n={state.n} setViewProduct={setViewProduct} />

        </section>
    );
};