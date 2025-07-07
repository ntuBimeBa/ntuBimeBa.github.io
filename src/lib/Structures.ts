export interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  isNew?: boolean;
  url?: string;
}

export interface Resource {
  id: number;
  title: string;
  description: string;
  enable: boolean;
  url: string;
  img?: string;
  button_str?: string;
}

