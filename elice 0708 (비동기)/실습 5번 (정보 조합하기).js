import API from "./api";

const requestPosts = () => {
  // 데이터를 적절하게 조합하여 Post 정보를 만들어보세요.
  return Promise.all([API.fetchPosts(), API.fetchUsers()])
    .then(([posts, users]) => {
      return fetchCommentsByPosts(posts).then((comments) => [
        posts,
        users,
        comments,
      ]);
    })
    .then(([posts, users, comments]) => {
      const userMap = createUserMap(users);
      const commentMap = createCommentMap(comments);
      return transformPosts(posts, userMap, commentMap);
    });
};

export default requestPosts;

function fetchCommentsByPosts(posts) {
  return Promise.all(
    posts.map((post) => API.fetchComments(post.id))
  ).then((commentArrays) => {
      console.log(commentArrays);
      console.log(commentArrays.flatMap((array) => array));
      return commentArrays.flatMap((array) => array);
  });
}

function createUserMap(users) {
  return users.reduce((map, user) => {
    map[user.id] = user;
    return map;
  }, {});
}

function createCommentMap(comments) {
  return comments.reduce((map, comment) => {
    const array = map[comment.postId] ? map[comment.postId] : [];
    array.push(comment);
    map[comment.postId] = array;
    return map;
  }, {});
}

function transformPosts(posts, userMap, commentMap) {
  return posts.map((post) => {
    const { id, userId, ...rest } = post;
    return {
      ...rest,
      user: userMap[userId],
      comments: commentMap[id],
    };
  });
}