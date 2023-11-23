type User = {
  email: string;
  firstName: string;
  fullName: string;
  id: string;
  lastName: string;
  phoneNumber: string;
  picture: string;
  title: string;
};

type UsersResponse = {
  data: User[];
  limit: number;
  page: number;
  total: number;
};

type PaginationOptions = {
  limit: number;
  page: number;
};
