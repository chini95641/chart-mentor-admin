export type IUser = {
    id?: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    address: string;
    role: string;
    membership: 'free' | 'premium';
    expiration_date?: Date | null;
  }; 