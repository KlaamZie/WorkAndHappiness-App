import axios from "axios";

const burl = "https://api.workandhappiness.fr";

let authToken = document.cookie.replace(/(?:(?:^|.*;\s*)_060698\s*\s*([^;]*).*$)|^.*$/, "$1");
let authorization = 'Bearer ' + authToken.substr(1, authToken.length)
let refreshToken = document.cookie.replace(/(?:(?:^|.*;\s*)_031098\s*\s*([^;]*).*$)|^.*$/, "$1");
let refresh = refreshToken.substr(1, refreshToken.length)

export default {

    makeAdmin: function(email, idEntreprise) {
        return axios.post(`${burl}/user/makeadmin`, { email }, {headers: {Authorization: authorization, Refresh: refresh}});
    },

    makeModo: function(email, idEntreprise) {
        return axios.post(`${burl}/user/makemodo`, { email }, {headers: {Authorization: authorization, Refresh: refresh}});
    },

    makeUser: function(email, idEntreprise) {
        return axios.post(`${burl}/user/makeuser`, { email }, {headers: {Authorization: authorization, Refresh: refresh}});
    },

    valid: function (email) {
        return axios.post(`${burl}/admin/validemployee`, {email}, {headers: {Authorization: authorization, Refresh: refresh}});
    },

    deleteValidated: function (email) {
        return axios.post(`${burl}/admin/deletevalidatedemployee`, {email}, {headers: {Authorization: authorization, Refresh: refresh}});
    },

    deleteToValidate: function (email) {
        return axios.post(`${burl}/admin/deleteemployeetovalidate`, {email}, {headers: {Authorization: authorization, Refresh: refresh}});
    }

}