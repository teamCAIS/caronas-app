import { Container } from 'unstated';

export default class UserContainer extends Container {

    state = {
        user: {nome: 'Teste'}
    }

    updateUser = user => {
        this.setState({user});
    }

}