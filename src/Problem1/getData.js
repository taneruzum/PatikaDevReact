// getData.js
import axios from 'axios';

export default async function getData(userId) {
    try {
        const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const postsResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

        const userData = userResponse.data;
        const userPosts = postsResponse.data;

        const result = {
            user: userData,
            posts: userPosts
        };

        return result;
    } catch (error) {
        console.error('Veri çekme hatası!:', error.message);
        throw error;
    }
}
