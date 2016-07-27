import {
    XHR_DATA
} from '../actions';

function xhrData(state = { content: "" }, action) {

    switch (action.type) {
        case XHR_DATA:
            // action：{
            //     type: XHR_DATA,
            //     content: result.data.content
            // }
            return { content: action.content };
        default:
            return state
    }
}

export default xhrData;