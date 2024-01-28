export type Galaxy = {
  name: string;
  title: string;
  description: string;
  projects: string[];
  color: { colorRep: number };
};

export type GithubProject = {
  name: string;
  html_url: string;
  description: string;
};

export type GithubActivityResponse = {
  type: keyof typeof GithubActivityDetails;
  created_at: string;
  actor: {
    display_login: string;
    url: string;
    avatar_url: string;
  };
  repo: {
    name: string;
    url: string;
  };
  payload: {
    action?: string;
  };
}[];

export enum GithubActivityType {
  CreateEvent = 'CreateEvent',
  IssuesEvent = 'IssuesEvent',
  IssueCommentEvent = 'IssueCommentEvent',
  PullRequestEvent = 'PullRequestEvent',
  PullRequestReviewEvent = 'PullRequestReviewEvent',
  PullRequestReviewCommentEvent = 'PullRequestReviewCommentEvent',
  PushEvent = 'PushEvent',
  PublicEvent = 'PublicEvent',
}

export type Action = 'opened' | 'closed';

export type DisplayedActivity = {
  created_at: string;
  repoName: string;
  repoUrl: string;
  title: string;
  description: string;
  emoji: string;
};

const getDescription = (
  description: string | ((action: Action) => string),
  action?: string,
) => {
  if (
    typeof description === 'function' &&
    action &&
    (action === 'opened' || action === 'closed')
  ) {
    return description(action);
  } else if (typeof description === 'string') {
    return description;
  }
  return '';
};

export const getGithubActivityDetails = (
  type: GithubActivityType,
  action?: string,
) => {
  const details = GithubActivityDetails[type];
  return {
    title: details.title,
    description: getDescription(details.description, action),
    emoji: details.emoji,
  };
};

const GithubActivityDetails = {
  [GithubActivityType.CreateEvent]: {
    title: 'stellar expansion',
    description: 'created a commit in',
    emoji: '🚀',
  },
  [GithubActivityType.IssuesEvent]: {
    title: 'celestial challenges',
    description: (action: Action) => `${action} an issue in`,
    emoji: '❗️',
  },
  [GithubActivityType.IssueCommentEvent]: {
    title: 'nebula discourse',
    description: 'commented on an issue in',
    emoji: '💬',
  },
  [GithubActivityType.PullRequestEvent]: {
    title: 'cosmic collaboration',
    description: (action: Action) => `${action} a pull request in`,
    emoji: '🔀',
  },
  [GithubActivityType.PullRequestReviewEvent]: {
    title: 'stellar review',
    description: 'reviewed a pull request in',
    emoji: '👀',
  },
  [GithubActivityType.PullRequestReviewCommentEvent]: {
    title: 'review comet',
    description: 'commented on a pull request in',
    emoji: '💡',
  },
  [GithubActivityType.PushEvent]: {
    title: 'stellar propulsion',
    description: 'pushed changes in',
    emoji: '📤',
  },
  [GithubActivityType.PublicEvent]: {
    title: 'galactic genesis',
    description: 'created a repository called',
    emoji: '🌟',
  },
};
