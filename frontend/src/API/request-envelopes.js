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
}

const RequestEnvelopes = new RequestEnvelopeRepository('request-envelopes');
export default RequestEnvelopes;