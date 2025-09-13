import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import EmailHistory from '#models/email_history'
import { PostFactory } from './post_factory.js'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'something',
    }
  })
  .relation('emailHistories', () => EmailHistory)
  .relation('posts', () => PostFactory)
  .build()
