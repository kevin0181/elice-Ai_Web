import API from "./api";


let userF = (user) => {

    const email = user.email;
    const name = `${user.name.first} ${user.name.last}`;
    const pictureUrl = user.picture.large;
    const username = user.login.username;
    const location = `${user.location.country}, ${user.location.state}, ${user.location.city}`;
    const age = user.dob.age;

    return {
    email,
    name,
    pictureUrl,
    username,
    location,
    age,
  };
  
}

let checkAge = (user) => {
    return user.age >= 40
}

const requestUsers = () => {
  return API.fetchUsers().then((users) => {
    // 유저 정보를 변화하고, 필터링하는 코드를 작성해보세요.
    return users
            .map(userF)
            .filter(checkAge)
  });
};

export default requestUsers;
