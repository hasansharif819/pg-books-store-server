import { IAuthor } from './author';

export interface IBook {
  id: number;
  title: string;
  description?: string;
  published_date: Date;
  author_id: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface IBookCreate {
  title: string;
  description?: string;
  published_date: Date;
  author_id: number;
}

export interface IBookUpdate {
  title?: string;
  description?: string;
  published_date?: Date;
  author_id?: number;
}

export interface IBookWithAuthor extends IBook {
  author?: IAuthor;
}
