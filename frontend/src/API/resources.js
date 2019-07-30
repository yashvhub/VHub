import API, {Repository} from '.';

class ResourceRepository extends Repository {
    async getByName(name, config={}) {
        try {
            const response = await API.get(`${this.url}/search/findByNameContaining`, {
                ...config,
                params: {
                    ...config.params,
                    name
                }
            });
            return this.getData(response);
        } catch (e) {
            console.error(e);
        }
    }
    async getBySkill(skill, config={}) {
        try {
            const response = await API.get(`${this.url}/search/findBySkill`, {
                ...config,
                params: {
                    ...config.params,
                    skill
                }
            });
            return this.getData(response);
        } catch (e) {
            console.error(e);
        }
    }
    async getByNameAndSkill(name, skill, config={}) {
        try {
            const response = await API.get(`${this.url}/search/findBySkillAndName`, {
                ...config,
                params: {
                    ...config.params,
                    skill,
                    name
                }
            });
            return this.getData(response);
        } catch (e) {
            console.error(e);
        }
    }
}

const Resources = new ResourceRepository('resources');
export default Resources;