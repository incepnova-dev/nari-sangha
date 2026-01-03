export interface Video {
  id: string;
  title: string;
  channel: string;
  views: string;
  duration: string;
  thumbnail: string;
  url: string;
  date: string;
  description: string;
  doctorName?: string;
  doctorSpecialty?: string;
  doctorAvatar?: string;
}

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'The Science of Women\'s Health: Ob/Gyn Reveals 10 Truths You Need to Know',
    channel: 'Mel Robbins • Expert Interview',
    views: '210K views',
    duration: '1:07:13',
    thumbnail: 'https://i.ytimg.com/vi/7KX2x0d42EE/hq720.jpg',
    url: 'https://www.youtube.com/watch?v=7KX2x0d42EE',
    date: 'Dec 2024',
    description: 'An in-depth conversation with a leading gynecologist about essential women\'s health facts that every woman should know.',
  },
  {
    id: '2',
    title: '5 Things Your Gynecologist Wants You To Know: Getting Pregnant',
    channel: 'Mama Doctor Jones • Board Certified ObGyn',
    views: '1.2M views',
    duration: '10:29',
    thumbnail: 'https://i.ytimg.com/vi/EkqVrsrIgAI/hq720.jpg',
    url: 'https://www.youtube.com/watch?v=EkqVrsrIgAI',
    date: 'Nov 2024',
    description: 'Expert advice on fertility, conception, and what to expect when trying to get pregnant.',
  },
  {
    id: '3',
    title: 'Understanding PCOS: A Gynecologist\'s Perspective',
    channel: 'Dr. Sarah Johnson, MD',
    views: '45K views',
    duration: '12:45',
    thumbnail: '',
    url: 'https://www.youtube.com/watch?v=pD6bshLxFxk',
    date: 'Dec 2024',
    description: 'Dr. Sarah Johnson explains the latest research on Polycystic Ovary Syndrome, including diagnostic criteria, treatment options, and lifestyle interventions.',
    doctorName: 'Dr. Sarah Johnson, MD',
    doctorSpecialty: 'Gynecologist & Reproductive Endocrinologist',
    doctorAvatar: '👩‍⚕️',
  },
  {
    id: '4',
    title: 'Breast Health & Cancer Prevention: What Every Woman Should Know',
    channel: 'Dr. Priya Mehta, MD',
    views: '67K views',
    duration: '15:30',
    thumbnail: '',
    url: 'https://www.youtube.com/watch?v=ZUJq6hP6gLk',
    date: 'Dec 2024',
    description: 'Dr. Priya Mehta discusses breast cancer prevention strategies, the importance of early detection, screening guidelines, and recent advances in treatment.',
    doctorName: 'Dr. Priya Mehta, MD',
    doctorSpecialty: 'Oncologist & Breast Cancer Specialist',
    doctorAvatar: '👩‍⚕️',
  },
  {
    id: '5',
    title: 'Menopause: What to Expect and How to Manage Symptoms',
    channel: 'Dr. Lisa Chen, MD',
    views: '89K views',
    duration: '18:20',
    thumbnail: '',
    url: 'https://www.youtube.com/watch?v=example',
    date: 'Nov 2024',
    description: 'Comprehensive guide to understanding menopause, its symptoms, and effective management strategies for a smoother transition.',
    doctorName: 'Dr. Lisa Chen, MD',
    doctorSpecialty: 'Menopause Specialist & Gynecologist',
    doctorAvatar: '👩‍⚕️',
  },
  {
    id: '6',
    title: 'Postpartum Depression: Recognizing Signs and Getting Help',
    channel: 'Dr. Emily Rodriguez, MD',
    views: '52K views',
    duration: '14:15',
    thumbnail: '',
    url: 'https://www.youtube.com/watch?v=example2',
    date: 'Dec 2024',
    description: 'Expert insights on postpartum depression, its symptoms, risk factors, and available treatment options for new mothers.',
    doctorName: 'Dr. Emily Rodriguez, MD',
    doctorSpecialty: 'Psychiatrist & Maternal Mental Health Specialist',
    doctorAvatar: '👩‍⚕️',
  },
];

