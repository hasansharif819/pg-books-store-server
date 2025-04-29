import { IBook } from './book';

export interface IAuthor {
  id: number;
  name: string;
  bio?: string;
  birthdate: Date;
  created_at?: Date;
  updated_at?: Date;
}

export interface IAuthorCreate {
  name: string;
  bio?: string;
  birthdate: Date;
}

export interface IAuthorUpdate {
  name?: string;
  bio?: string;
  birthdate?: Date;
}

export interface IAuthorWithBooks extends IAuthor {
  books?: IBook[];
}
