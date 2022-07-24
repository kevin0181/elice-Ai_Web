import React from 'react';

import logo from './logo.svg';
import './App.css';

const App = () => {
  const user = {
    name: '유영빈',
    job: '개발자',
    avatarUrl: logo,
  };

  return <User user={user} />;
};

const User = ({ user }) => (
  <Profile
    user={user}
    avatar={<AvatarRound user={user} />}
    job={<Job user={user} />}
  />
);

const Profile = ({ user, avatar, job }) => (
  <div className="profile">
    <div>{avatar}</div>
    <div>
      <p>{user.name}</p>
      {job}
    </div>
  </div>
);

const AvatarRound = ({ user }) => (
  <img className="round" alt="avatar" style={{ width: '10%' }} src={user.avatarUrl} />
);

const Job = ({ user }) => (
  <p className="fat">{user.job}</p>
);

export default App;
