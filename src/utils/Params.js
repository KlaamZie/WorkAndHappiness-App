import axios from "axios";

const burl = "https://api.workandhappiness.fr";

let authToken = document.cookie.replace(/(?:(?:^|.*;\s*)_060698\s*\s*([^;]*).*$)|^.*$/, "$1");
let authorization = 'Bearer ' + authToken.substr(1, authToken.length)
let refreshToken = document.cookie.replace(/(?:(?:^|.*;\s*)_031098\s*\s*([^;]*).*$)|^.*$/, "$1");
let refresh = refreshToken.substr(1, refreshToken.length)

export default {

    changeEntreprise: function(send) {
        return axios.post(`${burl}/changeentreprise`, send, {headers: {Authorization: authorization, Refresh: refresh}});
    },

    changeEmail: function(send) {
        return axios.post(`${burl}/changeemail`, send, {headers: {Authorization: authorization, Refresh: refresh}});
    },

    changePassword: function(send) {
        return axios.post(`${burl}/changepassword`, send, {headers: {Authorization: authorization, Refresh: refresh}});
    },

    changeRgpd: function(send) {
        return axios.post(`${burl}/changergpd`, send, {headers: {Authorization: authorization, Refresh: refresh}});
    }
};
