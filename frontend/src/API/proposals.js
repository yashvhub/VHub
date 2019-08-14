import API, {Repository} from '.';
import Resources from './resources';

class ProposalsRepository extends Repository {

    async post(data, config={}) {
        try {
            const proposal = await API.post(`${this.url}`, {
                resourceRequestId: data.resourceRequestId
            }, config)
            const uriList = data.resources.map(resource =>
            `${Resources.getPath()}/${resource.id}`)
            await API.post(`${this.url}/${proposal.data.id}/resources`,
                uriList.join('\n'),
                {
                    headers: {
                        'Content-Type': 'text/uri-list'
                    }
                });
            return this.getData(proposal);
        } catch (e) {
            console.error(e);
        }
    }
    async patch(data, id, config={}) {
        try {
            if(data.resourceRequestId) {
                await API.patch(`${this.url}/${id}`, {
                    resourceRequestId: data.resourceRequestId
                })
            }
            if(data.resources) {
                const currentResources = await API.get(`${this.url}/${id}/resources`);
                const prevResources = currentResources.data._embedded.resources;
                const nextResources = data.resources;
                const resourcesToDelete = prevResources.filter(x => !nextResources.find(y => y.id === x.id));
                const resourcesToPost = nextResources.filter(x => !prevResources.find(y => y.id === x.id));
                const deleteResources = resourcesToDelete.map(res =>
                    API.delete(`${this.url}/${id}/resources/${res.id}`)
                    )
                await Promise.all(deleteResources);
                const postResources = resourcesToPost.map(res =>
                    API.post(`${this.url}/${id}/resources`,
                    `${Resources.getPath()}/${res.id}`,
                    {headers: {'Content-Type': 'text/uri-list'}}))
                await Promise.all(postResources);
                return [true, null];
            }
        } catch (e) {
            console.error(e);
            return [null, `Update Failed.`]
        }
    }
}

const Proposals = new ProposalsRepository('proposals');
export default Proposals;