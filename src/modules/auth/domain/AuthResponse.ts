import { User } from "../../user/domain/User";

export interface AuthLoginReponseDTO {
  user: User;
  token: string;
}
