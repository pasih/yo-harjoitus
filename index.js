const axios = require("axios");

function getPosts() {
  const getPosts = axios.get("https://jsonplaceholder.typicode.com/posts");
  const getUsers = axios.get("https://jsonplaceholder.typicode.com/users");

  const getBoth = Promise.all([getPosts, getUsers]);

  return getBoth.then(function(response) {
    const posts = response[0].data;
    const users = response[1].data;

    return posts.map(function addUserData(post) {
      return Object.assign({}, post, {
        userData: users.find(function findUser(user) {
          return user.id === post.userId;
        })
      });
    });
  });
}

function getCommentsForPost(postId) {
  return axios
    .get("https://jsonplaceholder.typicode.com/comments?postId=" + postId)
    .then(function(response) {
      return response.data;
    });
}

module.exports = {
  getPosts,
  getCommentsForPost
};
