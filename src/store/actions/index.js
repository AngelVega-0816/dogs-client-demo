import axios from "axios";
import types from "./../type_actions";

// variable que contiene la URL del host
let host = 'https://dogs-api-demo.herokuapp.com';

export function getDogs() {
    return function(dispatch) {
        return axios.get(`${host}/dogs`)
            .then(res => {
                return dispatch({
                    type: types.getDogs,
                    payload: res.data
                })
            })
    };
};

export function getTemperaments() {
    return async function(dispatch) {
        return axios.get(`${host}/temperament`)
            .then(res => {
                return dispatch({
                    type: types.getTemperaments,
                    payload: res.data
                })
            })
    };
};

export function getDetails (id) {
    return async (dispatch) => {
        console.log(id)
        return await axios.get(`${host}/dogs/${id}`)
            .then(response => {
                console.log(id)
                return dispatch({
                    type: types.getDetails,
                    payload: response.data,
                });
            })
            .catch(err => {
                return alert('Dog details not found');
            });
    };
}

export function getDogsName (payload) {
    return async function (dispatch) {
        return axios.get(`${host}/dogs?name=${payload}`)
            .then(res => {
                return dispatch({
                    type: types.getDogsName,
                    payload: res.data
                })
            }).catch(err => {alert("Dog not found")})
    };
};

export function sortName (payload) {
    return {
        type: types.sortName,
        payload,
    };
};

export function sortWeight (payload) {
    return {
        type: types.sortWeight,
        payload,
    };
};

export function sortHeight (payload) {
    return {
        type: types.sortHeight,
        payload,
    };
};

export function filterDogsTemp (payload) {
    return {
        type: types.filterDogsTemp,
        payload,
    };
};

export function filterDogsCreated (payload) {
    return {
        type: types.filterDogsCreated,
        payload,
    };
};


// export function postDog (payload) {
//     return async function () {
//         let response = axios.post(`${host}/dog`, payload)
//         console.log("action")
//         return response;
//     };
// };
export function postDog(payload){
    return async function(){
        var json = await axios.post(`${host}/dog`, payload)
            .then(res => json)
    }
}