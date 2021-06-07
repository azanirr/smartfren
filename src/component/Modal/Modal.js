import React from "react";
import { Modal } from "@material-ui/core";


function ModalDetail (props) {

    const { open, onClose } = props;


    return (
        <Modal open={open} onClose={onClose}>
    
        </Modal>
    )
}

export default ModalDetail;