const baseUrl = 'http://192.168.15.5/caronas/backend/public/api';

const msgErro = 'Erro ao conectar com o servidor';

export function login(payload, action) {
    fetch(baseUrl, {
        method: 'post',
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
          }
    })
    .then(response =>  {
        if(!response.ok)
            throw Error(msgErro);
        return response.json()
    })
    .then(result =>{
        getUserInfo(result['data']['token'], action);
        //alert(result['data']['token']);
        
    })
    .catch(error => alert(error));
}

function getUserInfo(token, action) {
    fetch(baseUrl+'/checarTipoUsuario', {
        method: 'get',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer "+token
        }
    })
    .then(response =>  {
        if(!response.ok)
            throw Error(response.status);
        return response.json()
    })
    .then(result => {
        action(result, token);
    })
    .catch(error => alert(error));
}

function checarTipoUsuario(token, payload, action) {
    fetch(baseUrl+'/checarCadastroUsuario', {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
            body: JSON.stringify(payload),
            "Authorization": "bearer "+token
        }
    })
    .then(response => response.json())
    .then(result => {
        action(result);
    });
}

export function checarCodigo(token, payload, action) {
    fetch(baseUrl+'/checarCadastroUsuario', {
        method: 'post',
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer "+token
        }
    })
    .then(response => {
        if(!response.ok)
            throw Error('O código não foi verificado');
        return response.json()
    })
    .then(result => {
        action(result);
    })
    .catch(error => alert(error));
}
