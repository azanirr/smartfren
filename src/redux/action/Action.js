import * as actionTypes from "../constant/actionTypes";
import axios from "axios";

export const getAlbums = () => {
    return async (dispatch) => {
        try {
            const post = await axios({
                method: "get",
                url: "https://jsonplaceholder.typicode.com/albums",
            });
            console.log(post.data)
            dispatch({
                type: actionTypes.GET_ALBUMS,
                payload: {
                    data: post.data
                }
            })
        } catch (error) {
            console.log(error);
        }
        
    }
}

export const getPhotos = () => {
    return async (dispatch) => {
        try {
            const post = await axios({
                method: "get",
                url: "https://jsonplaceholder.typicode.com/photos",
            });
            dispatch({
                type: actionTypes.GET_PHOTOS,
                payload: {
                    data: post.data
                }
            })
        } catch (error) {
            console.log(error);
        }
        
    }
}

export const getUsers = () => {
    return async (dispatch) => {
        try {
            const post = await axios({
                method: "get",
                url: "https://jsonplaceholder.typicode.com/users",
            });
            dispatch({
                type: actionTypes.GET_USERS,
                payload: {
                    data: post.data
                }
            })
        } catch (error) {
            console.log(error);
        }
        
    }
}