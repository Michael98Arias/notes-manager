export interface ProfileData {
  _id: string;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  roles: string[];
  status: string;
  active: boolean;
  emailVerified: boolean;
  sharedWorkspaces: string[];
  locale: Locale;
  storageAssignedGb: number;
  usedStorageBytes: number;
  softDeleted: boolean;
  createdAt: Date;
  favoriteColor: string;
  home: string;
  __v: number;
  lastLogin: Date;
  lastActivity: Date;
}

export interface Locale {
  language: string;
  currency: string;
}
