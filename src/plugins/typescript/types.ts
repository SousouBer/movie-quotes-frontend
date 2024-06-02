export type ValidationSchemaAuth = {
  username_or_email?: string;
  username?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  remember?: string;
};

export type SchemaProfile = {
  avatar?: file;
  username?: string;
  password?: string;
  password_confirmation?: string;
};

export type ProfileInputField = "username" | "password" | null;

export type Genre = {
  id: number;
  title: string;
};

export type Quote = {
  id: string;
  quote: string;
  picture: string;
  likes_count: number;
  comments_count: number;
};

export type Movie = {
  id: string;
  title: string;
  poster: string;
  quotes_count: string;
  year: string;
  director?: string;
  description: string;
  budget: string;
  genres: Genre[];
  quotes: Quote[];
};
