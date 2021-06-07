import React from "react";
import { Modal } from "@material-ui/core";
import styles from './Modal.module.css'; 


function ModalDetail (props) {

    const { open, close, list } = props;



    return (
        <div>
            <Modal open={open} onClose={close} className={styles.Modal}>
                <div className={styles.Detail}>
                    <div className={styles.Photo}>
                        {list.photos.length > 3 ?
                        list.photos.slice(0, 3).map(list => {
                            return (
                                <img src={list.url} alt={list.url} key={list.url}></img>
                            )
                        })
                        : ""}  

                    </div>
                    <div>
                        <h1>{list.title}</h1>
                        <p>{list.users.name}</p>
                        <p>{list.users.address.city}</p>
                        <p>{list.users.company.name}</p>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ModalDetail;