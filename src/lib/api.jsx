import axios from "axios";

const jspApi = axios.create({
    baseURL: process.env.REACT_APP_JSP_URL
});
const kurlyApi = axios.create({
    baseURL: process.env.REACT_APP_KURLY_URL
});
const bbsApi = axios.create({
    baseURL: process.env.REACT_APP_BBS_URL
});

// axios get
export async function jspAxiosGetRequest(url) {
    try {
        const response = await jspApi.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// axios get
export async function kurlyAxiosGetRequest(url) {
    try {
        const response = await kurlyApi.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// axios get
export async function bbsAxiosGetRequest(url) {
    try {
        const response = await bbsApi.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// axios post
export function axiosPostRequest(url, data, params) {
    axios({
        url: url,
        method: "post",
        data: data,
        params: params
    })
        .then((res) => { if (res.status === 200) return res.data })
        .catch((err) => err)
}