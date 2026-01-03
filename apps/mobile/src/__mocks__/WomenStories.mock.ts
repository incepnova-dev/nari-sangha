import { icons } from '../styles';

export interface Story {
  id: string;
  authorName: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  tags: { text: string; type: 'pink' | 'green' | 'blue' | 'purple' | 'orange' }[];
  likes: string;
  comments: string;
  category: string;
}

export const mockStories: Story[] = [
  {
    id: '1',
    authorName: 'Priya Sharma',
    authorAvatar: '👩',
    date: '2 weeks ago',
    readTime: '5 min read',
    title: 'My High-Risk Pregnancy Journey: A Story of Hope',
    excerpt: 'When doctors told me I had a high-risk pregnancy, fear consumed me. But with the right medical team and support system, I delivered a healthy baby boy. This is my story of perseverance...',
    tags: [
      { text: 'High-Risk Pregnancy', type: 'pink' },
      { text: 'Success Story', type: 'green' },
      { text: 'Support System', type: 'blue' },
    ],
    likes: '1.2K',
    comments: '89',
    category: 'Pregnancy & Motherhood',
  },
  {
    id: '2',
    authorName: 'Ananya Reddy',
    authorAvatar: '👩‍🦱',
    date: '3 weeks ago',
    readTime: '7 min read',
    title: 'Postpartum Depression: Breaking the Silence',
    excerpt: 'Nobody talks about the darkness that can follow childbirth. I\'m here to share my experience with postpartum depression and how I found my way back to joy...',
    tags: [
      { text: 'Mental Health', type: 'purple' },
      { text: 'Postpartum', type: 'pink' },
      { text: 'Recovery', type: 'green' },
    ],
    likes: '2.5K',
    comments: '156',
    category: 'Pregnancy & Motherhood',
  },
  {
    id: '3',
    authorName: 'Meera Kapoor',
    authorAvatar: '👱‍♀️',
    date: '1 month ago',
    readTime: '6 min read',
    title: 'Reversing PCOS Naturally: My 2-Year Transformation',
    excerpt: 'Irregular periods, weight gain, and hair loss – PCOS was taking over my life. Then I discovered the power of lifestyle changes. Here\'s how I reversed my symptoms naturally...',
    tags: [
      { text: 'PCOS', type: 'pink' },
      { text: 'Natural Healing', type: 'green' },
      { text: 'Weight Loss', type: 'blue' },
    ],
    likes: '3.8K',
    comments: '234',
    category: 'Overcoming PCOS',
  },
  {
    id: '4',
    authorName: 'Fatima Khan',
    authorAvatar: '🧕',
    date: '1 month ago',
    readTime: '4 min read',
    title: 'Conceiving with PCOS: Our Miracle Baby Story',
    excerpt: 'After 4 years of trying and multiple failed IVF attempts, we had almost given up hope. But persistence paid off, and today I\'m a proud mother of twins...',
    tags: [
      { text: 'PCOS', type: 'pink' },
      { text: 'IVF Journey', type: 'purple' },
      { text: 'Success', type: 'green' },
    ],
    likes: '4.2K',
    comments: '312',
    category: 'Overcoming PCOS',
  },
  {
    id: '5',
    authorName: 'Sneha Patel',
    authorAvatar: '👩‍🦰',
    date: '2 months ago',
    readTime: '10 min read',
    title: 'Beating Breast Cancer: My Journey from Fear to Freedom',
    excerpt: 'Finding a lump in my breast at 35 was terrifying. But early detection saved my life. This is my story of chemotherapy, surgery, and coming out stronger than ever...',
    tags: [
      { text: 'Breast Cancer', type: 'pink' },
      { text: 'Survivor', type: 'green' },
      { text: 'Early Detection', type: 'blue' },
    ],
    likes: '5.6K',
    comments: '421',
    category: 'Cancer Survivors',
  },
  {
    id: '6',
    authorName: 'Lakshmi Iyer',
    authorAvatar: '👩‍🦳',
    date: '2 months ago',
    readTime: '8 min read',
    title: 'Life After Ovarian Cancer: Finding Joy Again',
    excerpt: 'Cancer changed everything, but it also taught me what truly matters. Here\'s how I rebuilt my life after ovarian cancer and found gratitude in unexpected places...',
    tags: [
      { text: 'Ovarian Cancer', type: 'purple' },
      { text: 'Recovery', type: 'green' },
      { text: 'Gratitude', type: 'blue' },
    ],
    likes: '3.1K',
    comments: '189',
    category: 'Cancer Survivors',
  },
  {
    id: '7',
    authorName: 'Divya Singh',
    authorAvatar: '👩‍💼',
    date: '3 months ago',
    readTime: '6 min read',
    title: 'Living with Endometriosis: Pain is Not Normal',
    excerpt: 'For years, doctors told me my severe period pain was normal. It took 7 years to get an endometriosis diagnosis. Here\'s what I wish I knew earlier...',
    tags: [
      { text: 'Endometriosis', type: 'pink' },
      { text: 'Chronic Pain', type: 'purple' },
      { text: 'Awareness', type: 'green' },
    ],
    likes: '2.8K',
    comments: '167',
    category: 'Endometriosis Warriors',
  },
];

export const mockFeaturedStory: Story = {
  id: 'featured',
  authorName: 'Anonymous',
  authorAvatar: icons.star,
  date: '1 week ago',
  readTime: '8 min read',
  title: 'From Diagnosis to Dancing: My PCOS Journey',
  excerpt: 'After being diagnosed with PCOS at 23, I thought my dreams of becoming a dancer were over. Here\'s how I proved myself wrong...',
  tags: [
    { text: 'PCOS', type: 'pink' },
    { text: 'Inspiration', type: 'green' },
    { text: 'Transformation', type: 'blue' },
  ],
  likes: '6.2K',
  comments: '445',
  category: 'Overcoming PCOS',
};

