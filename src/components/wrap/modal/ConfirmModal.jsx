import React from 'react';
import { ConfirmContext } from '../../../context/ConfirmContext';

export default function ConfirmModal() {

    const { confirmMsg, confirmModalClose } = React.useContext(ConfirmContext);

    const onClickConfirmModalClose = (e) => {
        e.preventDefault();
        confirmModalClose(); // 닫기 메서드(함수)를 호출 실행 
    }

    return (
        <div id="confirmModal">
            <div className="wrap">
                <div className="container">
                    <div className="content">
                        <div className="title-box">
                            <h1>{confirmMsg}</h1>
                        </div>
                        <div className="button-box">
                            <button onClick={onClickConfirmModalClose}>확인</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

