import {
    GET_DATA
} from '../actions';

function getData(state = '我在reducer里让你点上面一下', action) {

    switch (action.type) {
        case GET_DATA:
            return action.data;
        default:
            return state
    }
}

export default getData;