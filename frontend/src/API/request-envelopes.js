import API, { Repository } from '.';
import ResourceRequests from './resource-requests';
import Skills from './skills';
import Locations from './locations';
import Users from './users';
import Comments from './request-comments'

class RequestEnvelopeRepository extends Repository {
    async post(data, config = { headers: { 'Content-Type': 'application/json' } }) {
        try {
            const response = await API.post(this.url, data.baseRequest, config);

            const locationPref = {
                city: data.locationCityPref,
                country: data.locationCountryPref,
                stateOrProvince: data.locationStatePref,
            }

            const locationResponse = await API.post(`${Locations.getPath()}/`, locationPref, { headers: { 'Content-Type': 'application/json' } })

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

            const interviewersUriList = data.interviewers.map(interviewer =>
                `${Users.getPath()}/${interviewer}`)

            const interviewersResponse = API.put(`${requestPath}/interviewers`,
                interviewersUriList.join('\n'),
                {
                    headers: {
                        'Content-Type': 'text/uri-list'
                    }
                });

            const requestEnvelope = {
                requestStatus: `${requestPath}requestStatuses/1`, //neeed to be defaulted upon creation
                requester: `${requestPath}requester/${data.requester}`,
                proposalType: `${requestPath}proposalType/1`, //hard coded until internal or external is implemented
                locationPreference: `${requestPath}locationPreference/${locationResponse.data.id}`
            }
            const response2 = await API.patch(`${requestPath}`, requestEnvelope, { ...config, headers: { 'Content-Type': 'application/json' } })
            data.resources.map(async (resource) => {
                let resourceRequest = {
                    count: resource.number,
                    hourlyRate: resource.compensation,
                    yearsOfExperience: resource.experience,
                    requestEnvelopeId: response.data.id,
                }
                const resourceRequestResponse = await API.post(`${ResourceRequests.getPath()}/`, resourceRequest, { headers: { 'Content-Type': 'application/json' } })

                const skillUriList = resource.skills.map(skill =>
                    `${Skills.getPath()}/${skill}`)

                const skillsResponse = await API.put(`${ResourceRequests.getPath()}/${resourceRequestResponse.data.id}/skills`,
                    skillUriList.join('\n'),
                    {
                        headers: {
                            'Content-Type': 'text/uri-list'
                        }
                    });
                console.log(skillsResponse)
            })

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

            const commentResponse = await API.post(`${Comments.getPath()}/`, comment, { headers: { 'Content-Type': 'application/json' } })
            console.log("comment response", commentResponse)

            if (response, response2, interviewersResponse, approverResponse, locationResponse) {
                console.log(response,  'ererere')
                console.log(response2, '111')
                return { success: true }
            }

        } catch (e) {
            console.error(e)
        }
    }

    async updateInterviewersAndApprovers(requestEnvelopeId, interviewersUriList, approversUriList, config = { headers: { 'Content-Type': 'text/uri-list' } }){
        try{
            const requestPath = `${this.getPath()}/${requestEnvelopeId}/`
            const interviewersResponse = API.put(`${requestPath}/interviewers`,
            interviewersUriList.join('\n'),
            {
                headers: {
                    'Content-Type': 'text/uri-list'
                }
            });

            const approverResponse = API.put(`${requestPath}/approvers`,
            approversUriList.join('\n'),
            {
                headers: {
                    'Content-Type': 'text/uri-list'
                }
            });
        }catch(e){
            console.error(e);
        }
    }

    async getByName(name, config = {}) {
        try {
            const response = await API.get(`${this.url}/search/findByRequesterNameByRequestStatus_StatusIsNotClosedOrderByRequestDateDesc`, {
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

    async getAll(status,config = {}) {
        try {
            const response = await API.get(`${this.url}/search/findAllByRequestStatus_StatusIsNotOrderByRequestDateDesc`,{
            ...config,
                    params: {
                ...config.params,
                        status
                }
            });
            return this.getData(response);
        } catch (e) {
            console.error(e);
        }
    }

    async getAllToggled(config = {
        params: 'CLOSED'
    }) {
        try {
            const response = await API.get(`${this.url}/search/findAllByRequestStatus_StatusIs`, config);
            return this.getData(response);
        } catch (e) {
            console.error(e);
        }
    }

    async getByNameToggled(name, config = {}) {
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

    async approvePatch(data, id, config = {}) {
        try {
            if (data.id) {
                await API.patch(`${this.url}/${id}`, {
                    requestEnvelopeId: data.id
                })
            }
            if (data) {
                const approve = await API.put(`${this.getPath()}/${id}/requestStatus`, `${this.getPath()}/${id}/requestStatuses/${2}`,
                    { headers: { 'Content-Type': 'text/uri-list' } });
                return this.getData(approve);
            }
        }
        catch (e) {
            console.error(e);
            return [null, 'Update Failed.']
        }
    }

    async closeRequestPatch(id, config = {}) {
        try {
                const approve = await API.put(`${this.getPath()}/${id}/requestStatus`, `${this.getPath()}/${id}/requestStatuses/${4}`,
                    { headers: { 'Content-Type': 'text/uri-list' } });
                return this.getData(approve);
        }
        catch (e) {
            console.error(e);
            return [null, 'close Failed.']
        }
    }

    async reOpenRequestPatch(id, config = {}) {
        try {
            const approve = await API.put(`${this.getPath()}/${id}/requestStatus`, `${this.getPath()}/${id}/requestStatuses/${1}`,
                { headers: { 'Content-Type': 'text/uri-list' } });
            return this.getData(approve);
        }
        catch (e) {
            console.error(e);
            return [null, 'reopen Failed.']
        }
    }

    async confirm(selectedResourcesUriList, requestEnvelopeId){
        try{
            const requestPath = `${this.getPath()}/${requestEnvelopeId}/`
            const selectedResourcesResponse = API.put(`${requestPath}/selectedResources`,
            selectedResourcesUriList.join('\n'),
            {
                headers: {
                    'Content-Type': 'text/uri-list'
                }
            });
            const approve = await API.put(`${this.getPath()}/${requestEnvelopeId}/requestStatus`, `${this.getPath()}/${requestEnvelopeId}/requestStatuses/${3}`,
                { headers: { 'Content-Type': 'text/uri-list' } });
            if(selectedResourcesResponse && approve){
                return(true)
            }
        }catch(e){
            console.error(e);
        }
    }
}

const RequestEnvelopes = new RequestEnvelopeRepository('request-envelopes');
export default RequestEnvelopes;