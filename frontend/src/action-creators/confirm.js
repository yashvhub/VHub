import {CONFIRM_INTERVIEW, SAVE_INTERVIEW_REQUEST} from "./actions";

export function confirmInterview() {
    console.log('Interview Confirmed!')
    return {
        type:CONFIRM_INTERVIEW
    }
}

export function saveInterviewRequest() {
    console.log('Interview request saved!')
    return {
        type:SAVE_INTERVIEW_REQUEST
    }
}