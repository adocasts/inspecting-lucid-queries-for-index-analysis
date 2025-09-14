import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, computed } from '@adonisjs/lucid/orm'
import States from '../enums/states.js'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare state: States

  @column()
  declare title: string

  @column()
  declare body: string

  @column.dateTime()
  declare publishAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @computed()
  get isPublished() {
    const isViewableState = [States.UNLISTED, States.PUBLIC].includes(this.state)
    const isPublishPast = this.publishAt && this.publishAt <= DateTime.now()
    return isViewableState && isPublishPast
  }

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
