import React from 'react';
import '../../../scss/confirm_modal.scss';
import { ConfirmContext } from '../../../context/ConfirmContext';

export default function ConfirmOkCancel() {

    const { ConfirmModalOkCancelClose, confirmMsgOkCancel } = React.useContext(ConfirmContext);
    const onClickConfirmModalClose = (e, value) => {
        e.preventDefault();
        ConfirmModalOkCancelClose(value);
    }

    return (
        <div id="confirmModal2" className='confirm'>
            <div className="wrap2">
                <div className="container">
                    <div className="content">
                        <div className="title-box">
                            <h1>{confirmMsgOkCancel}</h1>
                        </div>
                        <div className="button-box">
                            <button onClick={(e) => onClickConfirmModalClose(e, "취소")}>취소</button>
                            <button onClick={(e) => onClickConfirmModalClose(e, "확인")}>확인</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};