class UserData {
  constructor(fname, age, email) {
    this.fname = fname;
    this.age = age;
    this.email = email;
  }
}

users = [];

users.push(new UserData("mm", 24, "xgrc"));
users.push(new UserData("xx", 1, "xqwec"));
users.push(new UserData("aa", 53, "axzxc"));
users.push(new UserData("bb", 31, "xccc"));

let findUserData = (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      error = true;
      for (let i = 0; i < users.length; i++) {
        if (userData.fname === users[i].fname) {
          error = false;
          break;
        }
      }
      if (error) {
        reject("Can't find the user");
      } else {
        resolve(`Found the user! 
                ${userData.fname}
                ${userData.age}
                ${userData.email}`);
      }
    }, 3000);
  });
};

uData = new UserData("aaaa", 24, "cca@gasd.c");

findUserData(uData)
  .then((success) => console.log(success))
  .catch((error) => {
    console.log(error);
  });
