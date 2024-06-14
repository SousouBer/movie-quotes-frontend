export type ValidationSchemaAuth = {
  username_or_email?: string;
  username?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  remember?: string;
};

export type SchemaProfile = {
  avatar?: File;
  username?: string;
  password?: string;
  password_confirmation?: string;
};

export type ProfileInputField = "username" | "password" | "avatar" | null;

export type Genre = {
  id: number;
  title: string;
};

export type MovieAttributeTranslation = {
  en: string;
  ka: string;
};

export type Movie = {
  id: number;
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

export type Quote = {
  quote_id: number;
  id: number;
  is_liked?: boolean;
  quote: string;
  picture: string;
  movie: QuoteMovie;
  likes_count: string;
  comments_count: string;
  quote_author?: QuoteAuthor;
  comments?: Comment[];
};

export type QuoteAuthor = {
  id?: number;
  avatar: string | null;
  username: string;
};

export type QuoteMovie = {
  id: number;
  title: string;
  year: string;
};

export type Comment = {
  id: number;
  author: QuoteAuthor;
  comment: string;
};

export type ValidationSchemaMovie = {
  "title.en": string;
  "title.ka": string;
  "director.en": string;
  "director.ka": string;
  "description.en": string;
  "description.ka": string;
  budget: string;
  year: string;
};

export type AttributeTranslation = {
  en: string;
  ka: string;
};

export type MovieEdit = {
  id: string;
  title: AttributeTranslation | string;
  poster: string;
  year: string;
  director?: AttributeTranslation | string;
  description: AttributeTranslation | string;
  budget: string;
  genres: Genre[];
};

export type ValidationSchemaQuote = {
  "quote.en": string;
  "quote.ka": string;
};

export type QuoteEdit = {
  id: number;
  title: AttributeTranslation;
  picture: string;
};

export type EditMovieData = {
  "title.en": string;
  "title.ka": string;
  "director.en": string;
  "director.ka": string;
  "description.en": string;
  "description.ka": string;
  budget: string;
  year: string;
  genres: number[];
  poster?: File;
};

export type EditQuote = {
  "quote.en": string;
  "quote.ka": string;
  movie_id: number;
  picture?: File;
};

export type CommentPayload = {
  quote_id: number;
  comment: string;
};

export type Notification = {
  id: number;
  quote_id: number;
  author_avatar: string;
  author_username: string;
  like_received?: string;
  comment_received?: string;
  is_read?: boolean;
  time_created: string;
};
