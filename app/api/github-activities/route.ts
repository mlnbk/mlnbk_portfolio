import { NextRequest, NextResponse } from 'next/server';

import { GithubActivityResponse, GithubActivityType } from '@Types/types';

// Disable caching to ensure fresh data when limit changes
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const GITHUB_USERNAME = 'mlnbk';
const GITHUB_API_URL = 'https://api.github.com';

interface GithubActivity {
  type: string;
  created_at: string;
  actor: {
    display_login: string;
    avatar_url: string;
  };
  repo: {
    name: string;
  };
  payload: {
    action?: string;
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    let activities: GithubActivity[] = [];
    let url = new URL(`${GITHUB_API_URL}/users/${GITHUB_USERNAME}/events/public`);

    // Paginate through results until we have enough
    while (activities.length < limit) {
      const response = await fetch(url.toString(), {
        headers: {
          Accept: 'application/vnd.github+json',
          ...(process.env.GH_PERSONAL_ACCESS_TOKEN && {
            Authorization: `Bearer ${process.env.GH_PERSONAL_ACCESS_TOKEN}`,
          }),
          'X-GitHub-Api-Version': '2022-11-28',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`GitHub API request failed with status ${response.status}`);
      }

      let data: GithubActivity[] = await response.json();
      // Filter to only include supported activity types
      data = data.filter((a) => Object.keys(GithubActivityType).includes(a.type));

      // Slice if we would exceed the limit
      if (activities.length + data.length > limit) {
        data = data.slice(0, limit - activities.length);
      }

      activities = activities.concat(data);

      // Check for next page in Link header
      const linkHeader = response.headers.get('Link');
      const nextLink = linkHeader?.split(', ').find((link) => link.endsWith('rel="next"'));
      if (!nextLink) {
        break;
      }
      url = new URL(nextLink.slice(nextLink.indexOf('<') + 1, nextLink.indexOf('>')));
    }

    // Map to the expected response format
    const filteredData: GithubActivityResponse = activities.map((a) => ({
      type: a.type as keyof typeof GithubActivityType,
      created_at: a.created_at,
      actor: {
        display_login: a.actor.display_login,
        url: `https://github.com/${a.actor.display_login}`,
        avatar_url: a.actor.avatar_url,
      },
      repo: {
        name: a.repo.name,
        url: `https://github.com/${a.repo.name}`,
      },
      payload: {
        action: a.payload.action,
      },
    })) as GithubActivityResponse;

    return NextResponse.json(filteredData);
  } catch (error) {
    console.error('Error fetching GitHub activities:', error);
    return NextResponse.json({ error: 'Unable to fetch Github activities' }, { status: 500 });
  }
}
