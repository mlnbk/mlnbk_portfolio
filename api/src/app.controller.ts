import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Controller, Get, Inject, Query } from '@nestjs/common';

import {
  GithubActivityResponse,
  GithubActivityService,
} from 'nestjs-github-activity';

@Controller()
export class AppController {
  constructor(
    private readonly githubService: GithubActivityService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('/github-activities')
  async getGitHubActivities(
    @Query('limit') limit = 20,
  ): Promise<GithubActivityResponse> {
    const cacheKey = `github-activities-${limit}`;
    const activities = await this.githubService.fetchGithubActivities(limit);
    if (!activities) {
      throw new Error('Unable to fetch Github activities');
    }
    await this.cacheManager.set(cacheKey, activities);
    return activities;
  }
}
