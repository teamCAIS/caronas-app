const baseUrl = 'http://192.168.15.5/backend/public/api';

const msgErro = 'Erro ao conectar com o servidor';

export async function login(payload) {
    let response = await fetch(baseUrl, {
        method: 'post',
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    })

    let result = await response.json();
    let token = result.data.token;
    return token;
}

export async function getUserInfo(token) {
    const response = await fetch(baseUrl+'/indexUsuario', {
        method: 'get',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer "+token
        }
    })

    if(!response.ok)
        return 'Falha na conexão'
    
    const data = await response.json();
    return data;
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

export async function criarCorrida(token, payload) {
    const result = await post(token, payload, '/criarCorridaMotorista');
    return result;
}

export async function concluirCorrida(token) {
    const response = await fetch(baseUrl+'/concluirCorridaMotorista', {
        method: 'get',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer "+token
        }
    })

    if(!response.ok)
        return 'Falha na conexão'
    
    const data = await response.json();
    return data;
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

export async function postBuscaUsuario(token, payload) {
    const response = await fetch(baseUrl+'/buscarNomeUsuario', {
        method: 'post',
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer "+token
        }
    })

    if(!response.ok)
        return 'Falha na conexão';

    const data = await response.json();
    return data;
}

export async function mostraFeed(token, payload) {
    const response = await fetch(baseUrl+'/feedPassageiro', {
        method: 'post',
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer "+token
        }
    })

    if(!response.ok)
        return 'Falha na conexão';

    const data = await response.json();
    return data;
}

export async function entraCorrida(token, payload) {
    const result = await post(token, payload, '/entrarCorridaPassageiro');
    return result;
}