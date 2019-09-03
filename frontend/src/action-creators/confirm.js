import {CONFIRM_INTERVIEW} from "./actions";
import RequestEnvelops from '../API/request-envelopes';
import Users from '../API/users';


export function confirm(){
    return{
        type:CONFIRM_INTERVIEW
    }
}


export function confirmInterview(selectedResourcesIds, requestEnvelopeId) {
    return async (dispatch) => {
        try{
            const selectedResourcesUriList = selectedResourcesIds.map(resource =>
                `${Users.getPath()}/${resource}`)
            let response = await RequestEnvelops.confirm(selectedResourcesUriList, requestEnvelopeId);
            if(response){
                dispatch(confirmInterview)
                return(true);
            }
        }catch(e){
            console.error(e)
        }
    }
}