// import {REQUEST_RESOURCES} from "../action-creators/actions";

// function blankState(){
//     return [];
// }
// function fetchResourceListsData(state, action) {
//     return action.resourceAPI;
// }

// export default function (state = blankState(), action) {
//     const actionHandlers = {
//         [REQUEST_RESOURCES]: fetchResourceListsData
//     };

//     const reducer = actionHandlers[action.type];

//     return reducer ?
//         reducer(state, action) :
//         state;
// }