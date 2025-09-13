import { PostFactory } from '#database/factories/post_factory'
import { UserFactory } from '#database/factories/user_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    const userCount = 5_000
    const emails = faker.helpers.uniqueArray(faker.internet.email, userCount)
    const usersData = emails.map((email) => ({
      email,
      createdAt: DateTime.fromJSDate(faker.date.past()),
    }))

    const users = await UserFactory.merge(usersData).createMany(userCount)

    console.log(`Users complete! Created ${userCount} users`)

    const postsPerUser = 50_000
    const totalPosts = userCount * postsPerUser

    for (const user of users) {
      await PostFactory.merge({ userId: user.id }).createMany(postsPerUser)
    }

    console.log(`Seeding complete! Created ${userCount} users and ${totalPosts} posts.`)
  }
}
