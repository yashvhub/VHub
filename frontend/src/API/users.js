import API, {Repository} from '.';

class UserRepository extends Repository {
    async login(username, password, config={}) {
        try {
            const response = await API.get('login', {
                ...config,
                auth: {
                    username,
                    password
                }
            });
            return this.getData(response);
        } catch (e) {
            console.error(e);
        }
    }
}

const Users = new UserRepository('users');
export default Users;