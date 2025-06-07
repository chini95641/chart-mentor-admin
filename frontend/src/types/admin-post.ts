export interface IAdminComment {
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
  text: string;
  createdAt: string;
}

export interface IAdminPost {
  _id:string;
  content: string;
  author: {
    _id: string;
    name: string;
    avatar?: string;
  };
  likes: string[]; // Array of user IDs
  comments: IAdminComment[];
  createdAt: string;
  updatedAt: string;
} 