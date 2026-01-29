// ============================================
// PERINATAL JOURNEY - INTERACTIVE JS
// ============================================

// ============================================
// BODY SYSTEMS DATA (Enhanced from original)
// ============================================
const bodySystemsData = {
  brain: {
    name: "Brain Structure & Chemistry",
    subtitle: "Neurological & Hormonal Impact",
    icon: "fa-brain",
    color: "#5c6bc0",
    prenatal: {
      description: "Pregnancy triggers profound neurological changes. Hormones cause 'synaptic pruning' in the prefrontal cortex and hippocampus—areas controlling memory and executive function—resulting in the well-documented 'pregnancy brain' or cognitive fog. However, this restructuring isn't deterioration; it's adaptive remodeling that enhances maternal circuitry in regions like the medial prefrontal cortex, which governs empathy and threat detection. High progesterone (up to 10x normal levels) acts as a sedative on GABA receptors, causing profound fatigue. Simultaneously, cortisol levels rise 2-4x normal, creating a paradoxical state of exhaustion and anxiety.",
      symptoms: [
        "Brain Fog",
        "Memory Loss",
        "Fatigue",
        "Anxiety",
        "Emotional Lability",
        "Executive Dysfunction",
        "Nesting Instinct"
      ]
    },
    postnatal: {
      description: "The postpartum period represents one of the most dramatic neuroendocrine transitions in human physiology. Estrogen and progesterone plummet to near-zero within 24 hours of birth—a hormonal crash more severe than any natural process except menopause, but occurring 100x faster. This sudden withdrawal strips away the neuroprotective effects these hormones provided during pregnancy. The result: inflammation surges in the brain, particularly in the amygdala (fear/threat center) and anterior cingulate cortex (emotional regulation). This creates a state of hypervigilance—constantly scanning for threats to the baby—which, when combined with sleep deprivation, becomes pathological.",
      symptoms: [
        "Hyper-vigilance",
        "Severe Insomnia",
        "Intrusive Thoughts",
        "Weepiness",
        "Emotional Numbness",
        "Anhedonia",
        "Rage Episodes",
        "Suicidal Ideation",
        "Bonding Difficulty",
        "Memory Impairment"
      ]
    }
  },
  
  heart: {
    name: "Cardiovascular System",
    subtitle: "Circulatory System Under Load",
    icon: "fa-heart-pulse",
    color: "#ef5350",
    prenatal: {
      description: "Pregnancy demands extraordinary cardiovascular adaptation. Blood volume increases by 40-50% (about 1.5 liters) to perfuse the placenta and meet fetal oxygen demands. Cardiac output rises by 30-50%, meaning the heart pumps significantly more blood per minute—equivalent to the workload of moderate continuous exercise. The expanding uterus displaces the diaphragm upward, compressing the lungs and reducing breathing capacity by 20%, causing shortness of breath even at rest. Heart rate increases by 10-20 beats per minute. These changes create physical sensations identical to anxiety: racing heart, chest tightness, breathlessness, and dizziness.",
      symptoms: [
        "Palpitations",
        "Tachycardia",
        "Dizziness",
        "Shortness of Breath",
        "Chest Tightness",
        "Orthostatic Hypotension",
        "Panic-like Symptoms"
      ]
    },
    postnatal: {
      description: "The cardiovascular system undergoes rapid, dramatic reversal postpartum. The body must shed the extra 1.5 liters of blood volume, primarily through massive fluid shifts manifesting as night sweats (soaking through clothes and sheets) and increased urination. This diuresis begins within hours of birth and peaks around day 3-5. The sudden fluid redistribution can cause significant edema (swelling) in the hands, feet, and face before it resolves. Blood pressure can become unstable—sometimes spiking dangerously (postpartum preeclampsia) or dropping too low. The physical sensations of these shifts—rapid heartbeat, chest pressure, sweating, shakiness—are virtually indistinguishable from panic attacks.",
      symptoms: [
        "Profuse Night Sweats",
        "Panic Sensations",
        "Edema Shifts",
        "Blood Pressure Instability",
        "Palpitations",
        "Breathlessness",
        "Chest Pain",
        "Shakiness"
      ]
    }
  },
  
  stomach: {
    name: "Gut-Brain Axis",
    subtitle: "Digestive & Metabolic Disruption",
    icon: "fa-utensils",
    color: "#ffa726",
    prenatal: {
      description: "The gut-brain connection becomes profoundly disrupted during pregnancy. Rising hCG (human chorionic gonadotropin) in early pregnancy triggers nausea and vomiting—'morning sickness' affects 70-80% of pregnancies. Progesterone relaxes smooth muscle throughout the body, slowing gut motility to maximize nutrient absorption for the fetus, but causing constipation, bloating, and gastroesophageal reflux (heartburn). The gut produces 90% of the body's serotonin (a key mood regulator), but this production becomes dysregulated during pregnancy. Gut inflammation, common in pregnancy, reduces serotonin synthesis and increases inflammatory cytokines that can cross the blood-brain barrier and affect mood.",
      symptoms: [
        "Nausea",
        "Vomiting",
        "Heartburn/GERD",
        "Constipation",
        "Bloating",
        "Food Aversions",
        "Metallic Taste",
        "Gut Dysbiosis"
      ]
    },
    postnatal: {
      description: "Postpartum digestive and metabolic changes significantly impact mental health. Stress hormones (cortisol, adrenaline) can completely shut down appetite—a phenomenon called stress-induced anorexia—leaving new mothers unable to eat despite knowing they need nutrition. Conversely, some experience intense emotional eating, using food to cope with overwhelming stress. The gut microbiome undergoes further disruption postpartum, especially with antibiotics or stress response. Since gut bacteria produce neurotransmitter precursors and communicate directly with the brain via the vagus nerve, this dysbiosis directly impacts mood, anxiety, and cognitive function. For breastfeeding mothers, producing milk burns 300-500 calories daily and requires significant protein, calcium, and hydration.",
      symptoms: [
        "Appetite Loss",
        "Stress-Induced Anorexia",
        "Comfort Eating",
        "Gut Inflammation",
        "Microbiome Disruption",
        "Blood Sugar Swings",
        "Severe Constipation",
        "Dehydration",
        "Nutritional Deficiency"
      ]
    }
  },
  
  uterus: {
    name: "Reproductive System",
    subtitle: "Uterine & Pelvic Floor Transformation",
    icon: "fa-baby",
    color: "#ec407a",
    prenatal: {
      description: "The uterus undergoes one of the most dramatic transformations in the human body, expanding from the size of a pear (50g) to accommodate a full-term baby, placenta, and amniotic fluid—growing approximately 500 times its original size to about 1100g. This expansion stretches abdominal muscles (often causing diastasis recti), ligaments (round ligament pain), and skin. The growing uterus presses on the bladder, causing frequent urination and urgency, disrupting sleep 3-5+ times per night. Pelvic pressure increases throughout pregnancy as the baby descends, causing heaviness, difficulty walking, and pubic symphysis dysfunction. The physical discomfort limits mobility, exercise capacity, and sleep quality—all protective factors against depression.",
      symptoms: [
        "Pelvic Pain",
        "Round Ligament Pain",
        "Frequent Urination",
        "Nocturia",
        "Mobility Loss",
        "Diastasis Recti",
        "Pubic Symphysis Dysfunction",
        "Body Image Distress"
      ]
    },
    postnatal: {
      description: "The postpartum uterus undergoes involution—shrinking from watermelon-size back to pear-size over 6-8 weeks through powerful, often painful contractions called 'afterpains.' These intensify during breastfeeding and are significantly more painful with subsequent births. Lochia—vaginal bleeding and discharge as the uterine lining sheds—lasts 4-6 weeks. For vaginal births, perineal trauma is nearly universal: 90% of first-time mothers experience tearing or episiotomy. Even 'minor' tears cause significant pain. C-section mothers contend with major abdominal surgery recovery. Both birth types can result in urinary incontinence, affecting 30-50% of postpartum women. The combination of pain, bleeding, incontinence, and restricted mobility profoundly impacts mood, self-esteem, and sense of bodily integrity.",
      symptoms: [
        "Afterpains",
        "Cramping",
        "Lochia (Heavy Bleeding)",
        "Perineal Tears",
        "C-section Pain",
        "Urinary Incontinence",
        "Pelvic Floor Dysfunction",
        "Body Dysmorphia",
        "Feeling 'Broken'",
        "Painful Intercourse"
      ]
    }
  },
  
  hormones: {
    name: "Endocrine System",
    subtitle: "Hormonal Orchestration & Collapse",
    icon: "fa-vial",
    color: "#ab47bc",
    prenatal: {
      description: "Pregnancy is an endocrine symphony of staggering complexity. Estrogen increases 100-fold, progesterone 10-15 fold, prolactin rises steadily, and the placenta produces unique hormones. These hormones coordinate fetal development, but profoundly affect maternal brain chemistry. Estrogen is generally mood-stabilizing, but rapid fluctuations can trigger anxiety or depression. Progesterone metabolites like allopregnanolone normally reduce anxiety, but genetic variations in how women process these metabolites may increase depression risk. The HPA axis (stress response) becomes less reactive during healthy pregnancy, but in women who develop prenatal depression, this adaptation may fail. Thyroid hormone requirements increase by 30-50%; if the thyroid can't keep up, hypothyroidism develops.",
      symptoms: [
        "Estrogen Surge",
        "Progesterone Elevation",
        "Cortisol Dysregulation",
        "Thyroid Dysfunction",
        "Insulin Resistance",
        "Hormone Sensitivity",
        "Mood Swings"
      ]
    },
    postnatal: {
      description: "The postpartum hormonal crash is unparalleled in medicine. Within 24 hours of placenta delivery, estrogen and progesterone plummet from pregnancy peaks to near-menopausal levels—a hormonal freefall 100 times faster than natural menopause. Prolactin surges to support lactation, but this further suppresses estrogen in breastfeeding mothers, potentially prolonging mood symptoms. Oxytocin pulses with breastfeeding, theoretically promoting bonding, but the system can become dysregulated in depression. The HPA axis, suppressed during pregnancy, rebounds with a vengeance—cortisol can spike to levels seen in major depression or PTSD. Thyroid function commonly becomes disrupted (postpartum thyroiditis affects 5-10% of women), causing either hyperthyroidism or hypothyroidism.",
      symptoms: [
        "Estrogen Crash",
        "Progesterone Withdrawal",
        "Prolactin Surge",
        "Cortisol Spikes",
        "Oxytocin Dysregulation",
        "Thyroid Dysfunction",
        "Postpartum Thyroiditis",
        "Hormone Withdrawal"
      ]
    }
  },
  
  immune: {
    name: "Immune System",
    subtitle: "Inflammatory Response & Infection Risk",
    icon: "fa-shield-virus",
    color: "#26a69a",
    prenatal: {
      description: "Pregnancy requires a delicate immune balance: the mother's immune system must tolerate the fetus (which is genetically half 'foreign') without rejecting it, while still protecting both mother and baby from infection. This is achieved through a shift toward anti-inflammatory immune responses. However, this immunomodulation has psychological consequences. Inflammatory cytokines (immune signaling molecules like IL-6, TNF-alpha) can cross the blood-brain barrier and directly affect neurotransmitter metabolism, particularly reducing serotonin and increasing vulnerability to depression. Some women experience paradoxical immune activation during pregnancy, with elevated inflammatory markers correlating strongly with prenatal depression and anxiety.",
      symptoms: [
        "Immune Suppression",
        "Inflammatory Cytokines",
        "Infection Susceptibility",
        "Autoimmune Flares",
        "Chronic Inflammation",
        "Cytokine-Induced Depression"
      ]
    },
    postnatal: {
      description: "The postpartum immune system undergoes dramatic rebound activation. The anti-inflammatory state of pregnancy reverses rapidly, and the immune system can overshoot, triggering autoimmune phenomena. Inflammatory markers spike in the early postpartum period, correlating directly with depression severity—postpartum depression is increasingly understood as having a significant inflammatory component. Birth itself triggers an acute inflammatory response. Infections are common: mastitis (breast infection) affects 10-20% of breastfeeding mothers; endometritis (uterine infection) is more common after C-section; wound infections can occur. Each infection requires antibiotics and triggers inflammatory cascades that worsen mood symptoms. Sleep deprivation itself is pro-inflammatory.",
      symptoms: [
        "Immune Rebound",
        "Autoimmune Activation",
        "Mastitis",
        "Endometritis",
        "Wound Infections",
        "Inflammatory Cytokines",
        "Infection-Triggered Depression",
        "Chronic Inflammation"
      ]
    }
  },
  
  sleep: {
    name: "Sleep Architecture",
    subtitle: "Circadian Rhythm & Rest Disruption",
    icon: "fa-bed",
    color: "#42a5f5",
    prenatal: {
      description: "Sleep becomes increasingly disrupted as pregnancy progresses. First trimester fatigue is overwhelming—progesterone acts as a sedative, and the metabolic demands of creating a placenta and fetus exhaust the body. Yet many women experience insomnia even while fatigued. By the third trimester, physical discomfort makes restful sleep nearly impossible: the growing belly makes finding comfortable positions difficult, fetal movement wakes the mother, frequent urination interrupts sleep 3-5+ times nightly, heartburn worsens when lying down, and anxiety about labor causes rumination. Sleep architecture changes: REM sleep (crucial for emotional processing) decreases, while slow-wave sleep (deep, restorative) is fragmented. Poor sleep quality during pregnancy is one of the strongest predictors of postpartum depression.",
      symptoms: [
        "Insomnia Despite Fatigue",
        "Frequent Nighttime Urination",
        "Physical Discomfort",
        "Fetal Movement Disruption",
        "Leg Cramps",
        "Sleep Apnea",
        "REM Sleep Reduction",
        "Anxiety-Related Insomnia"
      ]
    },
    postnatal: {
      description: "Postpartum sleep deprivation is not simply tiredness—it's a form of torture. Newborns feed every 2-3 hours around the clock, meaning mothers rarely get more than 1-2 hours of continuous sleep for weeks to months. This chronic sleep fragmentation prevents progression through normal sleep cycles, particularly blocking REM and slow-wave sleep. The consequences are catastrophic for mental health: sleep deprivation impairs emotional regulation, increases amygdala reactivity (everything feels like a threat), reduces hippocampal function (memory formation is impaired), and increases inflammatory cytokines. After just one night of total sleep deprivation, healthy individuals show mood symptoms equivalent to clinical depression. The circadian rhythm becomes completely dysregulated—there's no longer a clear day/night distinction.",
      symptoms: [
        "Severe Sleep Deprivation",
        "Sleep Fragmentation",
        "REM Deprivation",
        "Circadian Dysregulation",
        "Chronic Sleep Debt",
        "Conditioned Hyperarousal",
        "Memory Impairment",
        "Emotional Dysregulation",
        "Microsleeps"
      ]
    }
  },
  
  musculoskeletal: {
    name: "Musculoskeletal System",
    subtitle: "Structural Changes & Pain",
    icon: "fa-bone",
    color: "#8d6e63",
    prenatal: {
      description: "Pregnancy hormones, particularly relaxin, soften ligaments and connective tissue to allow the pelvis to expand for birth. However, this affects the entire body: joints become unstable, increasing injury risk and causing widespread joint pain. The spine undergoes dramatic changes: the growing belly shifts the center of gravity forward, creating compensatory lumbar lordosis (excessive lower back curve) and thoracic kyphosis (upper back rounding). This causes significant lower back pain (50-70% of pregnant women), upper back pain, and neck pain. The added weight (25-35 pounds on average) strains muscles and joints. Carpal tunnel syndrome is common. Pelvic girdle pain and symphysis pubis dysfunction cause sharp pain and difficulty walking. Chronic pain is exhausting, disrupts sleep, limits mobility and exercise, and directly affects mood.",
      symptoms: [
        "Lower Back Pain",
        "Pelvic Girdle Pain",
        "Sciatica",
        "Joint Instability",
        "Carpal Tunnel Syndrome",
        "Round Ligament Pain",
        "Reduced Mobility",
        "Chronic Pain"
      ]
    },
    postnatal: {
      description: "The postpartum musculoskeletal system faces compound challenges: recovering from pregnancy changes while adapting to new physical demands of infant care. The labor and birth process itself often causes acute injuries: coccyx (tailbone) fractures or bruising from pushing, pubic symphysis separation, severe muscle strains. The repetitive physical tasks of newborn care—constant lifting, carrying, feeding in awkward positions for hours, bending over cribs—strain the already-weakened core and back muscles. Diastasis recti (abdominal separation) persists postpartum in 60% of women at 6 weeks, causing lower back pain and pelvic instability. Breastfeeding positions often cause neck, shoulder, and upper back pain. C-section mothers have additional challenges: the rectus abdominis muscles are separated during surgery, significantly weakening core stability.",
      symptoms: [
        "Diastasis Recti",
        "Chronic Back Pain",
        "Pelvic Instability",
        "Coccyx Injury",
        "Repetitive Strain",
        "Neck/Shoulder Pain",
        "Core Weakness",
        "Chronic Pelvic Pain",
        "Pain-Depression Cycle"
      ]
    }
  },
  
  skin: {
    name: "Integumentary System",
    subtitle: "Skin & Hair Changes",
    icon: "fa-hand-sparkles",
    color: "#ffb74d",
    prenatal: {
      description: "Pregnancy hormones dramatically affect skin and hair. Hyperpigmentation is common: melasma (dark patches on the face, 'mask of pregnancy'), linea nigra (dark line down the abdomen), darkened areolas, and darkened existing scars. Some women experience acne flares while others see improvement. Stretch marks (striae gravidarum) develop in 50-90% of pregnancies as skin stretches beyond its elastic capacity, appearing as red or purple streaks on the abdomen, breasts, thighs, and hips. Skin becomes more sensitive, with increased reactions to products, heat rash, and pregnancy-specific rashes like PUPPP. Hair often becomes thicker and fuller during pregnancy. While these are 'cosmetic' changes, they significantly impact body image, self-esteem, and identity—factors closely linked to perinatal mood.",
      symptoms: [
        "Melasma",
        "Stretch Marks",
        "Acne",
        "Hyperpigmentation",
        "Skin Sensitivity",
        "PUPPP Rash",
        "Varicose Veins",
        "Body Image Distress"
      ]
    },
    postnatal: {
      description: "Postpartum skin changes can be psychologically devastating. Stretch marks, initially red or purple, fade to silver or white but remain permanently visible. The abdominal skin often remains loose and wrinkled ('deflated balloon' appearance) for months or permanently. C-section scars are permanent, often thick and numb. Melasma and hyperpigmentation slowly fade but can persist for months to years. The most distressing change for many women is postpartum hair loss (telogen effluvium): starting around 3-4 months postpartum, hair that was retained during pregnancy all sheds at once, causing alarming hair loss—handfuls in the shower, visible thinning, receding hairline. This can last 6-12 months. Breast changes are dramatic: during engorgement, breasts become rock-hard and painful; with breastfeeding, they fluctuate in size; nipples may crack and bleed. These cumulative changes can cause profound body dysmorphia.",
      symptoms: [
        "Postpartum Hair Loss",
        "Loose Abdominal Skin",
        "Permanent Stretch Marks",
        "C-section Scarring",
        "Melasma Persistence",
        "Breast Changes",
        "Nipple Trauma",
        "Body Dysmorphia",
        "Identity Crisis"
      ]
    }
  }
};

// ============================================
// GLOBAL STATE
// ============================================
let currentPhase = 'prenatal';
let selectedSystem = null;

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initializeFlowCanvas();
  initializeNavigation();
  initializePhaseToggle();
  initializeBodyMap();
  initializeScrollAnimations();
});

// ============================================
// FLOW CANVAS ANIMATION (HERO BACKGROUND)
// ============================================
function initializeFlowCanvas() {
  const canvas = document.getElementById('flowCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  const particles = [];
  const particleCount = 80;
  
  class FlowParticle {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.3;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(236, 64, 122, ${this.opacity})`;
      ctx.fill();
    }
  }
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new FlowParticle());
  }
  
  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(236, 64, 122, ${0.15 * (1 - distance / 120)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    connectParticles();
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

// ============================================
// NAVIGATION
// ============================================
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      link.classList.add('active');
      
      // Scroll to section
      const sectionId = link.getAttribute('href');
      scrollToSection(sectionId);
    });
  });
  
  // Mobile toggle (if implemented)
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
    });
  }
}

// ============================================
// PHASE TOGGLE
// ============================================
function initializePhaseToggle() {
  const phaseToggles = document.querySelectorAll('.phase-toggle');
  const phaseDescription = document.getElementById('phaseDescription');
  
  phaseToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      // Remove active from all
      phaseToggles.forEach(t => t.classList.remove('active'));
      
      // Add active to clicked
      toggle.classList.add('active');
      
      // Update current phase
      currentPhase = toggle.dataset.phase;
      
      // Update description
      if (phaseDescription) {
        if (currentPhase === 'prenatal') {
          phaseDescription.textContent = 'During pregnancy: hormones surge, body adapts';
        } else {
          phaseDescription.textContent = 'After birth: hormonal crash, recovery begins';
        }
      }
      
      // Update body map if a system is selected
      if (selectedSystem) {
        displaySystemDetails(selectedSystem);
      }
    });
  });
}

// ============================================
// BODY MAP INTERACTION
// ============================================
function initializeBodyMap() {
  const bodyParts = document.querySelectorAll('.body-part');
  
  bodyParts.forEach(part => {
    part.addEventListener('click', () => {
      const systemName = part.dataset.system;
      
      // Remove active from all parts
      bodyParts.forEach(p => p.classList.remove('active'));
      
      // Add active to clicked part
      part.classList.add('active');
      
      // Display system details
      displaySystemDetails(systemName);
      
      // Store selected system
      selectedSystem = systemName;
    });
  });
}

function displaySystemDetails(systemName) {
  const systemData = bodySystemsData[systemName];
  if (!systemData) return;
  
  const detailsContainer = document.getElementById('systemDetailsContent');
  const phaseData = currentPhase === 'prenatal' ? systemData.prenatal : systemData.postnatal;
  
  const html = `
    <div class="system-detail-card">
      <div class="system-header">
        <div class="system-icon-large" style="background: linear-gradient(135deg, ${systemData.color}, ${adjustColor(systemData.color, -20)});">
          <i class="fas ${systemData.icon}"></i>
        </div>
        <div class="system-title-group">
          <h3>${systemData.name}</h3>
          <p class="system-subtitle">${systemData.subtitle}</p>
        </div>
      </div>
      
      <div class="phase-tabs">
        <button class="phase-tab ${currentPhase === 'prenatal' ? 'active' : ''}" data-phase="prenatal">
          <i class="fas fa-baby"></i> Prenatal
        </button>
        <button class="phase-tab ${currentPhase === 'postnatal' ? 'active' : ''}" data-phase="postnatal">
          <i class="fas fa-child-reaching"></i> Postnatal
        </button>
      </div>
      
      <div class="phase-content active">
        <div class="phase-description-text">
          ${phaseData.description}
        </div>
        
        <h4 style="margin: 1.5rem 0 1rem; font-size: 1.2rem; color: var(--text-primary);">
          <i class="fas fa-notes-medical" style="color: ${systemData.color}; margin-right: 0.5rem;"></i>
          Common Symptoms
        </h4>
        <div class="symptom-tags">
          ${phaseData.symptoms.map(symptom => `
            <span class="symptom-tag">
              <i class="fas fa-check-circle"></i>
              ${symptom}
            </span>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  
  detailsContainer.innerHTML = html;
  
  // Add phase tab functionality
  const phaseTabs = detailsContainer.querySelectorAll('.phase-tab');
  phaseTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const newPhase = tab.dataset.phase;
      currentPhase = newPhase;
      
      // Update global phase toggle
      document.querySelectorAll('.phase-toggle').forEach(toggle => {
        toggle.classList.toggle('active', toggle.dataset.phase === newPhase);
      });
      
      // Re-render
      displaySystemDetails(systemName);
    });
  });
}

// Helper function to darken/lighten colors
function adjustColor(color, amount) {
  const num = parseInt(color.replace("#",""), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
  return "#" + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
}

// ============================================
// SMOOTH SCROLLING
// ============================================
function scrollToSection(sectionId) {
  const section = document.querySelector(sectionId);
  if (section) {
    const offset = 100; // Account for sticky nav
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

window.scrollToSection = scrollToSection;

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe all cards and sections
  const elementsToAnimate = document.querySelectorAll(
    '.stat-card, .event-card, .resource-card, .system-details-panel'
  );
  
  elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
}

// ============================================
// SCROLL INDICATOR HIDE ON SCROLL
// ============================================
window.addEventListener('scroll', () => {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    if (window.scrollY > 100) {
      scrollIndicator.style.opacity = '0';
    } else {
      scrollIndicator.style.opacity = '0.6';
    }
  }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Throttle resize events
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Trigger any necessary recalculations
    console.log('Resize complete');
  }, 250);
});

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================
// Add keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close any modals or reset selections
    const bodyParts = document.querySelectorAll('.body-part');
    bodyParts.forEach(p => p.classList.remove('active'));
  }
});

// ============================================
// UTILITY FUNCTIONS
// ============================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

console.log('Perinatal Journey initialized successfully');
