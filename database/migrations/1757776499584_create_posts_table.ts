import { BaseSchema } from '@adonisjs/lucid/schema'
import States from '../../app/enums/states.js'

export default class extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').notNullable()
      table.enum('state', Object.values(States)).notNullable().defaultTo('draft')
      table.string('title').notNullable()
      table.text('body').notNullable()
      table.timestamp('publish_at')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
