import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts') // 상위 path
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) GET /posts
  //    모든 posts를 가져온다.

  @Get() // 하위 path
  getPosts() {
    return this.postsService.getAllPost();
  }

  // 2) GET /posts/:id
  //    id에 해당하는 post를 가져온다.
  //   예를 들어서 id=1인 경우 id가 1인 포스트를 가져온다.

  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postsService.getPostById(+id);
  }

  // 3) POST /posts
  //    post를 생성한다.

  @Post()
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.postsService.createPosts(author, title, content);
  }

  // 4) PUT /posts/:id
  //    id에 해당하는 post를 변경한다.

  @Put(':id')
  putPosts(
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
    return this.postsService.updatePost(+id, author, title, content);
  }

  // 5) DELETE /posts/:id
  //    id에 해당하는 post를 삭제한다.

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(+id);
  }
}
