import type { UserRole } from '../enums/role.enum';

export interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthState {
  authenticated: boolean;
  role: UserRole;
}
