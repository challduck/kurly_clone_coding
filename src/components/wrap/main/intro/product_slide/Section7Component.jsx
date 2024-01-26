import React from 'react';
import '../../../../../scss/section3.scss';
import Section7SlideComponent from './Section7SlideComponent';
import axios from 'axios';



export default function Section7Component({ setViewProduct }) {

    const [state, setState] = React.useState({
        n: 20
    });

    return (
        <section id="section3">

            <Section7SlideComponent n={state.n} setViewProduct={setViewProduct} />

        </section>
    );
};