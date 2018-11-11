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
        //action(result, result['data']['token'])
        getUserInfo(result['data']['token'], action);
        //alert(result['data']['token']);
        
    })
    .catch(error => alert(error));
}

function getUserInfo(token, action) {
    fetch(baseUrl+'/checarTipoUsuario', {
        method: 'get',
        headers: {
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
    .catch(error => alert("Erro getUserInfo"));
}

export async function checarCodigo(token, payload) {
    const result = post(token, payload, '/checarCadastroUsuario');
    return result;
}

export async function cadastroFinal(token, payload) {
    const result = await post(token, payload, '/cadastroFinalUsuario');
    return result;
}

async function post(token, payload, rota) {
    const response = await fetch(baseUrl+rota, {
        method: 'post',
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer "+token
        }
    });

    if(!response.ok)
        return 'Falha na conexão';

    const result = await response.json();

    if(result.status == "error")
        return result.message;
    
    if(result.status == "success")
        return result.status;
}

export async function getCorridaAtual(token) {
    const response = await fetch(baseUrl+'/corridaAtualMotorista', {
        method: 'get',
        headers: {
            "Authorization": "bearer "+token
        }
    })

    if(!response.ok)
        return 'Falha na conexão';

    const data = await response.json();
    return data;
}
