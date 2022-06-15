export interface IUserInfo {
  fullname: string;
  username: string;
  password: string;
}

export default (user: string): IUserInfo => {
  let username = `${user}-${Math.random()}`;
  let password = `${Math.random()}`;

  // Make sure both usernames and passwords are strings
  username = String(username);
  password = String(password);
  const fullname = "John Doe";
  const credential = { fullname, username, password };
  return credential;
};
