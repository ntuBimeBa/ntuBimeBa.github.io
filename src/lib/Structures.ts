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

export interface UserData {
  uid: string;
  username: string;
  real_name?: string;
  stu_id?: string;
  profile_img?: string;
  sa_fee: number;
  access_maker_space_reservation: number;
  email?: string;
  tel?: string;
  discord?: string;
  address?: string;
  note?: string;
}

export interface Notification {
  id: string;
  title: string;
  content: string;
  date: string;
  unread: boolean;
  actionScript?: () => void;
}

export interface DashboardLegacyFile {
  id: string;
  name: string;
  year: string;
  grade: string;
  semester: number;
  teacher: string;
  subject: string;
  code: string;
  type: string;
  description: string;
  uploadedAt: string;
}

export interface DashboardTodoItem {
  id: string;
  title: string;
  due: string;
  actionScript?: () => void;
}

