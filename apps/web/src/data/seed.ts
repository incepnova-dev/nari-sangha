export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    originalPrice: number | null;
    rating: number;
    reviews: number;
    description: string;
    vendors: string[];
    badge?: string;
    imageIcon: string;
    benefits?: string[];  // For Quick View popup
}

export interface InsurancePlan {
    id: string;
    name: string;
    provider: string;
    priceYearly: number;
    features: string[];
}

export interface Story {
    id: string;
    title: string;
    category: string;
    quote: string;
    content: string;
    icon: string;
    themeColor: string;
}

export const products: Product[] = [
    // Pregnancy (7 products)
    {
        id: "p1",
        name: "Prenatal Vitamins Plus",
        category: "Pregnancy",
        price: 349,
        originalPrice: 499,
        rating: 4.5,
        reviews: 2456,
        description: "Essential nutrients including folic acid, iron, DHA, and calcium for healthy pregnancy",
        vendors: ["Amazon", "1mg", "Netmeds"],
        imageIcon: "💊"
    },
    {
        id: "p3",
        name: "Pregnancy Body Pillow",
        category: "Pregnancy",
        price: 1199,
        originalPrice: 1999,
        rating: 4.5,
        reviews: 3102,
        description: "U-shaped support for back, belly, and hips. Hypoallergenic, washable cover",
        vendors: ["Amazon", "Myntra"],
        imageIcon: "🛏️"
    },
    {
        id: "p21",
        name: "Stretch Mark Prevention Cream",
        category: "Pregnancy",
        price: 549,
        originalPrice: 799,
        rating: 4.3,
        reviews: 1876,
        description: "Natural ingredients to prevent and reduce stretch marks during pregnancy",
        vendors: ["Nykaa", "Amazon"],
        badge: "Featured",
        imageIcon: "🧴"
    },
    {
        id: "p22",
        name: "Maternity Support Belt",
        category: "Pregnancy",
        price: 899,
        originalPrice: null,
        rating: 4.6,
        reviews: 1234,
        description: "Breathable support belt for lower back and pelvic pain relief",
        vendors: ["Amazon", "Flipkart"],
        imageIcon: "🎗️"
    },
    {
        id: "p23",
        name: "Nursing Bras (Pack of 3)",
        category: "Pregnancy",
        price: 1299,
        originalPrice: 1799,
        rating: 4.7,
        reviews: 2987,
        description: "Comfortable, wire-free nursing bras with easy clip access",
        vendors: ["Amazon", "Myntra"],
        imageIcon: "👙"
    },
    {
        id: "p24",
        name: "Electric Breast Pump",
        category: "Pregnancy",
        price: 3499,
        originalPrice: 4999,
        rating: 4.8,
        reviews: 1567,
        description: "Quiet, efficient double electric breast pump with BPA-free bottles",
        vendors: ["Amazon", "Firstcry"],
        badge: "Best Seller",
        imageIcon: "🍼"
    },
    {
        id: "p25",
        name: "Pregnancy Journal & Planner",
        category: "Pregnancy",
        price: 449,
        originalPrice: null,
        rating: 4.4,
        reviews: 876,
        description: "Track your pregnancy journey week by week with prompts and memories",
        vendors: ["Amazon"],
        imageIcon: "📔"
    },

    // Fertility (6 products)
    {
        id: "p2",
        name: "Ovulation Test Kit (20 strips)",
        category: "Fertility",
        price: 449,
        originalPrice: 599,
        rating: 5.0,
        reviews: 1823,
        description: "99% accurate LH surge detection, easy-to-read results, optimize conception timing",
        vendors: ["Flipkart", "PharmEasy"],
        badge: "Best Seller",
        imageIcon: "🔬"
    },
    {
        id: "p5",
        name: "Basal Digital Thermometer",
        category: "Fertility",
        price: 399,
        originalPrice: null,
        rating: 5.0,
        reviews: 2234,
        description: "Track fertility with BBT, memory recall, beep alert, waterproof design",
        vendors: ["Amazon", "Flipkart"],
        badge: "Best Seller",
        imageIcon: "🌡️"
    },
    {
        id: "p26",
        name: "Fertility Support Supplements",
        category: "Fertility",
        price: 799,
        originalPrice: 999,
        rating: 4.5,
        reviews: 1432,
        description: "CoQ10, Myo-Inositol, and Folate blend to support reproductive health",
        vendors: ["1mg", "HealthKart"],
        imageIcon: "💊"
    },
    {
        id: "p27",
        name: "Conception-Friendly Lubricant",
        category: "Fertility",
        price: 649,
        originalPrice: null,
        rating: 4.6,
        reviews: 987,
        description: "pH-balanced, sperm-friendly lubricant for couples trying to conceive",
        vendors: ["Amazon", "Nykaa"],
        imageIcon: "💧"
    },
    {
        id: "p28",
        name: "Digital Ovulation Tracker",
        category: "Fertility",
        price: 2499,
        originalPrice: 3299,
        rating: 4.7,
        reviews: 654,
        description: "Smart device that tracks fertility hormones and predicts ovulation window",
        vendors: ["Amazon"],
        badge: "New",
        imageIcon: "📱"
    },
    {
        id: "p29",
        name: "Men's Fertility Vitamins",
        category: "Fertility",
        price: 899,
        originalPrice: null,
        rating: 4.4,
        reviews: 543,
        description: "Zinc, selenium, and antioxidants to support male reproductive health",
        vendors: ["HealthKart", "1mg"],
        imageIcon: "💊"
    },

    // Period Care (5 products)
    {
        id: "p4",
        name: "Menstrual Cup - Reusable",
        category: "Period Care",
        price: 599,
        originalPrice: null,
        rating: 5.0,
        reviews: 4567,
        description: "Eco-friendly, lasts up to 10 years, leak-proof, comfortable wear for 12 hours",
        vendors: ["Amazon", "Nykaa"],
        badge: "Featured",
        imageIcon: "🌙"
    },
    {
        id: "p30",
        name: "Heating Pad for Cramps",
        category: "Period Care",
        price: 799,
        originalPrice: 1199,
        rating: 4.8,
        reviews: 3421,
        description: "Electric heating pad with 3 heat settings for menstrual pain relief",
        vendors: ["Amazon", "Flipkart"],
        badge: "Best Seller",
        imageIcon: "🔥"
    },
    {
        id: "p31",
        name: "Period Pain Relief Patches",
        category: "Period Care",
        price: 349,
        originalPrice: null,
        rating: 4.3,
        reviews: 1876,
        description: "Natural herbal heat patches for instant cramp relief (Pack of 10)",
        vendors: ["Amazon", "1mg"],
        imageIcon: "🩹"
    },
    {
        id: "p32",
        name: "Organic Cotton Sanitary Pads",
        category: "Period Care",
        price: 299,
        originalPrice: 399,
        rating: 4.6,
        reviews: 2987,
        description: "Chemical-free, biodegradable pads for sensitive skin (Pack of 20)",
        vendors: ["Amazon", "Nykaa"],
        imageIcon: "🌿"
    },
    {
        id: "p33",
        name: "Period Tracker Journal",
        category: "Period Care",
        price: 399,
        originalPrice: null,
        rating: 4.2,
        reviews: 765,
        description: "Track your cycle, symptoms, and mood patterns month by month",
        vendors: ["Amazon"],
        imageIcon: "📓"
    },

    // Wellness (4 products)
    {
        id: "p34",
        name: "Women's Multivitamin Gummies",
        category: "Wellness",
        price: 649,
        originalPrice: 899,
        rating: 4.5,
        reviews: 2134,
        description: "Delicious gummies with essential vitamins and minerals for daily health",
        vendors: ["HealthKart", "Amazon"],
        imageIcon: "🍬"
    },
    {
        id: "p35",
        name: "Calcium + Vitamin D3 Tablets",
        category: "Wellness",
        price: 449,
        originalPrice: null,
        rating: 4.6,
        reviews: 1876,
        description: "Supports bone health and immunity (60 tablets)",
        vendors: ["1mg", "PharmEasy"],
        imageIcon: "💊"
    },
    {
        id: "p36",
        name: "Probiotic for Women",
        category: "Wellness",
        price: 899,
        originalPrice: 1199,
        rating: 4.7,
        reviews: 1234,
        description: "Supports digestive and vaginal health with 10 billion CFUs",
        vendors: ["HealthKart", "Amazon"],
        badge: "Featured",
        imageIcon: "🦠"
    },
    {
        id: "p37",
        name: "Stress Relief Herbal Tea",
        category: "Wellness",
        price: 349,
        originalPrice: null,
        rating: 4.4,
        reviews: 987,
        description: "Chamomile and ashwagandha blend for relaxation (25 tea bags)",
        vendors: ["Amazon", "BigBasket"],
        imageIcon: "🍵"
    },

    // Supplements (4 products)
    {
        id: "p38",
        name: "Folic Acid 5mg Tablets",
        category: "Supplements",
        price: 199,
        originalPrice: null,
        rating: 4.8,
        reviews: 3456,
        description: "Essential for pregnancy planning and fetal development (90 tablets)",
        vendors: ["1mg", "PharmEasy", "Netmeds"],
        badge: "Best Seller",
        imageIcon: "💊"
    },
    {
        id: "p39",
        name: "Omega-3 DHA Fish Oil",
        category: "Supplements",
        price: 899,
        originalPrice: 1299,
        rating: 4.6,
        reviews: 1987,
        description: "Supports brain, heart, and eye health (60 softgels)",
        vendors: ["HealthKart", "Amazon"],
        imageIcon: "🐟"
    },
    {
        id: "p40",
        name: "Vitamin D3 2000 IU",
        category: "Supplements",
        price: 299,
        originalPrice: 449,
        rating: 4.7,
        reviews: 2345,
        description: "Supports immunity and bone strength (60 capsules)",
        vendors: ["1mg", "HealthKart"],
        imageIcon: "☀️"
    },
    {
        id: "p41",
        name: "Iron + Vitamin B12 Complex",
        category: "Supplements",
        price: 549,
        originalPrice: null,
        rating: 4.5,
        reviews: 1543,
        description: "Combats fatigue and supports energy levels (60 tablets)",
        vendors: ["PharmEasy", "1mg"],
        imageIcon: "💊"
    },

    // Devices (4 products)
    {
        id: "p42",
        name: "Digital Blood Pressure Monitor",
        category: "Devices",
        price: 1499,
        originalPrice: 2199,
        rating: 4.7,
        reviews: 2876,
        description: "Automatic BP monitor with large display and memory function",
        vendors: ["Amazon", "Flipkart"],
        badge: "Featured",
        imageIcon: "💉"
    },
    {
        id: "p43",
        name: "Glucose Monitoring Kit",
        category: "Devices",
        price: 899,
        originalPrice: 1299,
        rating: 4.6,
        reviews: 1654,
        description: "Accurate blood sugar testing with 25 test strips included",
        vendors: ["Amazon", "PharmEasy"],
        imageIcon: "🩸"
    },
    {
        id: "p44",
        name: "Pulse Oximeter",
        category: "Devices",
        price: 649,
        originalPrice: null,
        rating: 4.8,
        reviews: 3421,
        description: "Measures blood oxygen levels and heart rate instantly",
        vendors: ["Amazon", "1mg"],
        imageIcon: "📊"
    },
    {
        id: "p45",
        name: "Infrared Forehead Thermometer",
        category: "Devices",
        price: 1199,
        originalPrice: 1799,
        rating: 4.5,
        reviews: 2134,
        description: "Non-contact temperature reading in 1 second, safe for whole family",
        vendors: ["Amazon", "Flipkart"],
        imageIcon: "🌡️"
    },

    // Intimate Care (3 products)
    {
        id: "p46",
        name: "Feminine Intimate Wash",
        category: "Intimate Care",
        price: 349,
        originalPrice: 499,
        rating: 4.6,
        reviews: 2987,
        description: "pH-balanced, gentle cleanser for daily intimate hygiene (200ml)",
        vendors: ["Nykaa", "Amazon"],
        imageIcon: "🧴"
    },
    {
        id: "p47",
        name: "Intimate Moisturizing Cream",
        category: "Intimate Care",
        price: 549,
        originalPrice: null,
        rating: 4.4,
        reviews: 1234,
        description: "Hydrating cream for intimate area dryness and comfort (50g)",
        vendors: ["Nykaa", "Amazon"],
        imageIcon: "💧"
    },
    {
        id: "p48",
        name: "Intimate Care Wipes (Pack of 3)",
        category: "Intimate Care",
        price: 399,
        originalPrice: 549,
        rating: 4.5,
        reviews: 1876,
        description: "Biodegradable, gentle wipes for on-the-go freshness (30 wipes each)",
        vendors: ["Amazon", "Nykaa"],
        imageIcon: "🧻"
    }
];

export const insurancePlans: InsurancePlan[] = [
    {
        id: "i1",
        name: "Women's Health Shield",
        provider: "Star Health Insurance",
        priceYearly: 8999,
        features: [
            "Maternity coverage up to ₹2L",
            "Cancer treatment covered",
            "Annual health checkup included",
            "No waiting period for accidents"
        ]
    },
    {
        id: "i2",
        name: "Maternity Care Plus",
        provider: "ICICI Lombard",
        priceYearly: 12499,
        features: [
            "Pre & post natal coverage",
            "Newborn baby cover (90 days)",
            "Ambulance charges covered",
            "Home healthcare services"
        ]
    },
    {
        id: "i3",
        name: "Complete Women's Wellness",
        provider: "Max Bupa Health",
        priceYearly: 10999,
        features: [
            "PCOS & Thyroid treatment",
            "Fertility consultations included",
            "Mental health support covered",
            "Preventive care benefits"
        ]
    }
];

export const stories: Story[] = [
    {
        id: "s1",
        title: "Pregnancy Journey",
        category: "Pregnancy",
        quote: "Nurturing new life, embracing transformation",
        content: "Every kick, every flutter reminds me of the miracle within. Pregnancy isn't just about growing a baby—it's about discovering strength you never knew you had. From the first ultrasound to feeling those tiny movements, this journey has taught me patience, resilience, and an overwhelming capacity for love. The sleepless nights and morning sickness pale in comparison to the joy of knowing I'm creating a new life.",
        icon: "🤰",
        themeColor: "linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)"
    },
    {
        id: "s2",
        title: "Reproductive Health",
        category: "Health",
        quote: "Understanding your body, owning your choices",
        content: "Your reproductive health is your power. Whether managing PCOS, planning a family, or simply understanding your cycle better—knowledge is empowerment. I spent years not understanding why my body behaved the way it did. Once I started tracking, researching, and asking the right questions, everything changed. Now I advocate for every woman to take charge of her health journey.",
        icon: "🌸",
        themeColor: "linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)"
    },
    {
        id: "s3",
        title: "Trying to Conceive",
        category: "Fertility",
        quote: "Hope is the heartbeat of this journey",
        content: "The path to motherhood isn't always straightforward. After two years of trying, countless tests, and moments of despair, I learned that fertility is a journey, not a destination. Each negative test was heartbreaking, but I found strength in community, in other women sharing their stories. Today, I hold my miracle baby, knowing every tear was worth it.",
        icon: "🌱",
        themeColor: "linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)"
    },
    {
        id: "s4",
        title: "Embracing Change",
        category: "Menopause",
        quote: "A new chapter, not an ending",
        content: "Menopause felt like losing a part of myself at first. The hot flashes, the mood swings, the feeling that my body was betraying me. But with time, I discovered this transition was actually a liberation. No more periods, no more contraception worries. I've embraced this phase as my time—time to focus on myself, my passions, my wellness. It's not the end; it's a beautiful beginning.",
        icon: "🦋",
        themeColor: "linear-gradient(135deg, #EDE7F6 0%, #D1C4E9 100%)"
    },
    {
        id: "s5",
        title: "Finding My Voice",
        category: "Mental Health",
        quote: "Healing begins when we speak our truth",
        content: "Postpartum depression silenced me for months. I smiled through the darkness, pretending everything was fine while crumbling inside. The day I finally spoke to my doctor was the day I started healing. Therapy, support groups, and understanding that mental health is health—these saved me. Now I share my story so other mothers know they're not alone.",
        icon: "💜",
        themeColor: "linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 100%)"
    },
    {
        id: "s6",
        title: "My PCOS Story",
        category: "PCOS",
        quote: "Managing, not defined by, my condition",
        content: "Diagnosed at 19, I thought PCOS would control my life forever. The weight gain, irregular periods, and fear of infertility consumed me. But I refused to let it define me. Through diet changes, exercise, and the right medical support, I've learned to manage my symptoms. PCOS is part of my story, but it's not my whole story. I'm thriving, not just surviving.",
        icon: "🌺",
        themeColor: "linear-gradient(135deg, #FCE4EC 0%, #F8BBD9 100%)"
    },
    {
        id: "s7",
        title: "The Fourth Trimester",
        category: "Postpartum",
        quote: "Recovering, bonding, and becoming a mother",
        content: "Nobody prepared me for postpartum recovery. The bleeding, the exhaustion, the overwhelming love mixed with anxiety. Those first three months were a blur of feeding, changing, and learning. But I also discovered incredible resilience. My body healed while nurturing another life. To every new mother: be gentle with yourself. You're doing the hardest job in the world.",
        icon: "👶",
        themeColor: "linear-gradient(135deg, #E8F5E9 0%, #A5D6A7 100%)"
    },
    {
        id: "s8",
        title: "Prioritizing Myself",
        category: "Self Care",
        quote: "You cannot pour from an empty cup",
        content: "As a mother, wife, and professional, I forgot about myself for years. My health, my joy, my identity—all sacrificed on the altar of being 'everything to everyone.' A health scare woke me up. Now I schedule self-care like any important meeting. Morning walks, journaling, saying no. It's not selfish; it's survival. When I'm well, everyone around me benefits.",
        icon: "✨",
        themeColor: "linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)"
    }
];

