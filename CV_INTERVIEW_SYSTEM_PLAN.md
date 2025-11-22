# 📋 System CV i Rozmowy Kwalifikacyjnej - Plan

## 🎯 Wymagania

### 1. **System CV (Resume Builder)**
Gdy gracz klika "Apply Now", otwiera się modal z CV:

**Sekcje CV:**
- Personal Info (imię, wiek - auto z character)
- Education (dyplomy, certyfikaty)
- Work Experience (poprzednie prace)
- Skills (umiejętności - można nakłamać!)
- References (referencje)

**Mechanika Kłamstwa:**
- Gracz może zwiększyć swoje skills/experience
- Im więcej kłamstw, tym wyższy "Suspicion Meter" (0-100%)
- Suspicion wpływa na trudność rozmowy kwalifikacyjnej

### 2. **Suspicion Meter**
```
Suspicion: 0-20% = Low (łatwa rozmowa)
Suspicion: 21-40% = Medium (normalna rozmowa)
Suspicion: 41-60% = High (trudna rozmowa)
Suspicion: 61-80% = Very High (bardzo trudna)
Suspicion: 81-100% = Extreme (prawie niemożliwa)
```

**Ale paradoks:**
- Wyższy suspicion = trudniejsza rozmowa
- ALE wyższy suspicion = większa szansa że CV zostanie rozpatrzone!
- Bo CV wygląda lepiej na papierze

### 3. **Rozmowa Kwalifikacyjna (Mini-Game)**

**Typ 1: Question & Answer**
- 5-10 pytań od rekrutera
- Gracz wybiera odpowiedzi (3 opcje)
- Każda odpowiedź ma success rate bazowany na:
  - Prawdziwe skills gracza
  - Kłamstwa w CV (jeśli nakłamał, trudniej odpowiedzieć)
  - Charisma
  - Intelligence

**Typ 2: Skill Test**
- Praktyczny test umiejętności
- Np. dla programisty: rozwiąż problem kodowania
- Dla managera: case study
- Difficulty bazowany na suspicion

**Typ 3: Behavioral Interview**
- Pytania o zachowanie w sytuacjach
- "Co byś zrobił gdyby..."
- Odpowiedzi wpływają na final score

### 4. **Konsekwencje Kłamstwa**

**Jeśli gracz NAKŁAMAŁ i DOSTAŁ PRACĘ:**
- Pierwsze 15-30 dni = "Probation Period"
- Performance rating spada szybciej (-5 zamiast -1)
- Musi utrzymać rating 70%+ przez cały okres
- Jeśli nie utrzyma - FIRED!
- Jeśli utrzyma - kłamstwo "zaakceptowane", normalna praca

**Jeśli gracz NIE NAKŁAMAŁ:**
- Normalna praca od razu
- Brak probation period
- Standardowe performance tracking

### 5. **Szansa na Lepsze Stanowisko**

Jeśli gracz nakłamał dużo (suspicion 60%+):
- 15% szansa na ofertę wyższego stanowiska
- "Wow, your CV is impressive! We'd like to offer you Senior position instead!"
- Ale wtedy probation period jest dłuższy (30-45 dni)
- I wymagania performance wyższe (80%+)

---

## 🔧 Implementacja

### Komponenty do Stworzenia:
1. `CVBuilderModal.tsx` - Modal z edycją CV
2. `InterviewMiniGame.tsx` - Mini-gra rozmowy kwalifikacyjnej
3. `ProbationPeriodTracker.tsx` - Tracker okresu próbnego

### Akcje do Dodania:
1. `submitJobApplication()` - Wysłanie CV
2. `conductInterview()` - Przeprowadzenie rozmowy
3. `checkProbationStatus()` - Sprawdzenie statusu probation

### Pola w Bazie Danych:
```typescript
Character {
  // Dodać:
  onProbation: boolean
  probationEndsAt: DateTime?
  probationPerformanceRequired: number
  liedOnResume: boolean
}

JobApplication {
  // Nowa tabela
  id: string
  characterId: string
  jobId: string
  cvData: Json // Dane CV
  suspicionLevel: number
  interviewScore: number
  status: 'PENDING' | 'INTERVIEW' | 'ACCEPTED' | 'REJECTED'
}
```

---

## ❓ Pytania do Ciebie

Zanim zacznę implementację, potrzebuję potwierdzenia:

1. **Mini-game rozmowy** - który typ wolisz?
   - A) Question & Answer (wybór odpowiedzi)
   - B) Skill Test (praktyczne zadania)
   - C) Mix obu

2. **Probation Period** - jak surowy?
   - A) 15 dni, 70%+ performance
   - B) 30 dni, 75%+ performance
   - C) Zależy od poziomu kłamstwa (więcej kłamstw = dłuższy okres)

3. **Konsekwencje zwolnienia** - co się dzieje?
   - A) Tylko strata pracy
   - B) Strata pracy + bad reference (trudniej dostać następną)
   - C) Strata pracy + możliwy blacklist w branży

**Odpowiedz na te 3 pytania, a zacznę implementację!**
