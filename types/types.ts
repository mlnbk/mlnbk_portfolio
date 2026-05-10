export type HighlightedProject = {
  name: string;
  link: string;
  technologies: string[];
};

export type PhysicalProjectImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type PhysicalDevelopmentDetail = {
  /** Opening notes on place, culture, what matters in the region. */
  regionIntro: string[];
  /**
   * Optional short blurbs (distances, context). Do not put exact addresses, building names,
   * unit numbers, or anything that identifies a private residence.
   */
  contextNotes?: string[];
  /** Paragraphs paired in order with `processImages` for alternating layout. */
  processStory: string[];
  processImages: PhysicalProjectImage[];
  /** Prose beside the first final image; falls back to that image's caption if omitted. */
  finalIntro?: string;
  finalImages: PhysicalProjectImage[];
};

export type PhysicalDevelopment = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  imageSrc?: string;
  detail: PhysicalDevelopmentDetail;
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

const getDescription = (description: string | ((action: Action) => string), action?: string) => {
  if (typeof description === 'function' && action && (action === 'opened' || action === 'closed')) {
    return description(action);
  } else if (typeof description === 'string') {
    return description;
  }
  return '';
};

export const getGithubActivityDetails = (type: GithubActivityType, action?: string) => {
  const details = GithubActivityDetails[type];
  return {
    title: details.title,
    description: getDescription(details.description, action),
    emoji: details.emoji,
  };
};

const GithubActivityDetails = {
  [GithubActivityType.CreateEvent]: {
    title: 'Commited Code',
    description: 'created a commit in',
    emoji: '🚀',
  },
  [GithubActivityType.IssuesEvent]: {
    title: 'Issue Activity',
    description: (action: Action) => `${action} an issue in`,
    emoji: '❗️',
  },
  [GithubActivityType.IssueCommentEvent]: {
    title: 'Issue Comment',
    description: 'commented on an issue in',
    emoji: '💬',
  },
  [GithubActivityType.PullRequestEvent]: {
    title: 'Pull Request',
    description: (action: Action) => `${action} a pull request in`,
    emoji: '🔀',
  },
  [GithubActivityType.PullRequestReviewEvent]: {
    title: 'Pull Request Review',
    description: 'reviewed a pull request in',
    emoji: '👀',
  },
  [GithubActivityType.PullRequestReviewCommentEvent]: {
    title: 'Review Comment',
    description: 'commented on a pull request in',
    emoji: '💡',
  },
  [GithubActivityType.PushEvent]: {
    title: 'Code Push',
    description: 'pushed changes in',
    emoji: '📤',
  },
  [GithubActivityType.PublicEvent]: {
    title: 'Repository Public',
    description: 'made a repository public:',
    emoji: '🌟',
  },
};
