/**
 * Life Empire - Type Definitions
 *
 * Centralized type definitions for the entire game
 */

import type { Prisma } from '@prisma/client';

// ========================================
// CHARACTER TYPES
// ========================================

export interface CharacterStats {
  // Attributes
  strength: number;
  intelligence: number;
  charisma: number;
  stamina: number;

  // Criminal Skills
  shooting: number;
  driving: number;
  stealth: number;
  lockpicking: number;
  hacking: number;

  // Business Skills
  management: number;
  negotiation: number;
  accounting: number;
  marketing: number;
}

export interface CharacterStatus {
  level: number;
  experience: number;
  xpNeeded: number;
  health: number;
  maxHealth: number;
  energy: number;
  maxEnergy: number;
  reputation: number;
  heatLevel: number;
  mentalState: number;
  stress: number;
}

export interface CharacterFinances {
  cash: number;
  dirtyCash: number;
  bankBalance: number;
}

export type CharacterWithRelations = Prisma.CharacterGetPayload<{
  include: {
    user: true;
    city: true;
    district: true;
    currentJob: true;
    gang: true;
    gangMembership: true;
  };
}>;

// ========================================
// CRIME TYPES
// ========================================

export interface CrimeRequirements {
  level: number;
  skills: Partial<CharacterStats>;
  items: string[];
  energy: number;
}

export interface CrimeResult {
  success: boolean;
  reward: number;
  experienceGained: number;
  heatGained: number;
  arrested: boolean;
  injured: boolean;
  healthLost: number;
  message: string;
}

export interface CrimeExecution {
  crimeId: string;
  characterId: string;
  timestamp: Date;
}

// ========================================
// JOB TYPES
// ========================================

export interface WorkShift {
  jobId: string;
  characterId: string;
  duration: number; // hours
  startedAt: Date;
  expectedEnd: Date;
}

export interface JobRewards {
  pay: number;
  experience: number;
  skillGains: Partial<CharacterStats>;
}

// ========================================
// GANG TYPES
// ========================================

export interface GangHierarchy {
  bossId: string;
  underbossId?: string;
  capos: string[];
  soldiers: string[];
  members: string[];
}

export interface GangWarScore {
  attackerPoints: number;
  defenderPoints: number;
  attackerCasualties: number;
  defenderCasualties: number;
}

export interface TerritoryControl {
  districtId: string;
  gangId: string;
  controlPercentage: number;
  isContested: boolean;
  weeklyIncome: number;
}

// ========================================
// BUSINESS TYPES
// ========================================

export interface BusinessMetrics {
  monthlyRevenue: number;
  monthlyExpenses: number;
  profitMargin: number;
  marketScore: number;
  innovationScore: number;
  profitabilityScore: number;
}

export interface BusinessOperation {
  businessId: string;
  ownerId: string;
  type: string;
  isOperational: boolean;
  isLaundering: boolean;
}

// ========================================
// HEIST TYPES
// ========================================

export interface HeistCrew {
  leaderId: string;
  hackerId?: string;
  gunmanId?: string;
  driverId?: string;
  lookoutId?: string;
}

export interface HeistProgress {
  phase: 'planning' | 'entry' | 'execution' | 'escape';
  completion: number;
  policeResponse: number;
  timeRemaining: number;
}

export interface HeistReward {
  totalLoot: number;
  leaderShare: number;
  crewShare: number;
}

// ========================================
// MARKET TYPES
// ========================================

export interface StockData {
  symbol: string;
  name: string;
  currentPrice: number;
  change: number;
  changePercent: number;
}

export interface CryptoData {
  symbol: string;
  name: string;
  currentPrice: number;
  change24h: number;
  changePercent24h: number;
}

export interface Portfolio {
  stocks: Array<{
    symbol: string;
    shares: number;
    avgPrice: number;
    currentValue: number;
    profitLoss: number;
  }>;
  crypto: Array<{
    symbol: string;
    amount: number;
    avgPrice: number;
    currentValue: number;
    profitLoss: number;
  }>;
}

// ========================================
// LOCATION TYPES
// ========================================

export interface CityInfo {
  id: string;
  name: string;
  country: string;
  description: string;
  crimeBonus: number;
  businessTaxRate: number;
  policePresence: number;
  gangActivity: number;
  specializations: string[];
}

export interface DistrictInfo {
  id: string;
  cityId: string;
  name: string;
  type: string;
  dangerLevel: number;
  wealthLevel: number;
  policePresence: number;
  controllingGangId?: string;
}

// ========================================
// NOTIFICATION TYPES
// ========================================

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'levelup' | 'crime' | 'gang' | 'business';
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: Date;
}

// ========================================
// GAME EVENT TYPES
// ========================================

export interface GameEvent {
  id: string;
  type: 'ECONOMIC' | 'CRIMINAL' | 'WORLD' | 'POLITICAL';
  name: string;
  description: string;
  effects: Record<string, any>;
  duration: number;
  isActive: boolean;
  triggeredAt: Date;
  endsAt?: Date;
}

// ========================================
// ACTIVITY LOG TYPES
// ========================================

export interface ActivityLog {
  id: string;
  characterId: string;
  action: string;
  details: Record<string, any>;
  timestamp: Date;
  ipAddress?: string;
}

// ========================================
// TRANSACTION TYPES
// ========================================

export interface Transaction {
  id: string;
  characterId: string;
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER' | 'LAUNDERED' | 'BUSINESS_PROFIT' | 'CRIME_REWARD' | 'JOB_SALARY' | 'GANG_PAYOUT';
  amount: number;
  isDirtyMoney: boolean;
  source: string;
  description?: string;
  timestamp: Date;
}

// ========================================
// UI COMPONENT TYPES
// ========================================

export interface ProgressBar {
  current: number;
  max: number;
  color?: string;
  showPercentage?: boolean;
}

export interface StatDisplay {
  label: string;
  value: number;
  max?: number;
  icon?: string;
  color?: string;
}

export interface ButtonAction {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  loading?: boolean;
}

// ========================================
// FORM TYPES
// ========================================

export interface CharacterCreationForm {
  username: string;
  cityId: string;
  avatar: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface GangCreationForm {
  name: string;
  tag: string;
  description?: string;
}

export interface BusinessCreationForm {
  name: string;
  type: string;
  cityId: string;
  districtId: string;
}

// ========================================
// API RESPONSE TYPES
// ========================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ========================================
// GAME MECHANICS TYPES
// ========================================

export interface SuccessCalculation {
  baseRate: number;
  skillModifiers: number;
  attributeModifiers: number;
  equipmentModifiers: number;
  heatPenalty: number;
  stressPenalty: number;
  finalRate: number;
}

export interface LevelUpRewards {
  newLevel: number;
  statPoints: number;
  cashBonus: number;
  maxEnergyIncrease: number;
  maxHealthIncrease: number;
  unlockedFeatures: string[];
}

export interface SkillGain {
  skill: string;
  amount: number;
  newValue: number;
}

// ========================================
// REALTIME TYPES
// ========================================

export interface RealtimeUpdate {
  type: 'character' | 'gang' | 'market' | 'event' | 'notification';
  action: 'create' | 'update' | 'delete';
  data: any;
  timestamp: Date;
}

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  message: string;
  createdAt: Date;
}

// ========================================
// LEADERBOARD TYPES
// ========================================

export interface LeaderboardEntry {
  rank: number;
  characterId: string;
  username: string;
  avatar: string;
  value: number;
  change?: number;
}

export interface Leaderboards {
  wealth: LeaderboardEntry[];
  level: LeaderboardEntry[];
  reputation: LeaderboardEntry[];
  crimes: LeaderboardEntry[];
  gangs: Array<{
    rank: number;
    gangId: string;
    gangName: string;
    gangTag: string;
    reputation: number;
    memberCount: number;
    territories: number;
  }>;
}

// ========================================
// ADMIN TYPES
// ========================================

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalCharacters: number;
  totalGangs: number;
  totalBusinesses: number;
  totalTransactions: number;
  totalCrimes: number;
}

export interface AdminAction {
  type: 'ban' | 'unban' | 'delete' | 'edit' | 'grant';
  targetType: 'user' | 'character' | 'gang' | 'business';
  targetId: string;
  reason?: string;
}

// ========================================
// UTILITY TYPES
// ========================================

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface Coordinates {
  x: number;
  y: number;
}

// ========================================
// ERROR TYPES
// ========================================

export interface GameError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export class InsufficientFundsError extends Error {
  constructor(required: number, available: number) {
    super(`Insufficient funds. Required: $${required}, Available: $${available}`);
    this.name = 'InsufficientFundsError';
  }
}

export class InsufficientEnergyError extends Error {
  constructor(required: number, available: number) {
    super(`Insufficient energy. Required: ${required}, Available: ${available}`);
    this.name = 'InsufficientEnergyError';
  }
}

export class LevelRequirementError extends Error {
  constructor(required: number, current: number) {
    super(`Level requirement not met. Required: ${required}, Current: ${current}`);
    this.name = 'LevelRequirementError';
  }
}

export class HeatTooHighError extends Error {
  constructor(current: number, max: number) {
    super(`Heat level too high. Current: ${current}, Max allowed: ${max}`);
    this.name = 'HeatTooHighError';
  }
}
