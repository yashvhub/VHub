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
        console.log("THIS IS IMPORTANT:", data);
        try {
            if(data.id){
                await API.patch(`${this.url}/${id}`, {
                    requestEnvelopeId: data.id
                })
            }
            if(data){
                // const searchedRequestEnvelope = await API.get(`${this.url}/${id}/request-statuses/1`);
                // console.log(`${API.getPath()}/${id}`);
                // console.log("ACTUAL PATH:" ,API.getPath());
                await API.patch(`${this.getPath()}/${id}/requestStatus`,
                {headers: {'Content-Type': 'text/uri-list'}});
                // console.log("READ THIS",searchedRequestEnvelope);
                // searchedRequestEnvelope.requestStatus.id = 2;
                // await API.patch(searchedRequestEnvelope, undefined, {})
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