const permissions = {
    USER_CREATE: 'user-create',
    USER_READ: 'user-read',
    USER_UPDATE: 'user-update',
    USER_DELETE: 'user-delete',
    PERMISSION_CREATE: 'permission-create',
    PERMISSION_READ: 'permission-read',
    PERMISSION_UPDATE: 'permission-update',
    PERMISSION_DELETE: 'permission-delete',
    ROLE_CREATE: 'role-create',
    ROLE_READ: 'role-read',
    ROLE_UPDATE: 'role-update',
    ROLE_DELETE: 'role-delete',
};

export const PermissionEnum = permissions;

export type PermissionEnum = (typeof permissions)[keyof typeof permissions];
