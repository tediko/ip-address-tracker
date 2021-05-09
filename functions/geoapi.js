const axios = require('axios');

const handler = async (event) => {
    const {ip, domain } = event.queryStringParameters;
    
    const API_KEY = process.env.API_KEY;
    const url = `https://geo.ipify.org/api/v1?apiKey=${API_KEY}&${ip}`;

    try {
        const { data } = await axios.get(url)

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    } catch (error) {
        const { status, statusText, headers, data} = error.response;
        return {
            statusCode: status,
            body: JSON.stringify({status, statusText, headers, data})
        }
    }
}

module.exports = { handler }