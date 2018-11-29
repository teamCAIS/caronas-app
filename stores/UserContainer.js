import { Container } from 'unstated';

export default class UserContainer extends Container {

    state = {
        user: {nome: 'Teste'}
    }

    updateUser = user => {
        this.setState({user});
    }

    updateTipo = tipo => {
        this.setState({user: {...this.state.user, tipo}});
    }

    updateCarro = (modelo, corCarro, placa) => {
        this.setState({
            user: {
                ...this.state.user,
                modelo,
                corCarro,
                placa,
            }
        })
    }

}