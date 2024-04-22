import axios from "axios";

const BASE_URL = "http://localhost:3001";

class JoblyApi {
    constructor(baseURL = BASE_URL) {
        this.baseURL = baseURL;
        this.token = null; // Instance property rather than a static property
    }

    async request(endpoint, data = {}, method = "get") {
        // console.debug("API Call:", endpoint, data, method);

        const url = `${this.baseURL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${this.token}` }; // Use instance token
        const params = method === "get" ? data : {};

        try {
            const response = await axios({
                url,
                method,
                data: method !== 'get' ? data : {}, // Only send data with non-GET requests
                params,
                headers
            });
            return { data: response.data }; // Return data as part of an object
        } catch (err) {
            // console.error("API Error:", err.response || err);
            return {
                error: err.response ? err.response.data.error : err.message
            };
        }
    }

    async register(username, firstName, lastName, password, email) {
        return this.request('auth/register', { username, firstName, lastName, password, email }, 'post');
    }

    async updateProfile(firstName, lastName, password, email) {
        return this.request(`users/${(this.decodeJWT(this.token)).username}`, { firstName, lastName, password, email }, 'patch');
    }

    async login(username, password) {
        const response = await this.request('auth/token', { username, password }, 'post');
        if (!response.error) {
            this.token = response.data.token; // Update token upon login
        }
        return response;
    }

    async getCompanies() {
        return this.request('companies', {}, 'get').then(res => res.data.companies); // Updated path
    }

    async getCompany(handle) {
        return this.request(`companies/${handle}`, {}, 'get').then(res => res.data.company);
    }

    async getJobs() {
        return this.request('jobs', {}, 'get').then(res => res.data.jobs);
    }

    async applyToJob(id) {
        return this.request(`users/${(this.decodeJWT(this.token)).username}/jobs/${id}`, {}, 'post');
    }

    async getUserInfo() {
        if (this.token == null || this.token == 'null') {
            return null
        } else {
            return this.request(`users/${(this.decodeJWT(this.token)).username}`, {}, 'get');
        }
    }

    decodeJWT(token) {
        if (token == null || token == 'null') {
            return null
        } else {

            const base64UrlToBase64 = (base64Url) => base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const base64ToUtf8 = (base64) => decodeURIComponent(atob(base64).split('').map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const parts = token.split('.');
            if (parts.length !== 3) {
                throw new Error('Invalid JWT: must consist of three parts.');
            }

            const payload = parts[1];
            const decodedPayload = base64ToUtf8(base64UrlToBase64(payload));

            return JSON.parse(decodedPayload);
        }


    }

}

const api = new JoblyApi();

export { api };
