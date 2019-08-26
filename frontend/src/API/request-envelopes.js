import API, {Repository} from '.';
import ResourceRequests from './resource-requests';
import Skills from './skills';
import Locations from './locations';
import Users from './users';
import Comments from './request-comments'

class RequestEnvelopeRepository extends Repository {
    async post(data, config={headers:{'Content-Type': 'application/json'}}){
        try{
            console.log("here's the data you fuck", data)
            const response = await API.post(this.url, data.baseRequest, config);

            const locationPref = {
                city: data.locationCityPref,
                country: data.locationCountryPref,
                stateOrProvince: data.locationStatePref,
            }

            const locationResponse = await API.post(`${Locations.getPath()}/`, locationPref, {headers:{'Content-Type': 'application/json'}})

                const requestPath = `${this.getPath()}/${response.data.id}/`

                const approversUriList = data.approver.map(approve =>
                    `${Users.getPath()}/${approve}`)

                const approverResponse = API.put(`${requestPath}/approvers`, 
                approversUriList.join('\n'),
                {
                    headers: {
                        'Content-Type': 'text/uri-list'
                    }
                });

                const interviewersUriList =  data.interviewers.map(interviewer =>
                    `${Users.getPath()}/${interviewer}`)

                const interviewersResponse = API.put(`${requestPath}/interviewers`, 
                interviewersUriList.join('\n'),
                {
                    headers: {
                        'Content-Type': 'text/uri-list'
                    }
                });

                const requestEnvelope ={
                    requestStatus: `${requestPath}requestStatuses/1`, //neeed to be defaulted upon creation
                    requester: `${requestPath}requester/${data.requester}`,
                    proposalType: `${requestPath}proposalType/1`, //hard coded until internal or external is implemented
                    locationPreference: `${requestPath}locationPreference/${locationResponse.data.id}`
                }
                const response2 = await API.patch(`${requestPath}`, requestEnvelope, {...config, headers:{'Content-Type': 'application/json'}})
                data.resources.map(async (resource)=>{
                    let resourceRequest = {
                        count: resource.number,
                        hourlyRate: resource.compensation,
                        yearsOfExperience: resource.experience,
                        requestEnvelopeId: response.data.id,
                    }
                    const resourceRequestResponse = await API.post(`${ResourceRequests.getPath()}/`, resourceRequest, {headers:{'Content-Type': 'application/json'}})
                    
                    const skillUriList = resource.skills.map(skill =>
                        `${Skills.getPath()}/${skill}`)
    
                    const skillsResponse = await API.put(`${ResourceRequests.getPath()}/${resourceRequestResponse.data.id}/skills`, 
                    skillUriList.join('\n'),
                    {
                        headers: {
                            'Content-Type': 'text/uri-list'
                        }
                    });
                })
                
                
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
                    
                    
                    let today = new Date()
                    const dd = String(today.getDate()).padStart(2, '0');
                    const mm = String(today.getMonth() + 1).padStart(2, '0');
                    const yyyy = today.getFullYear();
                    
                    today = yyyy + '-' + mm + '-' + dd;
                    
                    const comment = {
                        requestId: response.data.id,
                        author: `${requestPath}requester/${data.requester}`,
                        comment: data.comments,
                        createdAt: today,
                    }
                    
                    const commentResponse = await API.post(`${Comments.getPath()}/`, comment, {headers:{'Content-Type': 'application/json'}})
                    console.log("comment response",commentResponse)
                    
                    if(response, response2, interviewersResponse, approverResponse, locationResponse){
                        return{success:true}
                    }
                    
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