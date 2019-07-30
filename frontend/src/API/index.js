import axios from 'axios';

export const DEFAULT_CONFIG = {
    baseURL: "http://10.27.12.183:8080/api/"
}
const API = axios.create(DEFAULT_CONFIG);

export class Repository {
    url;
    constructor(url) {
        this.url = url;
    }

    getData({data, status, statusText}) {
        if (status >= 200 && status < 300) {
            if(data && data._embedded) {
                return data._embedded;
            } else {
                return data;
            }
        } else {
            return `${status}: ${statusText}`;
        }
    }

    getId(idObject, requestId, required=true) {
        let id = requestId;
        const isIdObject = required ? idObject.id || idObject.id === 0
            : (idObject && idObject.id) || (idObject && idObject.id === 0);
        if (isIdObject) {
            id = idObject.id;
        } else if (!required) {
            id = idObject
        }
        return id;
    }

    async post(data, config={}) {
        try {
            if(Array.isArray(data)) {
                const requests = data.map(async (d) => await API.post(this.url, d, config));
                const responses = await Promise.all(requests);
                return responses.map(this.getData);
            } else {
                const response = await API.post(this.url, data, config);
                return this.getData(response);
            }
        } catch (e) {
            console.error(e);
        }
    }

    async get(data, config={}) {
        const id = this.getId(data, undefined, false);
        const request = (id || id === 0) ? `${this.url}/${id}` : this.url
        try {
            const response = await API.get(request, config);
            return this.getData(response);
        } catch (e) {
            console.error(e);
        }
    }

    async patch(data, dataId, config={}) {
        const id = this.getId(data, dataId)
        try {
            const response = await API.patch(`${this.url}/${id}`, data, config);
            return this.getData(response);
        } catch (e) {
            console.error(e);
        }
    }

    async delete(data, config={}) {
        const id = this.getId(data);
        try {
            const response = await API.delete(`${this.url}/${id}`, config);
            return this.getData(response);
        } catch (e) {
            console.error(e);
        }
    }
}

export default API;