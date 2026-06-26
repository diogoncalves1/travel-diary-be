export interface LoginRequestDto {
  email: string;
  password: string;
}

export type LoginOutputDto = {
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
};
