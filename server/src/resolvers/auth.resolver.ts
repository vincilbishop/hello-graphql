import { Args, ResolveProperty, Resolver } from '@nestjs/graphql';
import { Author } from '../models/author';
import { Query } from '@nestjs/common';
import { Int } from 'type-graphql';

@Resolver(of => Author)
export class AuthorResolver {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly postsService: PostsService,
  ) {}

  @Query(returns => Author)
  async author(@Args({ name: 'id', type: () => Int }) id: number) {
    return await this.authorsService.findOneById(id);
  }

  @ResolveProperty()
  async posts(@Parent() author) {
    const { id } = author;
    return await this.postsService.findAll({ authorId: id });
  }
}
