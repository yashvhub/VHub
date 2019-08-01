import {apiUrl} from '../API/request-list'
import {REQUEST_LIST_DATA} from "./actions";

export default function requestListData() {
    return {
        type: REQUEST_LIST_DATA,
        apiUrl
    }
}