import { randomUUID } from "crypto";

export type UserProps = {
  id: string;
  email: string;
  password: string;
  username: string;
};

export class User {
  private constructor(readonly props: UserProps) {}

  public static create(email: string, password: string, username: string) {
    return new User({
      id: randomUUID(),
      email: email,
      password: password,
      username: username,
    });
  }

  public static restore(props: UserProps) {
    return new User(props);
  }

  public get id() {
    return this.props.id;
  }

  public get email() {
    return this.props.email;
  }

  public get username() {
    return this.props.username;
  }

  public get password() {
    return this.props.password;
  }
}
