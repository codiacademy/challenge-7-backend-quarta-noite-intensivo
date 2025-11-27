export const Roles = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  ACCOUNTANT: "ACCOUNTANT",
  USER: "USER",
} as const ;

export type Role = typeof Roles[keyof typeof Roles];
