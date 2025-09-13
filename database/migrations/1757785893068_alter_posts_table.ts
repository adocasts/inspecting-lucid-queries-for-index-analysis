import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.raw('CREATE INDEX posts_state_publish_at_idx ON posts (state, publish_at DESC)')
  }

  async down() {
    this.schema.raw('DROP INDEX posts_state_publish_at_idx')
  }
}
