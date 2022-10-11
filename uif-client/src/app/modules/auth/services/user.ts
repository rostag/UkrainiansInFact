import * as auth from 'firebase/auth';

export type UserRoleName = 'admin' | 'editor';
export interface UserRole {
    name: UserRoleName;
    enabled: boolean;
    displayName?: string;
}

export const userRoleDisplayNames = new Map<UserRoleName, string>([
    ['admin', 'Адмін'],
    ['editor', 'Редактор']
]);

export interface User extends auth.User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    parsedClaims?: UserRole[];
}
