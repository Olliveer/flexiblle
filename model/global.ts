export type FormState = {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
};

export interface Profile {
  id: string;
  updated_at: Date;
  username: string;
  full_name: string;
  avatar_url: string;
  live_web_site: string;
  github_url: string;
  email: string;
  projects: ProjectInterface[];
}

export interface ProjectInterface {
  id: string;
  created_at: string;
  updated_at: Date | null;
  title: string;
  description: string;
  image: string;
  live_site_url: string;
  github_url: string;
  category: string;
  user_id: string;
  profiles: Profile;
}

export interface ProjectForm {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
}
