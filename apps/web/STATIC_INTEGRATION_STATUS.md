# Static HTML Integration Status

> **Last Updated**: 2026-01-29
> **Source Folder**: `apps/web/nari-swasthya-complete/`
> **Target**: React/TypeScript (`apps/web/src/`)

---

## 📊 Executive Summary

| Status | Count | Percentage |
|--------|-------|------------|
| ✅ Completed | 1 | 3% |
| 🔄 In Progress | 0 | 0% |
| ⏳ Pending | 29 | 97% |

---

## ✅ Completed Pages

### 1. FertilityJourney.tsx (from fertility.html)
- **HTML Source**: `fertility.html` (3,635 lines)
- **TSX Target**: `src/component/pages/FertilityJourney.tsx`
- **Complexity**: HIGH
- **Key Features Implemented**:
  - Interactive Body Simulator with day slider (1-28)
  - Real-time hormone level tracking (Estrogen, LH, Progesterone)
  - 4 cycle phase cards (Menstrual, Follicular, Ovulation, Luteal)
  - Lifestyle modifier buttons (Stress, Sleep, Diet)
  - Auto-play cycle simulation
  - 6 tracking method cards
  - 6 optimization tip cards
  - When to consult specialist section
  - CTA with navigation to appointments
- **Animations Preserved**:
  - Hormone bar transitions
  - Phase card hover effects
  - Factor button toggle animations
- **Color Mapping**:
  - All static colors replaced with project tokens
  - Phase colors use `--accent-light-*` variants

---

## 🔄 In Progress Pages

*None currently*

---

## ⏳ Pending Pages (29 Total)

### Priority 1: Core Journey Pages (Enhance Existing)
| HTML File | TSX Target | Complexity | Notes |
|-----------|------------|------------|-------|
| `pregnancy.html` | `PregnancyJourney.tsx` | MEDIUM | Has trimester guide, nutrition, care schedule |
| `menopause.html` | *NEW: MenopauseJourney.tsx* | HIGH | 4,894 lines, body scanner, stage calculator |
| `perinatal_depression_enhanced.html` | *NEW: PerinatalDepressionJourney.tsx* | HIGH | 2,198 lines, brain viz, symptom severity cards |

### Priority 2: New Feature Pages
| HTML File | TSX Target | Complexity | Notes |
|-----------|------------|------------|-------|
| `vaccination.html` | *NEW: Vaccination.tsx* | MEDIUM | Scheduler, vaccine tracking |
| `vaccination-scheduler.html` | *Merge with above* | MEDIUM | Date picker, reminders |
| `symptom-checker.html` | `SymptomChecker.tsx` | MEDIUM | Already has TSX, may need enhancement |
| `screening.html` | *NEW: Screening.tsx* | MEDIUM | Health screening guides |
| `find-doctors.html` | *NEW: FindDoctors.tsx* | MEDIUM | Doctor directory, filters |
| `teleconsultation.html` | *Merge with Appointments* | LOW | Video consult setup |
| `government-schemes.html` | *NEW: GovernmentSchemes.tsx* | MEDIUM | Benefits/schemes info |
| `insurance.html` | *Merge with Products* | MEDIUM | Insurance plans |
| `research.html` | *NEW: Research.tsx* | LOW | Research articles |

### Priority 3: Mental Health Section
| HTML File | TSX Target | Complexity | Notes |
|-----------|------------|------------|-------|
| `depression.html` | *Merge with MentalWellnessJourney* | MEDIUM | Depression info |
| `perinatal_family_guide.html` | *NEW: FamilyGuide.tsx* | MEDIUM | Family support guide |
| `perinatal_journey.html` | *Merge with PostpartumJourney* | MEDIUM | Perinatal care |

### Priority 4: Index/Navigation Pages
| HTML File | TSX Target | Complexity | Notes |
|-----------|------------|------------|-------|
| `index.html` | `Landing.tsx` | HIGH | Main landing, already exists |
| `index_new.html` | *Skip or merge* | - | Duplicate |
| `journeys.html` | `Journeys.tsx` | LOW | Already exists |
| `about.html` | *NEW: About.tsx* | LOW | About page |
| `services.html` | *NEW: Services.tsx* | LOW | Services listing |

### Priority 5: Auth/Dashboard
| HTML File | TSX Target | Complexity | Notes |
|-----------|------------|------------|-------|
| `login.html` | *Auth handled by context* | LOW | Skip - app has auth |
| `dashboard.html` | `Dashboard.tsx` | MEDIUM | User dashboard |
| `community.html` | `Community.tsx` | LOW | Already exists |
| `products.html` | `Products.tsx` | LOW | Already exists |

### Skip/Deprecated
| HTML File | Reason |
|-----------|--------|
| `fertility_OLD.html` | Deprecated version |
| `perinatal_depression_guide_old.html` | Deprecated version |
| `research copy.html` | Duplicate |
| `cosmetic_surgery_guide.html` | Off-topic for current scope |
| `assets/partials.html` | Template partials, not a page |

---

## 🎨 Technical Decisions

### Styling Strategy
- **Approach**: CSS Modules for isolation
- **Shared Styles**: `StaticIntegration.module.css` (685 lines)
- **Integration**: Import alongside `landing.module.css`

### Animation System
- **Method**: CSS Keyframe animations + React state transitions
- **Preserved From Static**:
  - `morphPulse`, `pulseGlow`, `titleShimmer`
  - Card hover animations with `cubic-bezier` easing
  - Bar fill transitions for hormone levels

### Color Mapping Approach
| Static Color | Project Token |
|--------------|---------------|
| `#E30B5D` | `var(--pink-primary)` |
| `#7A1FA2` | `var(--theme-hero-end)` |
| `#fff7fb` | `var(--bg-cream)` |
| `#1f2330` | `var(--text-primary)` |
| `#e74c3c` | `var(--pink-primary)` |
| `#f39c12` | `var(--accent-orange)` |
| `#27ae60` | `var(--accent-green)` |
| `#3498db` | `var(--accent-blue)` |

---

## 📝 Next Recommended Steps

### Immediate (Current Session)
1. ✅ Create `STATIC_INTEGRATION_STATUS.md` (this file)
2. 🔄 Enhance `PregnancyJourney.tsx` with content from `pregnancy.html`
3. 🔄 Create `MenopauseJourney.tsx` from `menopause.html`
4. 🔄 Create `PerinatalDepressionJourney.tsx` (Mental health focus)
5. 🔄 Create `Vaccination.tsx` and `VaccinationScheduler.tsx`

### Short Term
6. Add new routes to `Routes.tsx` for new pages
7. Update `Journeys.tsx` cards to link to new journeys
8. Enhance `SymptomChecker.tsx` with static content
9. Create `FindDoctors.tsx` with directory features

### Final
10. Run full build verification
11. Delete `nari-swasthya-complete` folder
12. Visual regression testing
13. Update this status document to 100%

---

## 📁 Files Created/Modified

### New Files
- `src/styles/common/StaticIntegration.module.css`
- `src/component/pages/FertilityJourney.tsx` (enhanced)

### Files To Be Created
- `src/component/pages/MenopauseJourney.tsx`
- `src/component/pages/PerinatalDepressionJourney.tsx`
- `src/component/pages/Vaccination.tsx`
- `src/component/pages/FindDoctors.tsx`
- `src/component/pages/GovernmentSchemes.tsx`
- `src/component/pages/About.tsx`

---

## ✓ Validation Checklist

For each completed page:
- [ ] No TypeScript errors (`npm run build`)
- [ ] No unused CSS
- [ ] No broken assets/images
- [ ] Layout parity with HTML source
- [ ] Animations preserved
- [ ] Responsive behavior intact
- [ ] Colors use project tokens only
- [ ] Navigation links work
