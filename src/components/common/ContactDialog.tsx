import React, { useEffect, useState } from 'react';

const ContactDialog = (
    {
        handleModalToggle,
        modalFade,
    }
        :
    {
        handleModalToggle: Function
        modalFade: boolean
    }) => {
    const [fadeOut, setFadeOut] = useState(false)
    useEffect(() => {
        if (modalFade) {
            handleCloseModal()
        }
    }, [modalFade])
    const handleCloseModal = () => {
        setFadeOut(true)
        setTimeout(() => handleModalToggle(false), 300)
    }
    
    return (
        <div className={`modal ${fadeOut ? "fade-out" : ""}`} id="estimateModal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-backdrop"></div>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <article className="part3">
                            <h2 className="left-section-title">Loading...</h2>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactDialog;