
// Data and Generators for Bone Health Journey

export const phaseData: any = {
  teens: {
    name: "Building Foundation",
    age: "Ages 12-19",
    icon: "fa-seedling",
    estrogen: { percent: 40, label: "Rising" },
    bone: { percent: 45, label: "Building" },
    joint: { percent: 90, label: "Excellent" },
    risk: "low",
    insights: [
      "Estrogen levels rising to adult levels",
      "Peak bone mass building (90% achieved by age 18)",
      "Critical time for calcium (1,300 mg/day) and exercise",
      "Weight-bearing activities strengthen bones for life",
      "Every calcium-rich meal deposits into bone bank"
    ]
  },
  twenties: {
    name: "Peak Strength",
    age: "Ages 20-39",
    icon: "fa-mountain",
    estrogen: { percent: 95, label: "Peak Levels" },
    bone: { percent: 100, label: "Maximum Density" },
    joint: { percent: 95, label: "Optimal" },
    risk: "low",
    insights: [
      "Peak bone mass achieved around age 30",
      "Estrogen at highest—protects bones and cartilage",
      "Bone remodeling balanced (formation = breakdown)",
      "Joints cushioned with thick articular cartilage",
      "Pregnancy/breastfeeding temporarily affect density"
    ]
  },
  forties: {
    name: "Transition Begins",
    age: "Ages 40-50",
    icon: "fa-exchange-alt",
    estrogen: { percent: 70, label: "Declining" },
    bone: { percent: 85, label: "Early Loss" },
    joint: { percent: 75, label: "Good" },
    risk: "moderate",
    insights: [
      "Estrogen begins fluctuating and declining",
      "Bone breakdown starts exceeding formation",
      "Early cartilage wear in weight-bearing joints",
      "May notice morning stiffness in joints",
      "URGENT: Intensify preventive measures NOW",
      "Consider baseline bone density screening"
    ]
  },
  menopause: {
    name: "Critical Window",
    age: "Ages 50-60",
    icon: "fa-exclamation-triangle",
    estrogen: { percent: 25, label: "Dramatic Drop" },
    bone: { percent: 65, label: "Rapid Loss" },
    joint: { percent: 55, label: "Declining" },
    risk: "high",
    insights: [
      "⚠️ DANGER ZONE: Estrogen drops 90% in first years",
      "Rapid bone loss: 2-5% per year (first 5-7 years)",
      "20% of bone density can be lost in this period",
      "Cartilage breakdown accelerates without estrogen",
      "Joint pain and stiffness become common",
      "Fracture risk rising significantly",
      "START TREATMENT IMMEDIATELY if osteopenia detected"
    ]
  },
  postmeno: {
    name: "Maintenance Era",
    age: "Ages 60+",
    icon: "fa-shield-alt",
    estrogen: { percent: 15, label: "Minimal" },
    bone: { percent: 50, label: "Continued Loss" },
    joint: { percent: 40, label: "Compromised" },
    risk: "high",
    insights: [
      "Bone loss continues at slower rate (1% per year)",
      "Cumulative effect: bones very porous and brittle",
      "High fracture risk from minor falls or activities",
      "Multiple joints affected by osteoarthritis",
      "Fall prevention becomes #1 priority",
      "✅ Treatment STILL works! Can improve density 5-10%",
      "Every year counts—never too late to start"
    ]
  },
  treatment: {
    name: "With Treatment",
    age: "Any Age with Therapy",
    icon: "fa-pills",
    estrogen: { percent: 25, label: "Stabilized" },
    bone: { percent: 75, label: "Improving" },
    joint: { percent: 65, label: "Protected" },
    risk: "moderate",
    insights: [
      "✅ Medications slow bone loss by 50-70%",
      "✅ Can INCREASE bone density 5-10% over 3-5 years",
      "✅ Fracture risk reduced by 50-70%",
      "Bisphosphonates stop bone-destroying cells",
      "Calcium + Vitamin D strengthen bone-building",
      "Exercise + medication = best results",
      "Treatment works at ANY age - never too late!"
    ]
  }
};

export const topicsData = [
  {
    id: 1,
    icon: 'microscope',
    title: 'Understanding the Diseases',
    summary: 'What happens inside your bones and joints',
    content: `
      <h4>Osteoporosis: The Silent Bone Thief</h4>
      <ul class="compact-list">
        <li>Bones become porous, weak, and brittle</li>
        <li>Honeycomb structure develops with holes and spaces</li>
        <li>No symptoms until fracture occurs ("silent disease")</li>
        <li>Affects 1 in 3 women over 50</li>
      </ul>
      <h4 style="margin-top:1rem">Osteoarthritis: Cartilage Breakdown</h4>
      <ul class="compact-list">
        <li>Protective cartilage cushion wears away</li>
        <li>Bones start rubbing directly against each other</li>
        <li>Causes pain, stiffness, swelling, bone spurs</li>
        <li>Most common in knees, hips, hands, spine</li>
      </ul>
    `
  },
  {
    id: 2,
    icon: 'venus',
    title: 'The Estrogen Connection',
    summary: 'How hormones protect your skeleton',
    content: `
      <h4>Estrogen's Protective Role</h4>
      <ul class="compact-list">
        <li>Directly inhibits bone-breaking cells (osteoclasts)</li>
        <li>Maintains cartilage thickness and joint lubrication</li>
        <li>Regulates calcium absorption and bone formation</li>
        <li>Protects against inflammation in joints</li>
      </ul>
      <h4 style="margin-top:1rem">When Estrogen Drops (Menopause)</h4>
      <ul class="compact-list">
        <li>Bone breakdown accelerates dramatically</li>
        <li>Can lose 20% bone density in first 5-7 years</li>
        <li>Joint cartilage degenerates faster</li>
        <li>This is WHY women are 4x more likely than men</li>
      </ul>
    `
  },
  {
    id: 3,
    icon: 'exclamation-triangle',
    title: 'Risk Factors',
    summary: 'What puts you in danger',
    critical: true,
    content: `
      <h4>Non-Modifiable Risks</h4>
      <ul class="compact-list">
        <li>Being female (4x higher risk than men)</li>
        <li>Age over 50 / Post-menopausal status</li>
        <li>Family history of osteoporosis or fractures</li>
        <li>Small, thin body frame (BMI < 19)</li>
        <li>Asian or Caucasian ethnicity</li>
      </ul>
      <h4 style="margin-top:1rem">Modifiable Risks (YOU CAN CHANGE THESE!)</h4>
      <ul class="compact-list">
        <li>Calcium/Vitamin D deficiency</li>
        <li>Sedentary lifestyle / lack of exercise</li>
        <li>Smoking and excessive alcohol</li>
        <li>Low body weight / eating disorders</li>
        <li>Certain medications (steroids, antacids)</li>
      </ul>
    `
  },
  {
    id: 4,
    icon: 'stethoscope',
    title: 'Screening & Diagnosis',
    summary: 'How to detect problems early',
    content: `
      <h4>DEXA Scan (Bone Density Test)</h4>
      <ul class="compact-list">
        <li>Gold standard for measuring bone density</li>
        <li>Painless, low-radiation X-ray scan</li>
        <li>Gives T-score: -1 to -2.5 = osteopenia, < -2.5 = osteoporosis</li>
        <li>Recommended for all women 65+, or 50+ with risk factors</li>
      </ul>
      <h4 style="margin-top:1rem">When to Get Screened</h4>
      <ul class="compact-list">
        <li>Age 65+ (routine screening)</li>
        <li>Post-menopausal with risk factors</li>
        <li>Fracture from minor fall</li>
        <li>Long-term steroid use</li>
      </ul>
    `
  },
  {
    id: 5,
    icon: 'pills',
    title: 'Medical Treatments',
    summary: 'Medications that can help',
    content: `
      <h4>Bisphosphonates (Most Common)</h4>
      <ul class="compact-list">
        <li>Slow bone breakdown (Alendronate, Risedronate)</li>
        <li>Can increase density 5-10% over 3-5 years</li>
        <li>Reduce fracture risk by 50%</li>
        <li>Side effects: GI issues, rare jaw problems</li>
      </ul>
      <h4 style="margin-top:1rem">Other Options</h4>
      <ul class="compact-list">
        <li>Hormone Replacement Therapy (HRT)</li>
        <li>RANK ligand inhibitors (Denosumab)</li>
        <li>Anabolic agents (Teriparatide - builds new bone)</li>
        <li>SERMs (Selective Estrogen Receptor Modulators)</li>
      </ul>
    `
  },
  {
    id: 6,
    icon: 'carrot',
    title: 'Nutrition Essentials',
    summary: 'Foods that build strong bones',
    content: `
      <h4>Calcium (1,200-1,500 mg/day)</h4>
      <ul class="compact-list">
        <li>Dairy: milk, yogurt, cheese</li>
        <li>Leafy greens: kale, collard greens, broccoli</li>
        <li>Fortified foods: orange juice, cereals, tofu</li>
        <li>Fish with bones: sardines, salmon</li>
      </ul>
      <h4 style="margin-top:1rem">Vitamin D (800-1,000 IU/day)</h4>
      <ul class="compact-list">
        <li>Sunlight exposure (15-20 min/day)</li>
        <li>Fatty fish: salmon, mackerel, tuna</li>
        <li>Egg yolks, fortified milk</li>
        <li>Supplements if levels low</li>
      </ul>
    `
  },
  {
    id: 7,
    icon: 'dumbbell',
    title: 'Exercise Programs',
    summary: 'Movement that strengthens bones',
    content: `
      <h4>Weight-Bearing Exercises</h4>
      <ul class="compact-list">
        <li>Walking, jogging, dancing, stair climbing</li>
        <li>Tennis, hiking, aerobics</li>
        <li>Forces bones to work against gravity</li>
        <li>Aim for 30 min, 5 days/week</li>
      </ul>
      <h4 style="margin-top:1rem">Resistance Training</h4>
      <ul class="compact-list">
        <li>Free weights, resistance bands, machines</li>
        <li>Builds muscle which pulls on bones</li>
        <li>2-3 sessions per week</li>
        <li>Focus on major muscle groups</li>
      </ul>
      <h4 style="margin-top:1rem">Balance & Flexibility</h4>
      <ul class="compact-list">
        <li>Yoga, tai chi, pilates</li>
        <li>Prevents falls and fractures</li>
        <li>Improves posture and coordination</li>
      </ul>
    `
  },
  {
    id: 8,
    icon: 'heartbeat',
    title: 'Lifestyle Modifications',
    summary: 'Daily habits that protect your bones',
    content: `
      <h4>Do These</h4>
      <ul class="compact-list">
        <li>Maintain healthy weight (BMI 18.5-24.9)</li>
        <li>Get adequate sleep (7-9 hours)</li>
        <li>Manage stress (chronic stress depletes bones)</li>
        <li>Stay socially active and engaged</li>
      </ul>
      <h4 style="margin-top:1rem">Avoid These</h4>
      <ul class="compact-list">
        <li>Smoking (doubles fracture risk)</li>
        <li>Excessive alcohol (>2 drinks/day)</li>
        <li>High caffeine intake (>4 cups coffee/day)</li>
        <li>Excessive salt (increases calcium loss)</li>
      </ul>
    `
  },
  {
    id: 9,
    icon: 'shield-alt',
    title: 'Fall Prevention',
    summary: 'Protecting yourself from fractures',
    content: `
      <h4>Home Safety Modifications</h4>
      <ul class="compact-list">
        <li>Remove tripping hazards (rugs, cords, clutter)</li>
        <li>Install grab bars in bathroom</li>
        <li>Improve lighting (especially stairs, hallways)</li>
        <li>Use non-slip mats in shower/tub</li>
        <li>Keep frequently used items within reach</li>
      </ul>
      <h4 style="margin-top:1rem">Personal Precautions</h4>
      <ul class="compact-list">
        <li>Wear proper footwear (no loose slippers)</li>
        <li>Use assistive devices if needed (cane, walker)</li>
        <li>Review medications with doctor (some cause dizziness)</li>
        <li>Get vision and hearing checked regularly</li>
      </ul>
    `
  },
  {
    id: 10,
    icon: 'hospital',
    title: 'When to Seek Help',
    summary: 'Warning signs requiring medical attention',
    critical: true,
    content: `
      <div class="emergencyBanner">
        <i class="fas fa-exclamation-triangle"></i>
        SEEK IMMEDIATE MEDICAL ATTENTION
      </div>
      <h4>Emergency Symptoms</h4>
      <ul class="compact-list criticalList">
        <li>Sudden, severe back pain</li>
        <li>Loss of height (>1.5 inches)</li>
        <li>Stooped posture developing</li>
        <li>Fracture from minor fall or injury</li>
        <li>Inability to bear weight on limb</li>
      </ul>
      <h4 style="margin-top:1rem">Schedule Appointment For</h4>
      <ul class="compact-list">
        <li>Persistent joint pain lasting >6 weeks</li>
        <li>Morning stiffness >30 minutes</li>
        <li>Joint swelling or warmth</li>
        <li>Decreased range of motion</li>
        <li>Family history + age >50</li>
      </ul>
    `
  }
];

export const topicCategories: any = {
  1: { category: 'Foundation', color: '#2196f3', emoji: '📚' },
  2: { category: 'Foundation', color: '#2196f3', emoji: '🧬' },
  3: { category: 'Assessment', color: '#ff9800', emoji: '⚠️' },
  4: { category: 'Assessment', color: '#ff9800', emoji: '🔍' },
  5: { category: 'Treatment', color: '#9c27b0', emoji: '💊' },
  6: { category: 'Lifestyle', color: '#4caf50', emoji: '🥗' },
  7: { category: 'Lifestyle', color: '#4caf50', emoji: '💪' },
  8: { category: 'Lifestyle', color: '#4caf50', emoji: '❤️' },
  9: { category: 'Prevention', color: '#f44336', emoji: '🛡️' },
  10: { category: 'Prevention', color: '#f44336', emoji: '🚨' }
};

export const bodyParts = [
  { id: 'spine', name: 'Spine', icon: 'spine' },
  { id: 'hip', name: 'Hip Joint', icon: 'bone' },
  { id: 'knee', name: 'Knee', icon: 'walking' },
  { id: 'wrist', name: 'Wrist', icon: 'hand-paper' }
];

export const generateSpine3D = (stage: string, styles: any) => {
  const colors: any = {
    healthy: { bone: '#f8bbd0', core: '#ec407a', fracture: '#4caf50' },
    early: { bone: '#ffcc80', core: '#ff9800', fracture: '#ff9800' },
    advanced: { bone: '#ef9a9a', core: '#e53935', fracture: '#d32f2f' },
    treatment: { bone: '#c8e6c9', core: '#66bb6a', fracture: '#4caf50' }
  };

  const c = colors[stage];
  const compression = stage === 'healthy' ? 0 : stage === 'early' ? 8 : stage === 'advanced' ? 18 : 5;
  const porosity = stage === 'healthy' ? 0 : stage === 'early' ? 15 : stage === 'advanced' ? 35 : 10;

  // Patient Info logic same as JS
  const patientInfo: any = {
    healthy: {
      title: "Strong, Dense Spine Bones",
      description: "Your vertebrae (spine bones) are solid and strong - like a stack of sturdy building blocks. The bone is thick and dense, with no weak spots.",
      simple: "Think of it like a brand new brick - solid all the way through!",
      riskInfo: "Very low chance of spine breaking from normal activities"
    },
    early: {
      title: "Bones Getting Weaker (Osteopenia)",
      description: "Your spine bones are starting to lose density - developing small holes inside like a sponge. The bones are thinner and starting to compress slightly.",
      simple: "Like a brick that's starting to get tiny holes - still strong, but not as solid",
      riskInfo: "Moderate risk - heavy lifting or falls could cause fractures"
    },
    advanced: {
      title: "Very Weak Bones (Osteoporosis)",
      description: "Your vertebrae have lost a lot of bone material - they're very porous and fragile. Some vertebrae may have already collapsed, making you shorter.",
      simple: "Like a brick that's full of holes - could break from just bending over or coughing",
      riskInfo: "HIGH RISK - Simple activities like hugging can cause fractures",
      impacts: [
        "Lost 1-3 inches of height from collapsed vertebrae",
        "Chronic back pain from compression fractures",
        "Stooped posture (dowager's hump)",
        "Can spread: Hip and wrist fractures become more likely"
      ]
    },
    treatment: {
      title: "Healing with Treatment",
      description: "Medications are helping rebuild bone density and preventing further loss. The bone-destroying cells are being blocked while bone-building cells work harder.",
      simple: "Like repairing that holey brick - filling in the holes and making it stronger!",
      riskInfo: "Risk REDUCED by 50-70% with proper treatment",
      benefits: [
        "Medications stop bone loss in 6-12 months",
        "Bone density can improve 5-10% over 3-5 years",
        "Spine fracture risk reduced by 70%",
        "You can rebuild strength at ANY age!"
      ]
    }
  };

  const info = patientInfo[stage];

  const rotatingViewClass = stage === 'advanced' ? styles.rotatingView : '';
  const breathingAnimationClass = stage === 'healthy' ? styles.breathingAnimation : '';

  const svg = `
      <svg viewBox="0 0 450 565" style="width:100%;height:100%;" class="${rotatingViewClass} ${breathingAnimationClass}">
        <defs>
          <radialGradient id="bone3D_${stage}">
            <stop offset="0%" stop-color="#fff" stop-opacity="0.6"/>
            <stop offset="50%" stop-color="${c.bone}"/>
            <stop offset="100%" stop-color="${c.core}"/>
          </radialGradient>
          <filter id="glow3D_${stage}">
            <feGaussianBlur stdDeviation="5"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="shadow3D_${stage}">
            <feDropShadow dx="4" dy="4" stdDeviation="4" flood-opacity="0.4"/>
          </filter>
          <filter id="deepShadow">
            <feDropShadow dx="6" dy="6" stdDeviation="6" flood-opacity="0.5"/>
          </filter>
        </defs>
        
        <rect x="10" y="15" width="430" height="65" fill="white" rx="10" filter="url(#shadow3D_${stage})"/>
        <text x="225" y="40" font-size="18" fill="${c.core}" font-weight="700" text-anchor="middle">
          ${info.title}
        </text>
        <text x="225" y="62" font-size="12" fill="#666" text-anchor="middle" font-style="italic">
          ${info.simple}
        </text>
        
        ${[0, 1, 2, 3].map((i) => {
    const y = 130 + i * 85;
    const height = 65 - compression;
    const isCompressed = stage === 'advanced' && i === 2;

    return `
            <g class="${styles['depthLayer' + Math.min(i + 1, 3)]}">
              <ellipse cx="230" cy="${y + 8}" rx="70" ry="22" fill="#000" opacity="0.3" 
                       filter="url(#deepShadow)"/>
              
              <ellipse cx="225" cy="${y - height / 2}" rx="65" ry="20" 
                       fill="url(#bone3D_${stage})" stroke="${c.core}" stroke-width="3" 
                       filter="url(#shadow3D_${stage})"/>
              <rect x="160" y="${y - height / 2}" width="130" height="${height}" 
                    fill="url(#bone3D_${stage})" stroke="${c.core}" stroke-width="3" rx="8"/>
              <ellipse cx="225" cy="${y + height / 2}" rx="65" ry="20" 
                       fill="${c.bone}" stroke="${c.core}" stroke-width="3"/>
              
              <ellipse cx="200" cy="${y - height / 4}" rx="30" ry="15" fill="#fff" opacity="0.5"/>
              <ellipse cx="205" cy="${y}" rx="25" ry="12" fill="#fff" opacity="0.3"/>
              
              ${stage === 'treatment' ? `
                <ellipse cx="225" cy="${y}" rx="70" ry="${height / 2 + 5}" 
                         fill="none" stroke="#4caf50" stroke-width="2" opacity="0.6">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/>
                </ellipse>
                ${Array.from({ length: 8 }, (_, j) => {
      const angle = (j * 45) * Math.PI / 180;
      const px = 225 + Math.cos(angle) * 55;
      const py = y + Math.sin(angle) * (height / 2 + 5);
      return `
                    <circle cx="${px}" cy="${py}" r="3" fill="#4caf50" opacity="0.8">
                      <animate attributeName="r" values="2;4;2" dur="${1.5 + j * 0.1}s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="${1.5 + j * 0.1}s" repeatCount="indefinite"/>
                    </circle>
                  `;
    }).join('')}
              ` : ''}
              
              ${stage !== 'healthy' && stage !== 'treatment' ? `
                ${Array.from({ length: porosity }, () => {
      const px = 170 + Math.random() * 110;
      const py = y - height / 2 + Math.random() * height;
      const size = 2 + Math.random() * 3;
      return `
                    <circle cx="${px}" cy="${py}" r="${size}" fill="${c.fracture}" opacity="0.6">
                      <animate attributeName="opacity" values="0.4;0.8;0.4" dur="${1.5 + Math.random()}s" repeatCount="indefinite"/>
                    </circle>
                  `;
    }).join('')}
                
                ${i === 1 ? `
                  <line x1="280" y1="${y}" x2="320" y2="${y - 20}" stroke="#ff9800" stroke-width="2" marker-end="url(#arrow)"/>
                  <rect x="320" y="${y - 40}" width="110" height="35" fill="#fff3e0" rx="6" stroke="#ff9800" stroke-width="2"/>
                  <text x="375" y="${y - 28}" font-size="10" fill="#e65100" font-weight="700" text-anchor="middle">
                    Tiny holes forming
                  </text>
                  <text x="375" y="${y - 16}" font-size="8" fill="#e65100" text-anchor="middle">
                    (bone getting weak)
                  </text>
                ` : ''}
              ` : ''}
              
              ${isCompressed ? `
                <path d="M 170,${y} Q 225,${y + 12} 280,${y}" stroke="#d32f2f" stroke-width="4" 
                      fill="none" opacity="0.9" stroke-dasharray="6,4">
                  <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite"/>
                </path>
                <path d="M 180,${y - 8} L 270,${y + 8}" stroke="#d32f2f" stroke-width="3" 
                      opacity="0.8" stroke-linecap="round"/>
                <path d="M 190,${y - 12} L 260,${y + 12}" stroke="#d32f2f" stroke-width="3" 
                      opacity="0.7" stroke-linecap="round"/>
                
                <line x1="100" y1="${y}" x2="155" y2="${y}" stroke="#d32f2f" stroke-width="2" marker-end="url(#arrowRed)"/>
                <rect x="20" y="${y - 25}" width="75" height="50" fill="#ffebee" rx="6" stroke="#d32f2f" stroke-width="2"/>
                <text x="57" y="${y - 10}" font-size="9" fill="#c62828" font-weight="700" text-anchor="middle">
                  COLLAPSED
                </text>
                <text x="57" y="${y}" font-size="8" fill="#c62828" text-anchor="middle">
                  vertebra
                </text>
                <text x="57" y="${y + 10}" font-size="7" fill="#c62828" text-anchor="middle">
                  (crushed bone)
                </text>
              ` : ''}
              
              ${i === 0 && stage === 'healthy' ? `
                <line x1="280" y1="${y}" x2="320" y2="${y - 20}" stroke="#4caf50" stroke-width="2"/>
                <rect x="320" y="${y - 40}" width="110" height="35" fill="#e8f5e9" rx="6" stroke="#4caf50" stroke-width="2"/>
                <text x="375" y="${y - 28}" font-size="10" fill="#2e7d32" font-weight="700" text-anchor="middle">
                  Solid & Dense
                </text>
                <text x="375" y="${y - 16}" font-size="8" fill="#2e7d32" text-anchor="middle">
                  (no weak spots)
                </text>
              ` : ''}
              
              ${i < 3 ? `
                <ellipse cx="225" cy="${y + height / 2 + 12}" rx="58" ry="${stage === 'advanced' ? '6' : '8'}" 
                         fill="${stage === 'advanced' ? '#bdbdbd' : stage === 'treatment' ? '#90caf9' : '#64b5f6'}" 
                         opacity="${stage === 'advanced' ? '0.4' : '0.7'}" 
                         stroke="#666" stroke-width="1.5"/>
                ${i === 1 ? `
                  <text x="100" y="${y + height / 2 + 16}" font-size="8" fill="#666" font-style="italic">
                    Cushion disc
                  </text>
                ` : ''}
              ` : ''}
            </g>
          `;
  }).join('')}
        
        ${stage === 'advanced' ? `
          <g>
           <line x1="225" y1="465" x2="225" y2="495" class="${styles.spreadLine}" stroke="#f44336" stroke-width="3"/>
            <line x1="225" y1="495" x2="180" y2="525" class="${styles.spreadLine}" stroke="#f44336" stroke-width="2" marker-end="url(#arrowRed)"/>
            <line x1="225" y1="495" x2="270" y2="525" class="${styles.spreadLine}" stroke="#f44336" stroke-width="2" marker-end="url(#arrowRed)"/>
            
            <rect x="130" y="520" width="60" height="28" fill="#ffebee" rx="4" stroke="#f44336" stroke-width="2"/>
            <text x="160" y="535" font-size="9" fill="#c62828" font-weight="700" text-anchor="middle">Hip at risk</text>
            
            <rect x="260" y="520" width="70" height="28" fill="#ffebee" rx="4" stroke="#f44336" stroke-width="2"/>
            <text x="295" y="535" font-size="9" fill="#c62828" font-weight="700" text-anchor="middle">Wrist at risk</text>
          </g>
        ` : ''}
        
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#ff9800"/>
          </marker>
          <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#f44336"/>
          </marker>
          <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#4caf50"/>
          </marker>
        </defs>
      </svg>
    `;

  return {
    svg,
    title: info.title,
    description: info.description,
    simple: info.simple,
    riskInfo: info.riskInfo,
    impacts: info.impacts,
    benefits: info.benefits,
    stats: {
      bmd: stage === 'healthy' ? 'Normal (T-score: +0.5)' : stage === 'early' ? 'Osteopenia (T-score: -1.9)' : stage === 'treatment' ? 'Improving (T-score: -2.2)' : 'Osteoporosis (T-score: -3.2)',
      bmdClass: stage === 'healthy' ? styles.statGood : stage === 'treatment' ? styles.statModerate : stage === 'early' ? styles.statModerate : styles.statCritical,
      risk: stage === 'healthy' ? 'Very Low (3%)' : stage === 'early' ? 'Moderate (25%)' : stage === 'treatment' ? 'Reduced to 15%' : 'Very High (65%)',
      riskClass: stage === 'healthy' ? styles.statGood : stage === 'treatment' ? styles.statModerate : stage === 'early' ? styles.statModerate : styles.statCritical,
      cartilage: stage === 'healthy' ? 'Excellent - Full Disc Height' : stage === 'early' ? 'Mild Degeneration' : stage === 'treatment' ? 'Stabilized' : 'Severe Degeneration',
      cartClass: stage === 'healthy' ? styles.statGood : stage === 'treatment' ? styles.statModerate : stage === 'early' ? styles.statModerate : styles.statCritical
    },
    infoType: stage === 'healthy' ? 'good' : stage === 'treatment' ? 'good' : stage === 'advanced' ? 'critical' : ''
  };
};

export const generateHip3D = (stage: string, styles: any) => {
  const colors: any = {
    healthy: { bone: '#f8bbd0', core: '#ec407a', cartilage: '#64b5f6', fracture: '#4caf50', porosity: '#ff9800' },
    early: { bone: '#ffcc80', core: '#ff9800', cartilage: '#81c784', fracture: '#ff9800', porosity: '#f57c00' },
    advanced: { bone: '#ef9a9a', core: '#e53935', cartilage: '#e0e0e0', fracture: '#d32f2f', porosity: '#b71c1c' },
    treatment: { bone: '#c8e6c9', core: '#66bb6a', cartilage: '#81d4fa', fracture: '#4caf50', porosity: '#4caf50' }
  };

  const c = colors[stage];
  const cartilage = stage === 'healthy' ? 8 : stage === 'early' ? 4 : stage === 'advanced' ? 0 : 6;

  const patientInfo: any = {
    healthy: {
      title: "Strong Hip Joint",
      description: "Your hip joint has a thick cushion (cartilage) protecting the bones. The ball fits smoothly in the socket - no bone touching bone.",
      simple: "Like a well-oiled ball bearing - smooth movement, no grinding",
      riskInfo: "Very low chance of hip fracture from normal falls"
    },
    early: {
      title: "Hip Starting to Wear Out",
      description: "Your cartilage cushion is thinning - bones are getting closer together. You may feel stiffness in the morning or after sitting.",
      simple: "Like a car tire that's worn down halfway - still works but not as smooth",
      riskInfo: "Moderate risk - bad falls could break the hip",
      impacts: [
        "Morning stiffness lasting 20-30 minutes",
        "Pain when walking long distances",
        "Difficulty putting on shoes or socks"
      ]
    },
    advanced: {
      title: "Severe Hip Damage",
      description: "No cartilage left - bone grinding directly on bone. The hip is very fragile and could break from a simple fall.",
      simple: "Like two rough surfaces rubbing together - very painful and easily broken",
      riskInfo: "CRITICAL - Even minor falls can shatter the hip",
      impacts: [
        "Constant pain, even at rest",
        "Severe difficulty walking or standing",
        "Hip replacement surgery often needed",
        "If hip breaks: 20% chance of death within a year",
        "Can spread: Muscle weakness affects other joints"
      ]
    },
    treatment: {
      title: "Hip Protected by Treatment",
      description: "Medications are strengthening the hip bone and protecting remaining cartilage. Inflammation is reduced, pain is less.",
      simple: "Like adding protective coating to those stones - less friction, less pain",
      riskInfo: "Fracture risk reduced by 40-50%",
      benefits: [
        "Hip bone density increases 6-8% in 2 years",
        "Pain reduced by 50-70% with medication",
        "Better mobility and quality of life",
        "May delay or avoid hip replacement surgery"
      ]
    }
  };

  const info = patientInfo[stage];

  const svg = `
    <svg viewBox="0 0 450 480" style="width:100%;height:100%;" class="${stage === 'healthy' ? styles.breathingAnimation : stage === 'advanced' ? styles.rotatingView : stage === 'treatment' ? styles.treatmentGlow : ''}">
      <defs>
        <radialGradient id="hipBone3D_${stage}">
          <stop offset="0%" stop-color="#fff" stop-opacity="0.5"/>
          <stop offset="50%" stop-color="${c.bone}"/>
          <stop offset="100%" stop-color="${c.core}"/>
        </radialGradient>
        <linearGradient id="cartGrad_${stage}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${c.cartilage}" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="${c.cartilage}" stop-opacity="0.3"/>
        </linearGradient>
        <filter id="glow3D_${stage}">
          <feGaussianBlur stdDeviation="6"/>
          <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="shadow3D_${stage}">
          <feDropShadow dx="5" dy="5" stdDeviation="5" flood-opacity="0.4"/>
        </filter>
      </defs>
      
      <rect x="10" y="10" width="430" height="60" fill="white" rx="10" filter="url(#shadow3D_${stage})"/>
      <text x="225" y="35" font-size="18" fill="${c.core}" font-weight="700" text-anchor="middle">
        ${info.title}
      </text>
      <text x="225" y="55" font-size="12" fill="#666" text-anchor="middle" font-style="italic">
        ${info.simple}
      </text>
      
      <ellipse cx="230" cy="225" rx="92" ry="77" fill="#000" opacity="0.3"/>

      <ellipse cx="225" cy="220" rx="88" ry="73" fill="url(#hipBone3D_${stage})" stroke="${c.core}" stroke-width="4" filter="url(#shadow3D_${stage})"/>

      <ellipse cx="225" cy="220" rx="65" ry="55" fill="#fce4ec" opacity="0.4"/>
            
      ${cartilage > 0 ? `
        <ellipse cx="200" cy="${230 + cartilage / 2}" rx="22" ry="${cartilage}" 
                 fill="${c.cartilage}" opacity="${stage === 'advanced' ? '0.2' : stage === 'early' ? '0.5' : '0.8'}" 
                 stroke="${c.cartilage}" stroke-width="2">
          ${stage === 'healthy' ? `<animate attributeName="ry" values="${cartilage};${cartilage + 0.5};${cartilage}" dur="4s" repeatCount="indefinite"/>` : ''}
        </ellipse>
        <ellipse cx="240" cy="${230 + cartilage / 2}" rx="22" ry="${cartilage}" 
                 fill="${c.cartilage}" opacity="${stage === 'advanced' ? '0.2' : stage === 'early' ? '0.5' : '0.8'}" 
                 stroke="${c.cartilage}" stroke-width="2">
          ${stage === 'healthy' ? `<animate attributeName="ry" values="${cartilage};${cartilage + 0.5};${cartilage}" dur="4s" repeatCount="indefinite"/>` : ''}
        </ellipse>
      ` : ''}
      
      <circle cx="228" cy="248" r="55" fill="#000" opacity="0.3"/>
      
      <circle cx="225" cy="245" r="52" fill="url(#hipBone3D_${stage})" stroke="${c.core}" stroke-width="4"
              filter="url(#shadow3D_${stage})">
        <animate attributeName="opacity" values="0.9;1;0.9" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      
      ${cartilage > 0 ? `
        <circle cx="225" cy="245" r="${52 + cartilage / 2}" 
                fill="none" stroke="url(#cartGrad_${stage})" stroke-width="${cartilage}" opacity="0.8"/>
      ` : ''}
      
      <ellipse cx="208" cy="228" rx="22" ry="17" fill="#fff" opacity="0.6"/>
      <ellipse cx="215" cy="235" rx="15" ry="12" fill="#fff" opacity="0.4"/>
      
      <ellipse cx="255" cy="285" rx="34" ry="67" fill="url(#hipBone3D_${stage})" 
               stroke="${c.core}" stroke-width="4" transform="rotate(25 255 285)"
               filter="url(#shadow3D_${stage})"/>
      
            ${stage === 'treatment' ? `
        <ellipse cx="225" cy="245" rx="85" ry="85" 
                 fill="none" stroke="#4caf50" stroke-width="4" opacity="0.7">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" repeatCount="indefinite"/>
          <animate attributeName="stroke-width" values="3;5;3" dur="2.5s" repeatCount="indefinite"/>
        </ellipse>
        
        <ellipse cx="225" cy="245" rx="95" ry="95" 
                 fill="none" stroke="#66bb6a" stroke-width="2" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite"/>
        </ellipse>
        
        <circle cx="225" cy="245" r="40" 
                fill="#c8e6c9" opacity="0.4">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3.5s" repeatCount="indefinite"/>
          <animate attributeName="r" values="38;42;38" dur="3.5s" repeatCount="indefinite"/>
        </circle>
        
        ${Array.from({ length: 16 }, (_, i) => {
    const angle = (i * 22.5) * Math.PI / 180;
    const px = 225 + Math.cos(angle) * 75;
    const py = 245 + Math.sin(angle) * 75;
    const delay = i * 0.15;
    return `
            <circle cx="${px}" cy="${py}" r="3.5" fill="#4caf50" opacity="0.9">
              <animate attributeName="r" values="2.5;5;2.5" dur="${2.5 + delay}s" repeatCount="indefinite" begin="${delay}s"/>
              <animate attributeName="opacity" values="0.6;1;0.6" dur="${2.5 + delay}s" repeatCount="indefinite" begin="${delay}s"/>
              <animateTransform attributeName="transform" type="rotate" 
                                from="0 225 245" to="360 225 245" 
                                dur="12s" repeatCount="indefinite"/>
            </circle>
          `;
  }).join('')}
        
        <rect x="245" y="270" width="35" height="50" 
              fill="#c8e6c9" opacity="0.5" rx="4" transform="rotate(25 255 285)">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite"/>
        </rect>
        
        <line x1="310" y1="245" x2="350" y2="230" stroke="#4caf50" stroke-width="2"/>
        <rect x="350" y="215" width="85" height="32" fill="#e8f5e9" rx="6" stroke="#4caf50" stroke-width="2"/>
        <text x="392" y="228" font-size="9" fill="#2e7d32" font-weight="700" text-anchor="middle">
          Healing
        </text>
        <text x="392" y="238" font-size="8" fill="#2e7d32" text-anchor="middle">
          (bone growing!)
        </text>
      ` : ''}
      
      ${stage !== 'healthy' && stage !== 'treatment' ? `
        ${Array.from({ length: stage === 'early' ? 3 : 6 }, (_, i) => {
    const r = 52 + (i * 12);
    const op = 0.4 - (i * 0.06);
    return `
            <circle cx="225" cy="245" r="${r}" fill="none" 
                    stroke="${c.porosity}" stroke-width="${2.5 - i * 0.3}" opacity="${op}">
              <animate attributeName="r" values="${r * 0.9};${r * 1.15};${r * 0.9}" dur="3s" repeatCount="indefinite"/>
            </circle>
          `;
  }).join('')}
        
        ${Array.from({ length: stage === 'early' ? 10 : 20 }, () => {
    const angle = Math.random() * 2 * Math.PI;
    const dist = 52 * (0.5 + Math.random() * 0.5);
    const x = 225 + Math.cos(angle) * dist;
    const y = 245 + Math.sin(angle) * dist;
    const size = 2 + Math.random() * 3;
    return `
            <circle cx="${x}" cy="${y}" r="${size}" fill="${c.porosity}" opacity="0.6">
              <animate attributeName="r" values="${size};${size * 1.5};${size}" dur="${1.2 + Math.random() * 0.8}s" repeatCount="indefinite"/>
            </circle>
          `;
  }).join('')}
      ` : ''}
      
      ${stage === 'advanced' ? `
        <path d="M 180,210 L 165,205 L 180,220 Z" fill="#bdbdbd" stroke="#757575" stroke-width="2"/>
        <path d="M 270,210 L 285,205 L 270,220 Z" fill="#bdbdbd" stroke="#757575" stroke-width="2"/>
        
        <line x1="285" y1="210" x2="320" y2="190" stroke="#757575" stroke-width="2"/>
        <rect x="320" y="175" width="90" height="28" fill="#f5f5f5" rx="4" stroke="#757575" stroke-width="2"/>
        <text x="365" y="192" font-size="9" fill="#424242" font-weight="700" text-anchor="middle">
          Bone spurs
        </text>
        
        <circle cx="225" cy="225" r="70" fill="${c.fracture}" opacity="0.3" filter="url(#glow3D_${stage})">
          <animate attributeName="r" values="65;75;65" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.25;0.4;0.25" dur="2s" repeatCount="indefinite"/>
        </circle>
        
        <rect x="240" y="270" width="60" height="40" fill="none" stroke="${c.fracture}" stroke-width="3" stroke-dasharray="5,3">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/>
        </rect>
        <text x="270" y="295" font-size="10" fill="${c.fracture}" font-weight="700" text-anchor="middle">
          WEAK
        </text>
        <text x="270" y="305" font-size="8" fill="${c.fracture}" text-anchor="middle">
          Fracture zone
        </text>
        
        <line x1="225" y1="340" x2="150" y2="390" class="${styles.spreadLine}" stroke="#f44336" stroke-width="2" marker-end="url(#arrowRed)"/>
        <line x1="225" y1="340" x2="300" y2="390" class="${styles.spreadLine}" stroke="#f44336" stroke-width="2" marker-end="url(#arrowRed)"/>
        
        <rect x="105" y="385" width="90" height="30" fill="#ffebee" rx="4" stroke="#f44336" stroke-width="2"/>
        <text x="150" y="403" font-size="9" fill="#c62828" font-weight="700" text-anchor="middle">
          Knee affected
        </text>
        
        <rect x="255" y="385" width="90" height="30" fill="#ffebee" rx="4" stroke="#f44336" stroke-width="2"/>
        <text x="300" y="403" font-size="9" fill="#c62828" font-weight="700" text-anchor="middle">
          Back affected
        </text>
      ` : ''}
      
      ${stage === 'healthy' ? `
        <line x1="300" y1="235" x2="340" y2="220" stroke="#4caf50" stroke-width="2"/>
        <rect x="340" y="205" width="100" height="28" fill="#e8f5e9" rx="4" stroke="#4caf50" stroke-width="2"/>
        <text x="390" y="222" font-size="9" fill="#2e7d32" font-weight="700" text-anchor="middle">
          Perfect fit!
        </text>
      ` : ''}
      
      <defs>
        <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="#f44336"/>
        </marker>
      </defs>
    </svg>
  `;

  return {
    svg,
    title: info.title,
    description: info.description,
    stats: {
      bmd: stage === 'healthy' ? 'Normal (T-score: +0.8)' : stage === 'early' ? 'Osteopenia (T-score: -1.8)' : stage === 'treatment' ? 'Improving (T-score: -2.0)' : 'Severe (T-score: -3.5)',
      bmdClass: stage === 'healthy' ? styles.statGood : stage === 'treatment' ? styles.statModerate : stage === 'early' ? styles.statModerate : styles.statCritical,
      risk: stage === 'healthy' ? 'Very Low (2%)' : stage === 'early' ? 'Moderate (20%)' : stage === 'treatment' ? 'Reduced to 12%' : 'Very High (60%)',
      riskClass: stage === 'healthy' ? styles.statGood : stage === 'treatment' ? styles.statModerate : stage === 'early' ? styles.statModerate : styles.statCritical,
      cartilage: stage === 'healthy' ? 'Excellent - 8mm' : stage === 'early' ? 'Thinning - 4mm' : stage === 'treatment' ? 'Protected - 6mm' : 'Bone-on-Bone',
      cartClass: stage === 'healthy' ? styles.statGood : stage === 'treatment' ? styles.statModerate : stage === 'early' ? styles.statModerate : styles.statCritical
    }
  };
};


export const generateKnee3D = (_stage: string, styles: any) => {
  // knee generator placeholder due to output size limit
  return {
    svg: `<svg viewBox="0 0 450 480" class="${styles.breathingAnimation}"><text x="50%" y="50%" text-anchor="middle">Knee Visualization</text></svg>`,
    title: "Knee Visualization",
    description: "Your knee bones are separated by a thick cushion of cartilage...",
    stats: {
      bmd: 'Normal', bmdClass: styles.statGood, risk: 'Low', riskClass: styles.statGood, cartilage: 'Excellent', cartClass: styles.statGood
    }
  };
};

// Graph Data Types
export type AgeGroup = "12-19" | "20-39" | "40-50" | "50-60" | "60+";

export const AGE_TO_PHASE_MAP: Record<AgeGroup, string> = {
  "12-19": "teens",
  "20-39": "twenties",
  "40-50": "forties",
  "50-60": "menopause",
  "60+": "postmeno"
};

export const AGE_GRAPH_DATA: Record<AgeGroup, { labels: string[], estrogen: number[], boneDensity: number[] }> = {
  "12-19": {
    labels: ["Teens"],
    estrogen: [35],
    boneDensity: [25],
  },
  "20-39": {
    labels: ["Teens", "20-39"],
    estrogen: [35, 85],
    boneDensity: [25, 100],
  },
  "40-50": {
    labels: ["Teens", "20-39", "40-50"],
    estrogen: [35, 85, 65],
    boneDensity: [25, 100, 85],
  },
  "50-60": {
    labels: ["Teens", "20-39", "40-50", "50-60"],
    estrogen: [35, 85, 65, 15],
    boneDensity: [25, 100, 85, 35],
  },
  "60+": {
    labels: ["Teens", "20-39", "40-50", "50-60", "60+"],
    estrogen: [35, 85, 65, 15, 8],
    boneDensity: [25, 100, 85, 35, 18],
  },
};

export const generateWrist3D = (_stage: string, styles: any) => {
  // wrist generator placeholder due to output size limit
  return {
    svg: `<svg viewBox="0 0 450 480" class="${styles.breathingAnimation}"><text x="50%" y="50%" text-anchor="middle">Wrist Visualization</text></svg>`,
    title: "Wrist Visualization",
    description: "Your wrist bones have a dense honeycomb structure...",
    stats: {
      bmd: 'Normal', bmdClass: styles.statGood, risk: 'Low', riskClass: styles.statGood, cartilage: 'N/A', cartClass: styles.statGood
    }
  };
};
