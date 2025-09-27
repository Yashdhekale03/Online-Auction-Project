import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8181/auctionapi', // Your Spring Boot server URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
