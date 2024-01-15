import { Controller, Get } from '@nestjs/common';
import {
  GithubActivityResponse,
  GithubActivityService,
} from 'nestjs-github-activity';

@Controller()
export class AppController {
  constructor(private readonly githubService: GithubActivityService) {}

  @Get('/github-activities')
  async getGitHubActivities(): Promise<GithubActivityResponse> {
    const activities = await this.githubService.fetchGithubActivities();
    return activities;
  }
}
