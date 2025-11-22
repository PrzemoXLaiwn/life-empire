# 🗄️ Instrukcje Migracji Bazy Danych

## ⚠️ WAŻNE: Musisz uruchomić migrację żeby system CV/Interview działał!

---

## 📋 Opcja 1: Przez Supabase Dashboard (ZALECANE)

### Krok 1: Otwórz Supabase Dashboard
1. Przejdź do https://supabase.com
2. Zaloguj się
3. Wybierz swój projekt

### Krok 2: Otwórz SQL Editor
1. W lewym menu kliknij "SQL Editor"
2. Kliknij "New Query"

### Krok 3: Skopiuj i Wykonaj SQL
1. Otwórz plik: `migrations/add_cv_interview_system.sql`
2. Skopiuj CAŁĄ zawartość
3. Wklej do SQL Editor w Supabase
4. Kliknij "Run" (lub Ctrl+Enter)

### Krok 4: Sprawdź Rezultat
Powinieneś zobaczyć:
```
Success. No rows returned
```

### Krok 5: Zregeneruj Prisma Client
W terminalu:
```bash
npx prisma generate
```

---

## 📋 Opcja 2: Przez Prisma Migrate (Jeśli masz dostęp do DB)

### Krok 1: Dodaj pola do schema.prisma

Znajdź model `Character` i dodaj te pola PRZED `// Timestamps`:

```prisma
  // Probation & Bad Reference (NEW)
  onProbation Boolean @default(false) @map("on_probation")
  probationDaysLeft Int @default(0) @map("probation_days_left")
  probationPerformanceRequired Int @default(75) @map("probation_performance_required")
  liedOnResume Boolean @default(false) @map("lied_on_resume")
  badReferenceUntil DateTime? @map("bad_reference_until")
```

### Krok 2: Dodaj enum ApplicationStatus

Na górze pliku, po innych enumach:

```prisma
enum ApplicationStatus {
  PENDING
  INTERVIEW_SCHEDULED
  INTERVIEW_COMPLETED
  ACCEPTED
  REJECTED
}
```

### Krok 3: Dodaj model JobApplication

Na końcu pliku, przed ostatnim `}`:

```prisma
model JobApplication {
  id          String   @id @default(cuid())
  characterId String   @map("character_id")
  jobId       String   @map("job_id")
  
  cvData Json @default("{}") @map("cv_data")
  
  status ApplicationStatus @default(PENDING)
  suspicionLevel Int @default(0) @map("suspicion_level")
  
  interviewScheduled Boolean @default(false) @map("interview_scheduled")
  interviewScore Int? @map("interview_score")
  interviewAnswers Json? @map("interview_answers")
  
  offeredPosition String? @map("offered_position")
  offeredSalary BigInt? @map("offered_salary")
  
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  
  character Character @relation(fields: [characterId], references: [id], onDelete: Cascade)
  job Job @relation(fields: [jobId], references: [id], onDelete: Cascade)
  
  @@index([characterId])
  @@index([jobId])
  @@index([status])
  @@map("job_applications")
}
```

### Krok 4: Dodaj relation do Character

W model `Character`, w sekcji relations, dodaj:

```prisma
  jobApplications JobApplication[]
```

### Krok 5: Dodaj relation do Job

W model `Job`, w sekcji relations, dodaj:

```prisma
  applications JobApplication[]
```

### Krok 6: Uruchom migrację

```bash
npx prisma migrate dev --name add_cv_interview_system
```

### Krok 7: Zregeneruj client

```bash
npx prisma generate
```

---

## ✅ Jak Sprawdzić Czy Migracja Się Powiodła?

### W Supabase Dashboard:
1. Przejdź do "Table Editor"
2. Wybierz tabelę "characters"
3. Sprawdź czy są nowe kolumny:
   - on_probation
   - probation_days_left
   - probation_performance_required
   - lied_on_resume
   - bad_reference_until

4. Sprawdź czy jest nowa tabela "job_applications"

### W Kodzie:
1. Restart TypeScript server (Ctrl+Shift+P → "Restart TS Server")
2. Błędy TypeScript powinny zniknąć
3. Kod powinien się kompilować bez błędów

---

## 🐛 Troubleshooting

### Problem: "Column already exists"
**Rozwiązanie:** Pola już istnieją, pomiń migrację

### Problem: "Enum already exists"
**Rozwiązanie:** Enum już istnieje, pomiń tę część

### Problem: TypeScript errors persist
**Rozwiązanie:** 
1. Uruchom `npx prisma generate`
2. Restart VS Code
3. Restart TypeScript server

### Problem: "Permission denied"
**Rozwiązanie:** Sprawdź czy masz uprawnienia do modyfikacji bazy

---

## 📝 CO DALEJ PO MIGRACJI?

1. ✅ Restart serwera dev (`npm run dev`)
2. ✅ Przetestuj system CV/Interview
3. ✅ Sprawdź czy probation działa
4. ✅ Sprawdź czy bad reference działa

---

## 🎯 SZYBKA ŚCIEŻKA (Dla Leniwych)

Jeśli nie chcesz robić migracji teraz:

1. Zakomentuj kod probation w `actions/jobs.ts` (linie 215-265)
2. System będzie działał BEZ probation/bad reference
3. Aplikowanie będzie działało przez stary flow
4. Możesz dodać migrację później

**Ale wtedy:**
- ❌ Brak CV Builder
- ❌ Brak Interview
- ❌ Brak Probation
- ❌ Brak Bad Reference

**Zalecam uruchomienie migracji przez Supabase Dashboard!**
