export type Galaxy = {
  name: string;
  title: string;
  description: string;
  projects: (Star | Planet)[];
};

export type Planet = {
  title: string;
  description: string;
};

export type Star = {
  title: string;
  description: string;
};
