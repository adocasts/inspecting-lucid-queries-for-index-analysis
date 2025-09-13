import factory from '@adonisjs/lucid/factories'
import EmailHistory from '#models/email_history'
import { UserFactory } from './user_factory.js'

export const EmailHistoryFactory = factory
  .define(EmailHistory, async ({ faker }) => {
    return {
      emailNew: faker.internet.email(),
      emailOld: faker.internet.email(),
    }
  })
  .relation('user', () => UserFactory)
  .build()
