import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

import {
  GithubActivityResponse,
  GithubActivityService,
} from 'nestjs-github-activity';

import { SendContactEmailBody } from './types';
import { Throttle } from '@nestjs/throttler';

@Controller()
export class AppController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: ConfigService,
    private readonly githubService: GithubActivityService,
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

  @Throttle({ default: { limit: 1, ttl: 60000 } }) // 1 per minute
  @Post('/contact')
  async sendContactEmail(@Body() body: SendContactEmailBody) {
    const transporter = nodemailer.createTransport({
      port: 587,
      secure: false,
      service: 'gmail',
      auth: {
        user: this.configService.get('GMAIL_USERNAME'),
        pass: this.configService.get('GMAIL_PASSWORD'),
      },
    });

    const mailOptions = {
      from: 'Portfolio Contact',
      to: this.configService.get('GMAIL_USERNAME'),
      subject: `New contact from ${body.name}`,
      text: `New contact form submission from ${body.name} with email ${body.email}. \nMessage: ${body.message}`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      throw new Error('Failed to send email');
    }
  }
}
