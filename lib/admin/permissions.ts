// Admin Permission System
// Defines role hierarchy and permissions

export enum UserRole {
  USER = 'USER',
  VIP = 'VIP',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
  OWNER = 'OWNER'
}

// Permission levels (higher number = more power)
const ROLE_LEVELS = {
  [UserRole.USER]: 0,
  [UserRole.VIP]: 1,
  [UserRole.MODERATOR]: 2,
  [UserRole.ADMIN]: 3,
  [UserRole.OWNER]: 4
}

export interface Permission {
  canBanUsers: boolean
  canKickUsers: boolean
  canChangeRoles: boolean
  canViewAdminPanel: boolean
  canManageContent: boolean
  canModifyOwnStats: boolean  // New: Can modify own money, stats, etc
  canViewOwnerPanel: boolean  // New: Can access owner developer panel
  energyBonus: number
  cashBonus: number
}

// Get permissions for a role
export function getRolePermissions(role: UserRole): Permission {
  switch (role) {
    case UserRole.OWNER:
      return {
        canBanUsers: true,
        canKickUsers: true,
        canChangeRoles: true,
        canViewAdminPanel: true,
        canManageContent: true,
        canModifyOwnStats: true,  // OWNER can modify anything
        canViewOwnerPanel: true,  // OWNER has developer panel
        energyBonus: 999,
        cashBonus: 999999
      }

    case UserRole.ADMIN:
      return {
        canBanUsers: true,
        canKickUsers: true,
        canChangeRoles: true,
        canViewAdminPanel: true,
        canManageContent: true,
        canModifyOwnStats: false,
        canViewOwnerPanel: false,
        energyBonus: 50,
        cashBonus: 10000
      }

    case UserRole.MODERATOR:
      return {
        canBanUsers: true,
        canKickUsers: true,
        canChangeRoles: false, // Moderators can't change roles
        canViewAdminPanel: true,
        canManageContent: true,
        canModifyOwnStats: false,
        canViewOwnerPanel: false,
        energyBonus: 25,
        cashBonus: 5000
      }

    case UserRole.VIP:
      return {
        canBanUsers: false,
        canKickUsers: false,
        canChangeRoles: false,
        canViewAdminPanel: false,
        canManageContent: false,
        canModifyOwnStats: false,
        canViewOwnerPanel: false,
        energyBonus: 20,
        cashBonus: 2000
      }

    case UserRole.USER:
    default:
      return {
        canBanUsers: false,
        canKickUsers: false,
        canChangeRoles: false,
        canViewAdminPanel: false,
        canManageContent: false,
        canModifyOwnStats: false,
        canViewOwnerPanel: false,
        energyBonus: 0,
        cashBonus: 0
      }
  }
}

// Check if user has specific permission
export function hasPermission(userRole: UserRole, permission: keyof Permission): boolean {
  const permissions = getRolePermissions(userRole)
  return Boolean(permissions[permission])
}

// Check if user can perform action on target user
export function canManageUser(actorRole: UserRole, targetRole: UserRole): boolean {
  // OWNER can manage everyone including other OWNERS
  if (actorRole === UserRole.OWNER) return true

  // Admins can manage everyone except OWNER
  if (actorRole === UserRole.ADMIN) {
    return targetRole !== UserRole.OWNER
  }

  // Moderators can manage VIP and USER, but not ADMIN, OWNER or other MODERATOR
  if (actorRole === UserRole.MODERATOR) {
    return targetRole === UserRole.VIP || targetRole === UserRole.USER
  }

  // Others can't manage anyone
  return false
}

// Get role level
export function getRoleLevel(role: UserRole): number {
  return ROLE_LEVELS[role] || 0
}

// Check if role A is higher than role B
export function isRoleHigher(roleA: UserRole, roleB: UserRole): boolean {
  return getRoleLevel(roleA) > getRoleLevel(roleB)
}

// Get role color for UI
export function getRoleColor(role: UserRole): string {
  switch (role) {
    case UserRole.OWNER:
      return '#9b59b6' // Purple
    case UserRole.ADMIN:
      return '#d9534f' // Red
    case UserRole.MODERATOR:
      return '#f0ad4e' // Orange
    case UserRole.VIP:
      return '#5bc0de' // Blue
    case UserRole.USER:
    default:
      return '#888' // Gray
  }
}

// Get role badge emoji
export function getRoleBadge(role: UserRole): string {
  switch (role) {
    case UserRole.OWNER:
      return '💎'
    case UserRole.ADMIN:
      return '👑'
    case UserRole.MODERATOR:
      return '🛡️'
    case UserRole.VIP:
      return '⭐'
    case UserRole.USER:
    default:
      return '👤'
  }
}
