// Rreact query select method used to generate additional mock data

export const mockUsers = (response: UsersResponse) => ({
  ...response,
  data: response.data.map((u) => ({
    ...u,
    fullName: `${u.firstName} ${u.lastName}`,
    email: `${u.firstName}.${u.lastName}@gmail.com`.toLocaleLowerCase(),
    phoneNumber: `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`,
  })),
});
