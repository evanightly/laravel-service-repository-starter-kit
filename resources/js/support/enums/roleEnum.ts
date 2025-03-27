const roles = {
    SUPER_ADMIN: 'super_admin',
};

export const RoleEnum = roles;

export type RoleEnum = (typeof roles)[keyof typeof roles];
