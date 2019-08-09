import {CONFIRM_INTERVIEW} from "./actions";

export function confirmInterview() {
    console.log('Interview Confirmed!')
    return {
        type:CONFIRM_INTERVIEW
    }
}