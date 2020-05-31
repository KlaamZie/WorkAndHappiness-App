import axios from "axios";
const burl = "https://api.workandhappiness.fr";

let authToken = document.cookie.replace(/(?:(?:^|.*;\s*)_060698\s*\s*([^;]*).*$)|^.*$/, "$1");
let authorization = 'Bearer ' + authToken.substr(1, authToken.length)
let refreshToken = document.cookie.replace(/(?:(?:^|.*;\s*)_031098\s*\s*([^;]*).*$)|^.*$/, "$1");
let refresh = refreshToken.substr(1, refreshToken.length)

export default {

	postData: function (send) {
				return axios.post(`${burl}/form/postdata`, send, {headers: {Authorization: authorization, Refresh: refresh}})
	}

};
