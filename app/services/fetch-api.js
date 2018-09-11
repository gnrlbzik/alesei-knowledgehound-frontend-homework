import 'whatwg-fetch';

let JWT;

const FetchApi = {
    getJwt (credentials) {
        fetch('https://api.knowledgehound.com/authentication/api/', {
            method: 'POST'
            ,headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
            ,body: `username=${credentials.username}&password=${credentials.password}`
        })
        .then(response => response.json())
        .then(jsonResponse => {
            JWT = jsonResponse.JWT
        });
    },

    search (query) {
        return fetch(`https://api.knowledgehound.com/search/?query=${query}&type=question&group_duplicates=true`, {
            method: 'GET'
            ,headers: {
                'Authorization': `Bearer ${JWT}`,
            }
        })
        .then(response => response.json());
    }
};

FetchApi.getJwt({
    'username': 'candidate@knowledgehound.com'
    ,'password': 'KH1sGreat'
}); // bad joo joo

export default FetchApi;
