import API, {Repository} from '.';

class ResourceRepository extends Repository {
    async getByNameAndVendor(name, vendor, config={}) {
        try {
            const response = await API.get(`${this.url}/search/findByNameContainingAndVendor`, {
                ...config,
                params: {
                    ...config.params,
                    name,
                    vendor
                }
            });
            return this.getData(response);
        } catch (e) {
            console.error(e);
        }
    }
    async getBySkillAndVendor(skill, vendor, config={}) {
        try {
            const response = await API.get(`${this.url}/search/findBySkillAndVendor`, {
                ...config,
                params: {
                    ...config.params,
                    skill,
                    vendor
                }
            });
            return this.getData(response);
        } catch (e) {
            console.error(e);
        }
    }
    async getByNameAndSkillAndVendor(name, skill, vendor, config={}) {
        try {
            const response = await API.get(`${this.url}/search/findBySkillAndNameAndVendor`, {
                ...config,
                params: {
                    ...config.params,
                    skill,
                    name,
                    vendor
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