import axios from "axios";

const headers = {
    "Content-Type": "application/json"
};

const burl = "https://api.workandhappiness.fr";

let authToken = document.cookie.replace(/(?:(?:^|.*;\s*)_060698\s*\s*([^;]*).*$)|^.*$/, "$1");
let authorization = 'Bearer ' + authToken.substr(1, authToken.length)
let refreshToken = document.cookie.replace(/(?:(?:^|.*;\s*)_031098\s*\s*([^;]*).*$)|^.*$/, "$1");
let refresh = refreshToken.substr(1, refreshToken.length)

export default {

    login: function (email, password) {
        return axios.post(
            `${burl}/login`, {email, password}, {headers: headers});
    },

    validEmail: function (email) {
        return axios.post(`${burl}/validemail`, {email}, {headers: {Authorization: authorization, Refresh: refresh}});
    },

    logout: function () {
        return axios.post(`${burl}/logout`, {}, {headers: {Authorization: authorization, Refresh: refresh}});
    },

    signup: function (send) {
        return axios.post(`${burl}/signup`, send, {headers: headers});
    },

    forgotPassword: function (email) {
        return axios.post(`${burl}/forgotpassword`, {email}, {headers: headers});
    },

    checkCode: function (email, code) {
        return axios.post(`${burl}/checkcoderesetpassword`, {email, code}, {headers: headers})
    },

    resetPassword: function (email, password) {
        return axios.post(`${burl}/resetpassword`, {email, password}, {headers: headers})
    },

    signupEntreprise: function (name) {
        return axios.post(`${burl}/entreprise/new`, {name}, {headers: headers});
    }
};
