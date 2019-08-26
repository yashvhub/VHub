import API, {Repository} from '.';
import RequestEnvelopes from './request-envelopes';

class RequestCommentsRepository extends Repository {



    //ASK CALEB WHAT THE HELL IS GOING ON
    //FOR SOME REASON IT IS SAYING CONFIGPUT IS UNDEFINED, SO IT CAN'T READ HEADERS FROM IT





//     async post(data, config={put: {}, post: {}}){
//         let configPut = {
//             ...config.put,
//             headers: {
//                 'Content-Type': 'text/uri-list',
//                 ...config.put.headers
//             },
//         }

//         let configPost = {
//             ...config.post,
//             headers: {
//                 'Content-Type': 'application/json',
//                 ...config.post.headers
//             },
//         }


//         const commentResponse = await API.post(this.getPath(), data, configPost);


//         const commentUriList = `${this.getPath()}/${commentResponse.id}`

//         if(commentResponse){
//             let commentPut = await API.put(`${RequestEnvelopes.getPath()}/${data.requestId}/requestComments`, commentUriList, configPut);
//         }

//     }
}


const RequestComments = new RequestCommentsRepository('request-comments');
export default RequestComments;