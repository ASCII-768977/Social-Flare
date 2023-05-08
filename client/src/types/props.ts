export interface State {
  mode: 'light' | 'dark';
  user: null | User;
  token: null | string;
  posts: Post[];
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picturePath: string;
  friends: User[];
  location: string;
  occupation: string;
  viewedProfile: number;
  impressions: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Post {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  picturePath: string;
  userPicturePath: string;
  description: string;
  location: string;
  comments: string[];
  likes: { [userId: string]: boolean };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface RegisterFormValue {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location: string;
  occupation: string;
  picture: File;
  [key: string]: string | File;
}

export interface LoginFormValue {
  email: string;
  password: string;
}

export type FormValue = RegisterFormValue | LoginFormValue;

export interface FriendProp {
  friendId: string;
  name: string;
  subtitle: string;
  userPicturePath: string;
}

export interface UserImageProp {
  image: string;
  size?: string;
}

export interface FriendListWidgetProp {
  userId?: string;
}

export interface MyPostWidgetProp {
  picturePath: string;
}

export interface PostsWidgetProp {
  userId?: string;
  isProfile?: boolean;
}

export interface PostWidgetProp {
  postId: string;
  postUserId: string;
  name: string;
  description: string;
  location: string;
  picturePath: string;
  userPicturePath: string;
  likes: { [userId: string]: boolean };
  comments: string[];
}

export interface UserWidgetProp {
  userId?: string;
  picturePath: string;
}
