export class UserService {
  constructor() {
    this.users = [];
  }

  async getAll() {
    return this.users;
  }

  async getById(id) {
    return this.users.find((user) => user.id === id);
  }

  async create(user) {
    user.id = this.users.length ? this.users[this.users.length - 1].id + 1 : 1;
    this.users.push(user);
    return user;
  }
}

// export const userService = new UserService();
