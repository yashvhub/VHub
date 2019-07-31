import RequestEnvelopes from '../API/request-envelopes'
import {REQUEST_LIST_DATA} from "./actions";

export default function requestListData() {
    console.log("request envelopes list: ", RequestEnvelopes)
    return {
        type: REQUEST_LIST_DATA,
        RequestEnvelopes,
    }
}