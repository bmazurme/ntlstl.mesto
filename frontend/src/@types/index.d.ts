declare module '*.css';
declare module 'interpolate-html-plugin';
declare module 'html-webpack-preconnect-plugin';

type Action<T> = {
  type: string;
  payload: T;
};

type Reducer<T> = (state: T, action: Action<T>) => T;

type User = {
  id: number;
  name: string;
  about: string;
  avatar: string;
  email: string;
};

type Like = {
  id: number;
  user: User | null;
};

type Card = {
  id: string;
  name: string;
  link: string;
  user_id: number | null;
  user: { name: string; };
  likes: { user_id: number; }[];
};
