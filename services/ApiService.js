const baseUrl = 'http://192.168.11.11/backend/public/api';

const msgErro = 'Erro ao conectar com o servidor';

export async function login(payload) {
    try {
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
    catch(error) {
        return {status: 'error',message: 'Erro ao tentar conectar'}
    }
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

export async function cancelarCorrida(token) {
    const response = await fetch(baseUrl+'/cancelarCorridaMotorista', {
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

export async function avaliaCorrida(token, payload) {
    const result = await post(token, payload, '/avaliarCorridaPassageiro');
    return result;
}

export async function denuncia(token, payload) {
    const result = await post(token, payload, '/denunciarUsuario');
    return result;
}

export async function sairCorrida(token) {
    const response = await fetch(baseUrl+'/sairCorridaPassageiro', {
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

export async function getHistoricoMotorista(token) {
    const response = await fetch(baseUrl+'/historicoMotorista', {
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

export async function getHistoricoPassageiro(token) {
    const response = await fetch(baseUrl+'/historicoPassageiro', {
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

export async function preCadastrar(infos) {
    let formData = new FormData();

    formData.append('documento', {uri:infos.documentoURL, name:infos.documentoNOME, type:infos.documentoTIPO});

    formData.append('nascimento', infos.dataNasc);
    formData.append('nome', infos.nome);
    formData.append('email', infos.email);
    formData.append('password', infos.password);
    formData.append('genero', infos.genero);

    const response = await fetch(baseUrl+'/preCadastro', {
        method: 'post',
        body: formData,
        headers: {
            'content-type': 'multipart/form-data'
        }
    })

    if(!response.ok)
        return 'Falha na conexão';

    const data = await response.json();
    return data;

}
