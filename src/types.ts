export type Galaxy = {
  name: string;
  title: string;
  description: string;
  projects: (Star | Planet)[];
  color: { colorRep: number };
};

export type Planet = {
  title: string;
  description: string;
  links: {
    github: string;
  };
};

export type Star = {
  title: string;
  description: string;
  links: {
    github: string;
  };
};
