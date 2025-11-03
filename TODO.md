# Database Cleanup and Seeding Tasks

## Phase 1: Database Cleanup
- [x] Analyze schema for unused tables
- [x] Remove GameEvent and ChatMessage models from schema
- [x] Update Prisma client after schema changes
- [x] Verify no code references to removed models

## Phase 2: Comprehensive Seeding
- [ ] Create /api/seed/all route for complete database seeding
- [ ] Seed cities and districts with proper relationships
- [ ] Seed jobs with progression paths
- [ ] Seed crimes with different tiers
- [ ] Create sample characters with realistic data
- [ ] Generate activity logs for sample characters
- [ ] Add job history and crime history
- [ ] Create sample gangs and gang members
- [ ] Add businesses and business employees
- [ ] Generate notifications for characters
- [ ] Add sample leaderboard data

## Phase 3: Testing and Verification
- [ ] Test all dashboard APIs return data
- [ ] Verify leaderboard shows sample players
- [ ] Check daily missions work with seeded data
- [ ] Ensure activity feed is populated
- [ ] Test daily rewards functionality
- [ ] Run database migration if needed

## Phase 4: Optimization
- [ ] Add indexes for performance on frequently queried fields
- [ ] Clean up any orphaned data
- [ ] Optimize seed data for realistic gameplay
