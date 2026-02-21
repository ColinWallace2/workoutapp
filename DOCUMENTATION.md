# Aura - Elite Fitness App Documentation

## 1. App Architecture
Aura is built using **Next.js 15 (App Router)** with **TypeScript**, providing a robust, type-safe full-stack environment.

- **Frontend**: Tailwind CSS for styling, Framer Motion for premium micro-animations.
- **State Management**: **Zustand** for lightweight, frictionless client-side state.
- **Backend**: Next.js API Routes.
- **Database**: **PostgreSQL** with **Prisma ORM** for scalable data modeling.
- **Theming**: Custom ThemeProvider with CSS variables for seamless Neumorphic Light/Dark mode transitions.

## 2. Intelligence Engine Formulas

### XP Calculation
The XP formula is designed to reward consistency and relative effort over pure weight.
```typescript
XP = (Base (10) + VolumeScore (Weight * Reps / 100)) * EffortMultiplier * StreakMultiplier + PRBonus
```
- **Effort Multiplier**: 1.1x to 1.5x based on RPE (7-10).
- **Streak Multiplier**: 5% boost per day of active streak.
- **PR Bonus**: Fixed +50 XP for hitting a Personal Record.

### Progressive Overload Logic
Predictive auto-fill suggests weights live during the session:
- **RPE ≤ 7**: Increase weight by 2.5kg.
- **RPE = 8**: Increase weight by 1.25kg.
- **Failure**: 10% deload suggested for the next session.

### Body Battery 2.0
Uses the **Acute:Chronic Workload Ratio (ACWR)**:
- **Acute Load**: Average volume of the last 7 days.
- **Chronic Load**: Average volume of the last 28 days.
- **ACWR = Acute / Chronic**.
- **Battery** = `100 - (ACWR * 20) + (RestDays * 5)`.
- Values between 0.8 and 1.3 are optimal. >1.5 indicates high fatigue.

## 3. Plate Calculator Algorithm
The algorithm greedily selects the largest available plates to reach the target weight on a standard 20kg barbell.
Available plates: `[25, 20, 15, 10, 5, 2.5, 1.25]`.

## 4. Monetization Model
- **Freemium**: Core logging and basic XP tracking are free.
- **Aura Pro (Subscription)**:
    - Advanced AI projections (Linear Regression +).
    - Unlimited routine storage.
    - Detailed strength ratio analysis (Push/Pull/Legs).
    - Exclusive Rank-based rewards (digital badges/animations).

## 5. Scalability Considerations
- **Database Indexing**: Indexes on `userId` and `startTime` for fast retrieval of workout history.
- **Edge Functions**: Projections and analytics can be offloaded to Edge functions for global low-latency.
- **Caching**: Use SWR or React Query for caching API responses and reducing database load.

## 6. Design Tradeoffs & Justifications
- **Neumorphism**: While visually premium, it can be heavy on contrast. Justification: Aura targets "Elite" users who appreciate modern aesthetics; Dark mode implementation mitigates accessibility issues.
- **Client-side State (Zustand)**: Chosen over Redux for zero friction and faster development cycles.
- **Linear Regression for Projections**: Simple linear regression was chosen for its predictability and transparency for the user, though more complex ML models could be added as the data threshold increases.
