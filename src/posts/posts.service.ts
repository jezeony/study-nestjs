import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostModel } from './entities/post.entity';

// export interface IPostModel {
//   id: number;
//   author: string;
//   title: string;
//   content: string;
//   likeCount: number;
//   commentCount: number;
// }

export const posts: PostModel[] = [
  {
    id: 1,
    author: 'newjeans_official',
    title: '뉴진스 민지',
    content: '메이크업 고치고 있는 민지',
    likeCount: 10000,
    commentCount: 999999,
  },
  {
    id: 2,
    author: 'newjeans_official',
    title: '뉴진스 해린',
    content: '노래 연습하고 있는 해린',
    likeCount: 10000,
    commentCount: 999999,
  },
  {
    id: 3,
    author: 'blackpink_official',
    title: '블랙핑크 로제',
    content: '종합운동장에서 공연하고 있는 로제',
    likeCount: 10000,
    commentCount: 999999,
  },
];

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostModel)
    private readonly postsRepository: Repository<PostModel>,
  ) {}

  async getAllPost() {
    return this.postsRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async createPosts(author: string, title: string, content: string) {
    // 1) create -> 저장할 객체를 생성한다.
    // 2) save -> 객체를 저장한다. (create 메서드에서 생성한 객체로)

    const post = this.postsRepository.create({
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    });

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async updatePost(
    postId: number,
    author: string,
    title: string,
    content: string,
  ) {
    // save의 기능
    // 1) 만약에 데이터가 존재하지 않는다면 (id 기준으로) 새로 생성한다.
    // 2) 만약에 데이터가 존재한다면 (같은 id의 값이 존재한다면) 존재하던 값을 업데이트 한다.

    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    if (author) {
      post.author = author;
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async deletePost(postId: number) {
    const post = await this.postsRepository.findOne({ where: { id: postId } });

    if (!post) {
      throw new NotFoundException();
    }

    await this.postsRepository.delete(postId);

    return postId;
  }
}
