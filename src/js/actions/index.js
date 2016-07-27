'use strict';
import ajax from '../services/ajax';

export const GET_DATA = 'GET_DATA';
export function getData(data) {
    return {
        type: GET_DATA,
        data
    };
}

export const XHR_DATA = 'XHR_DATA';
export function xhrData(params) {
    return (dispatch, getState) => {
        return ajax.get(params).then((result) => {
            dispatch({
                type: XHR_DATA,
                content: result.data.content
            });
            // reducer里接受的是此处action的对象即{content:请求的json里有用的值}
        });
    }
}