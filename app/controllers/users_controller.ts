import User from '#models/user'

export default class UsersController {
  async handle() {
    const users = await User.query().withCount('posts').limit(10)
    return users
  }
}
