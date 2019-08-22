import API, {Repository} from '.';
import ResourceRequests from './resource-requests';
import Skills from './skills';
import Locations from './locations';

class RequestEnvelopeRepository extends Repository {
    async post(data, config={headers:{'Content-Type': 'application/json'}}){
        try{
            const response = await API.post(this.url, data.baseRequest, config);


            const locationPref = {
                city: data.locationCityPref,
                country: data.locationCountryPref,
                stateOrProvince: data.locationStatePref,
            }

            const locationResponse = await API.post(`${Locations.getPath()}/`, locationPref, {headers:{'Content-Type': 'application/json'}})
            console.log("LOCATION RESPONSE", locationResponse)

                const requestPath = `${this.getPath()}/${response.data.id}/`
                const requestEnvelope ={
                    requestStatus: `${requestPath}requestStatuses/1`, //neeed to be defaulted upon creation
                    interviewer: `${requestPath}interviewer/${data.interviewers[0]}`, //needs to be changed to accept an array
                    requester: `${requestPath}requester/${data.requester}`,
                    proposalType: `${requestPath}proposalType/1`, //hard coded until internal or external is implemented
                    locationPreference: `${requestPath}locationPreference/${locationResponse.data.id}`
                }
                const response2 = await API.patch(`${requestPath}`, requestEnvelope, {...config, headers:{'Content-Type': 'application/json'}})
                console.log(response2)

                const resourceRequest = {
                    count: data.resources[0].number,
                    hourlyRate: data.resources[0].compensation,
                    yearsOfExperience: data.resources[0].experience,
                    requestEnvelopeId: response.data.id,
                }

                const resourceRequestResponse = await API.post(`${ResourceRequests.getPath()}/`, resourceRequest, {headers:{'Content-Type': 'application/json'}})
                console.log("resource request response",resourceRequestResponse)

                const skillUriList = data.resources[0].skills.map(skill =>
                    `${Skills.getPath()}/${skill}`)

                const skillsResponse = await API.put(`${ResourceRequests.getPath()}/${resourceRequestResponse.data.id}/skills`, 
                skillUriList.join('\n'),
                {
                    headers: {
                        'Content-Type': 'text/uri-list'
                    }
                });
                console.log(skillsResponse)
        }catch(e){
            console.error(e)
        }
    }
    
    async getByName(name, config={}) {
        try {
            const response = await API.get(`${this.url}/search/findByRequesterNameByRequestDateDesc`, {
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