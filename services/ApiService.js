baseUrl = 'http://192.168.15.7/caronas/backend/public/api';

export function login(payload, action) {
    fetch(baseUrl, {
        method: 'post',
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
          }
    })
    .then(response => response.json())
    .then(result =>{
        getUserInfo(result['data']['token'], action);
    });
}

function getUserInfo(token, action) {
    fetch(baseUrl+'/indexPassageiro', {
        method: 'get',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer "+token
          }
    })
    .then(response => response.json())
    .then(result => {
        action(result, token);
    });
}

