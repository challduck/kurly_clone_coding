import React from 'react';
import axios from 'axios';
import Sub4ComponentChild from './Sub4ComponentChild';

export default function Sub4Component() {
    const [state, setState] = React.useState({
        특가혜택: []
    });


    React.useEffect(()=>{
        axios({
            url:'./data/sub_page/product.json',
            method:'GET'
        })
        .then((res)=>{
            setState({
                ...state,
                특가혜택: res.data.특가혜택
            })
        })
        .catch((err)=>{
            console.log("AXIOS 오류!" + err);
        });  
    },[]);


    return (
        <main id='sub4'>
            <section id='section1'>
                <div className="container">
                    <div className="gap">
                        <div className="title hide"><h2>특가혜택</h2></div>
                        <div className="content">
                            <Sub4ComponentChild 특가혜택={state.특가혜택} />  
                        </div>
                    </div>
                </div>
            </section>
             
        </main>
    );
};