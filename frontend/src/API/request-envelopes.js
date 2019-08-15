import API, {Repository} from '.';

class RequestEnvelopeRepository extends Repository {
    async getByName(name, config={}) {
        try {
            const response = await API.get(`${this.url}/search/findByRequesterName`, {
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

    async approvePatch(data, id, config={}) {
        try {
            if(data.id){
                await API.patch(`${this.url}/${id}`, {
                    requestEnvelopeId: data.id
                })
            }
            if(data){
                await API.put(`${this.getPath()}/${id}/requestStatus`, `${this.getPath()}/${id}/requestStatuses/${2}`,
                {headers: {'Content-Type': 'text/uri-list'}});
                return [true, null];
            }
        }
        catch(e) {
            console.error(e);
            return [null, 'Update Failed.']
        }
    }
}

const RequestEnvelopes = new RequestEnvelopeRepository('request-envelopes');
export default RequestEnvelopes;