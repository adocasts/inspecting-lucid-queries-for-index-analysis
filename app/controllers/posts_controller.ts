import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'
import { DateTime } from 'luxon'

export default class PostsController {
  async handle({ view, request }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 30)

    const posts = await Post.query()
      .where('state', 'public')
      .where('publishAt', '<=', DateTime.now().toSQL())
      .select('id', 'userId', 'title', 'state', 'publishAt')
      .orderBy('publishAt', 'desc')
      .paginate(page, perPage)

    posts.baseUrl(router.makeUrl('posts'))

    if (request.accepts(['html'])) {
      return view.render('pages/posts', { posts })
    }

    return posts
  }
}
