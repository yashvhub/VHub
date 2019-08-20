import API, {Repository} from '.';

class RequestEnvelopeRepository extends Repository {
    async post(data, config={}){
        console.log('look here ya fuck', data)
        try{
            const response = await API.post(this.url, data.baseRequest, config);
                console.log(response.data.id);
                const requestPath = `${this.getPath()}/${response.data.id}/`
                const requestEnvelope ={
                    requestStatus: `${requestPath}requestStatuses/1`, //neeed to be defaulted upon creation
                    interviewer: `${requestPath}interviewer/${data.interviewers[0]}`, //needs to be changed to accept an array
                    requester: `${requestPath}requester/${data.requester}`,
                    proposalType: `${requestPath}proposalType/1`, //hard coded until internal or external is implemented
                    locationPreference: `${requestPath}locationPreference/1` //hard coded for now need changed to accept string
                }
                const response2 = await API.put(`${requestPath}`, requestEnvelope, {...config, headers:{'Content-Type': 'text/uri-list'}})
                // console.log(requestPath)
                // const response2 = await API.put(`${requestPath}requestStatus`, `${requestPath}requestStatuses/1`, {...config, headers:{'Content-Type': 'text/uri-list'}}) //neeed to be defaulted upon creation
                // console.log(response2)
                // const response3 = await API.put(`${requestPath}interviewer`, `${requestPath}interviewer/${data.interviewers[0]}`, {...config, headers:{'Content-Type': 'text/uri-list'}}) //needs to be changed to accept an array
                // console.log(response3)
                // const response4 = await API.put(`${requestPath}requester`, `${requestPath}requester/${data.requester}`, {...config, headers:{'Content-Type': 'text/uri-list'}})
                // console.log(response4)
                // const response5 = await API.put(`${requestPath}proposalType`, `${requestPath}proposalType/1`, {...config, headers:{'Content-Type': 'text/uri-list'}}) //hard coded until internal or external is implemented
                // console.log(response5)
                // const response6 = await API.put(`${requestPath}locationPreference`, `${requestPath}locationPreference/1`, {...config, headers:{'Content-Type': 'text/uri-list'}}) //hard coded for now need changed to accept string
                // console.log(response6)
                // const uriList = data.resources.map(resource =>{
                //     requestPath
                // })
        }catch(e){

        }
    }
    
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