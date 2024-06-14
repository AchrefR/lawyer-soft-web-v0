import {Role} from "./role.model";
import {Access} from "./access.model";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  accesses: Access[];
  lawyerId: string;
  enabled: boolean;
}
