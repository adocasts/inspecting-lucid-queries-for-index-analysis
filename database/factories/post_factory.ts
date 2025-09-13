import factory from '@adonisjs/lucid/factories'
import Post from '#models/post'
import States from '../../app/enums/states.js'
import { DateTime } from 'luxon'
import { UserFactory } from './user_factory.js'

export const PostFactory = factory
  .define(Post, async ({ faker }) => {
    return {
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs({ min: 3, max: 50 }),
      state: faker.helpers.arrayElement(Object.values(States)),
      publishAt: DateTime.fromJSDate(faker.date.anytime()),
    }
  })
  .relation('user', () => UserFactory)
  .build()
