export interface Video {
  id: string;
  title: string;
  date: string;
  duration: string;
  views: string;
  description: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatar: string;
  url: string;
}

export interface ResearchArticle {
  id: string;
  badge: string;
  title: string;
  authors: string;
  journal: string;
  abstract: string;
  tags: { text: string; type: 'pink' | 'purple' | 'blue' | 'green' | 'orange' }[];
  impactFactor: string;
  category: string;
  url?: string;
}

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Understanding PCOS: A Gynecologist\'s Perspective',
    date: 'Dec 2024',
    duration: '12:45',
    views: '45K views',
    description: 'Dr. Sarah Johnson explains the latest research on Polycystic Ovary Syndrome, including diagnostic criteria, treatment options, and lifestyle interventions that can help manage symptoms effectively.',
    doctorName: 'Dr. Sarah Johnson, MD',
    doctorSpecialty: 'Gynecologist & Reproductive Endocrinologist',
    doctorAvatar: '👩‍⚕️',
    url: 'https://www.youtube.com/watch?v=pD6bshLxFxk',
  },
  {
    id: '2',
    title: 'Breast Health & Cancer Prevention: What Every Woman Should Know',
    date: 'Dec 2024',
    duration: '15:30',
    views: '67K views',
    description: 'Dr. Priya Mehta discusses breast cancer prevention strategies, the importance of early detection, screening guidelines, and recent advances in treatment options that are improving survival rates.',
    doctorName: 'Dr. Priya Mehta, MD',
    doctorSpecialty: 'Oncologist & Breast Cancer Specialist',
    doctorAvatar: '👩‍⚕️',
    url: 'https://www.youtube.com/watch?v=ZUJq6hP6gLk',
  },
];

export const mockFeaturedArticle: ResearchArticle = {
  id: 'featured',
  badge: '⭐ Breakthrough Study',
  title: 'Revolutionary AI Model Detects Ovarian Cancer 2 Years Earlier Than Current Methods',
  authors: 'Chen L., Rodriguez A., Singh K., et al.',
  journal: 'Nature Medicine • December 2024',
  abstract: 'A groundbreaking machine learning algorithm analyzes blood biomarkers to detect ovarian cancer up to 24 months before conventional diagnostic methods, potentially saving thousands of lives annually...',
  tags: [
    { text: 'Ovarian Cancer', type: 'pink' },
    { text: 'AI Technology', type: 'blue' },
    { text: 'Early Detection', type: 'green' },
  ],
  impactFactor: '91.2',
  category: 'Featured',
};

export const mockArticles: ResearchArticle[] = [
  {
    id: '1',
    badge: 'NEW',
    title: 'Impact of Mediterranean Diet on PCOS Outcomes: A Randomized Controlled Trial',
    authors: 'Johnson M., Williams E., Brown S., Anderson K.',
    journal: 'Journal of Women\'s Health • December 2024',
    abstract: 'This 12-month study of 250 women with PCOS found that adherence to a Mediterranean diet resulted in significant improvements in insulin resistance (42%), menstrual regularity (67%), and hormone levels compared to standard dietary recommendations.',
    tags: [
      { text: 'PCOS', type: 'pink' },
      { text: 'Nutrition', type: 'green' },
      { text: 'Clinical Trial', type: 'blue' },
    ],
    impactFactor: '4.2',
    category: 'PCOS & Hormonal Health',
  },
  {
    id: '2',
    badge: 'PEER-REVIEWED',
    title: 'Novel Biomarkers for Early Endometriosis Detection Using Salivary Testing',
    authors: 'Kumar R., Patel S., Lee M., Thompson A.',
    journal: 'The Lancet • November 2024',
    abstract: 'Researchers identified three specific protein markers in saliva that can detect endometriosis with 89% accuracy, offering a non-invasive alternative to laparoscopic surgery for diagnosis. This breakthrough could reduce the average 7-year diagnostic delay.',
    tags: [
      { text: 'Endometriosis', type: 'purple' },
      { text: 'Diagnostics', type: 'blue' },
      { text: 'Biomarkers', type: 'green' },
    ],
    impactFactor: '59.1',
    category: 'PCOS & Hormonal Health',
  },
  {
    id: '3',
    badge: 'BREAKTHROUGH',
    title: 'Immunotherapy Combination Increases Ovarian Cancer Survival by 40%',
    authors: 'Zhang Y., O\'Connor M., Davis K., Rodriguez J.',
    journal: 'New England Journal of Medicine • December 2024',
    abstract: 'A phase III clinical trial demonstrated that combining two immunotherapy drugs (pembrolizumab and niraparib) with chemotherapy significantly improved overall survival rates in advanced ovarian cancer patients compared to chemotherapy alone.',
    tags: [
      { text: 'Ovarian Cancer', type: 'pink' },
      { text: 'Immunotherapy', type: 'orange' },
      { text: 'Clinical Trial', type: 'blue' },
    ],
    impactFactor: '91.2',
    category: 'Cancer Research',
  },
  {
    id: '4',
    badge: 'META-ANALYSIS',
    title: 'Breast Cancer Screening: Optimal Age and Frequency Guidelines Updated',
    authors: 'Martinez C., Wilson R., Taylor H., et al.',
    journal: 'JAMA Oncology • November 2024',
    abstract: 'Comprehensive analysis of 85 studies involving 2.3 million women suggests starting annual mammography at age 40 (rather than 50) reduces mortality by 25% in average-risk women, with benefits outweighing potential harms.',
    tags: [
      { text: 'Breast Cancer', type: 'pink' },
      { text: 'Screening', type: 'green' },
      { text: 'Prevention', type: 'blue' },
    ],
    impactFactor: '24.8',
    category: 'Cancer Research',
  },
  {
    id: '5',
    badge: 'AI-POWERED',
    title: 'Postpartum Depression: AI-Assisted Screening Models Achieve 92% Accuracy',
    authors: 'Williams R., Thompson S., Lee K., Anderson P.',
    journal: 'JAMA Psychiatry • December 2024',
    abstract: 'Machine learning algorithm analyzing speech patterns, social media activity, and wearable device data can predict postpartum depression risk with 92% accuracy, enabling early intervention and support for at-risk mothers.',
    tags: [
      { text: 'Mental Health', type: 'purple' },
      { text: 'AI Technology', type: 'blue' },
      { text: 'Postpartum', type: 'pink' },
    ],
    impactFactor: '17.5',
    category: 'Maternal & Pregnancy Health',
  },
  {
    id: '6',
    badge: 'LONGITUDINAL',
    title: 'Preeclampsia Risk Reduced 60% with Low-Dose Aspirin in High-Risk Pregnancies',
    authors: 'Garcia M., Cohen S., Patel N., et al.',
    journal: 'Obstetrics & Gynecology • November 2024',
    abstract: '10-year study of 15,000 high-risk pregnancies confirms that daily low-dose aspirin (150mg) started before 16 weeks gestation significantly reduces preeclampsia risk with minimal adverse effects, potentially preventing thousands of maternal deaths annually.',
    tags: [
      { text: 'Preeclampsia', type: 'orange' },
      { text: 'Prevention', type: 'green' },
      { text: 'High-Risk', type: 'blue' },
    ],
    impactFactor: '6.9',
    category: 'Maternal & Pregnancy Health',
  },
];

