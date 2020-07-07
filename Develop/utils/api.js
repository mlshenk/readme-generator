const axios = require("axios");
function api(username) {
    return axios.get(`https://api.github.com/users/${username}`)
        // .then(response => { return response.avatar_url })
        .catch(err => {
            console.log(`User not found`);
        //     process.exit(1);
        });
}
module.exports = api;