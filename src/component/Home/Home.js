import React, {useEffect, useState} from 'react';
import styles from './Home.module.css';
import { connect } from "react-redux";
import Logo from '../../assets/spotifygreen.png';
import Modal from "../Modal/ModalDetail";
import * as actionTypes from "../../redux/action/Action";


function Home (props) {

    const [trigger, setTrigger] = useState(0),
          [albumReal = [], setAlbum] = useState(),
          [filtered, setFiltered] = useState(null),
          [modal, setModal] = useState({
              detailModal: false,
          });

    const { getAlbums, getPhotos, getUsers, albums, photos, users } = props;

    useEffect(() => {
        getAlbums();
        getPhotos();
        getUsers();
        setTimeout(() => {
            setTrigger(1);
        }, 2000)
    }, [getUsers, getAlbums, getPhotos])

    const onChange = (e) => {
        const value = e.target.value;
        const filteredArr = albumReal.filter(filtered => filtered.title.toLowerCase().includes(value.toLowerCase()) || filtered.users.name.toLowerCase().includes(value.toLowerCase()) || filtered.users.company.name.toLowerCase().includes(value.toLowerCase()) || filtered.users.address.city.toLowerCase().includes(value.toLowerCase()) );
        setFiltered(filteredArr)
    }

    useEffect(() => {
        if (trigger > 0) {
            const prepData = () => {
                if (photos && albums) {
                    albums.forEach(album => {
                        album.photos = [];
                        for (let i = 0; i < photos.length; i++) {
                            if (album.id === photos[i].albumId) {
                                album.photos.push(photos[i])
                            } 
                        }
                    })
                } 
                if (users && albums) {
                    albums.forEach(album => {
                        album.users = ""
                        for (let i = 0; i < users.length; i++) {
                            if (album.userId === users[i].id) {
                                album.users = users[i];
                            } 
                        }
                    })
                }
                setAlbum(albums)
            }
            prepData();
        }
    }, [trigger, albums, photos, users])

    const {detailModal} = modal;

    const onChangeModal = (name, value) => {
        setModal({
            [name] : value
        });
    };

    return(
        <>
        <div className={styles.Navbar}>
            <div>
                <img src={Logo} alt="logo"></img>
            </div>
            <div>
                <input 
                    type="text"
                    placeholder="Filter here"
                    onChange={(e) => onChange(e)}>    
                </input>
            </div>
            <div>
                <ul>
                    <li>About</li>
                </ul>
            </div>
        </div>
        <div className={styles.Container}>
           
            {
            filtered === null ?
            albumReal.map(list => {
                return (
                    <div className={styles.Card} key={list.id}>
                        <img src={list.photos[0].url} alt={list.id}></img>
                        <h3 onClick={() => onChangeModal('detailModal', true)}>{list.title}</h3>
                        <p>{list.users.name}</p>  
                        {detailModal ? 
                            <Modal 
                                open={detailModal}
                                list={list}
                                close={() => onChangeModal('detailModal', false)}
                            />     
                        : "" }                   
                    </div>
                   
                )
            }): 
            filtered.map(list => {
                return (
                    <div className={styles.Card} key={list.id}>
                        <img src={list.photos[0].url} alt={list.id}></img>
                        <h3 onClick={() => onChangeModal('detailModal', true)}>{list.title}</h3>
                        <p>{list.users.name}</p>   
                        {detailModal ? 
                            <Modal 
                                open={detailModal}
                                list={list}
                                close={() => onChangeModal('detailModal', false)}
                            />     
                        : "" }                  
                    </div>
                   
                )
            }) }
        </div>
        </>
    )
}


const mapStateToProps = (state) => {
    return {
      photos: state.index.photos,
      albums: state.index.albums,
      users: state.index.users,
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
      getUsers: () => dispatch(actionTypes.getUsers()),
      getAlbums: () => dispatch(actionTypes.getAlbums()),
      getPhotos: () => dispatch(actionTypes.getPhotos()),
    };
  };
  


export default connect(mapStateToProps, mapDispatchToProps)(Home);