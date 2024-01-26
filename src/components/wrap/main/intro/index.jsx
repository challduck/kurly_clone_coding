import React from 'react';
import Section1Component from './event_slide/Section1Component';
import Section2Component from './banner_section/Section2Component';
import Section3Component from './product_slide/Section3Component';
import Section4Component from './timesale/Section4Component';
import Section5Component from './Section5Component';
import Section6Component from './banner_section/Section6Component';
import Section7Component from './product_slide/Section7Component';
import Section8Component from './Section8Component';

export default function MainIntroComponent({ setViewProduct }) {
    return (
        <main id='main' className='sub-page intro'>

            <Section1Component />
            <Section2Component />
            <Section3Component setViewProduct={setViewProduct} />
            <Section4Component setViewProduct={setViewProduct} />
            <Section5Component setViewProduct={setViewProduct} />
            <Section6Component />
            <Section7Component setViewProduct={setViewProduct} />
            <Section8Component />

        </main>
    );
};