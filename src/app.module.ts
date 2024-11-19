import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModel } from './posts/entities/post.entity';

@Module({
  imports: [
    PostsModule,
    TypeOrmModule.forRoot({
      // nestjs-typeorm 연결고리
      // 데이터베이스 타입
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [PostModel],
      synchronize: true, // DEV는 true, PROD는 DB 자동 연동 false
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
