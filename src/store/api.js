import axios from "axios";

const apiEndpoint = "http://localhost:3000"

let config = null

export default {
    getServiceEndpoint() {
        if( config != null ){
            return Promise.resolve(config.apiEndpoint);
        }
        return axios.get("/config.json")
            .then(res => {
                config = res.data;
                return config.apiEndpoint
            })
            .catch(_ => apiEndpoint) // eslint-disable-line no-unused-vars
    },
    fetchDomains() {
        return this.getServiceEndpoint().then(endpoint => 
            axios.get(`${endpoint}/api/domains?include_servers`)
                .then(res => res.data)
                .catch(err => ({
                    status: "error",
                    message: err
                }))
        )
    }, 
    analyzeDomain(domain) { // eslint-disable-line no-unused-vars
        return this.getServiceEndpoint().then(endpoint => 
            axios.get(`${endpoint}/api/analyze/${domain}?dont_wait`)
                .then(res => { 
                    return res.data
                })
                .catch(err => {
                    return {
                        status: "error",
                        message: err
                    }
                })
        )
    }
}