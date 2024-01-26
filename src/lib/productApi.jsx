import axios from "axios";

const jspApi = axios.create({
    baseURL: process.env.REACT_APP_JSP_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// axios get
export async function httpGetRequest(url) {
    try {
        const response = await jspApi.get(url);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function httpPostRequest(url, data) {
    try {
        const response = await jspApi.post(url, data);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function httpDeleteRequest(url, data) {
    try {
        const response = await jspApi.delete(url, data);
        return response.data;
    } catch (error) {
        return error;
    }
}