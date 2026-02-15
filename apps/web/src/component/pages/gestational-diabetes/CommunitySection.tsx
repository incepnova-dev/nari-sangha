import React from 'react';
import '../../../styles/pages/gestational-diabetes.css';

interface CommunitySectionProps {
  openSuccessStories?: () => void;
  findLocalGroups?: () => void;
}

const CommunitySection: React.FC<CommunitySectionProps> = ({
  openSuccessStories = () => {},
  findLocalGroups = () => {},
}) => {
  return (
    <section id="support" className="community-section">
  <div className="section-header">
    <div className="header-badge">
      <span className="badge-pulse"></span>
      <span className="badge-text">You're Not Alone - 2,500+ Mothers</span>
    </div>
    <h2 className="section-title">Join Our Thriving Community</h2>
    <p className="section-subtitle">
      Connect with thousands of mothers managing GDM. Share stories, get support, and learn from each other's experiences.
    </p>
  </div>

  <div className="community-grid">
    <div className="community-card clickable" onClick={() => window.open('https://chat.whatsapp.com/invite-link', '_blank')}>
      <div className="card-icon-animated">💬</div>
      <div className="card-badge live">Live Chat</div>
      <h3>WhatsApp Support Groups</h3>
      <p>24/7 peer support from mothers experiencing GDM right now</p>
      <div className="community-stats">
        <span className="stat">
          <span className="stat-icon">👥</span>
          <span className="stat-text">450+ Active Members</span>
        </span>
        <span className="stat">
          <span className="stat-icon">💬</span>
          <span className="stat-text">100+ Daily Messages</span>
        </span>
      </div>
      <div className="live-activity">
        <div className="activity-dot"></div>
        <span>12 members active now</span>
      </div>
      <button className="community-btn">
        <span>Join WhatsApp Group</span>
        <span className="btn-arrow">→</span>
      </button>
    </div>

    <div className="community-card clickable" onClick={() => window.open('https://www.facebook.com/groups/gestational-diabetes-india', '_blank')}>
      <div className="card-icon-animated">👥</div>
      <div className="card-badge popular">Most Popular</div>
      <h3>Facebook Community</h3>
      <p>Share experiences, meal ideas, and victories with mothers across India</p>
      <div className="community-stats">
        <span className="stat">
          <span className="stat-icon">👥</span>
          <span className="stat-text">1,200+ Members</span>
        </span>
        <span className="stat">
          <span className="stat-icon">📝</span>
          <span className="stat-text">Daily Posts</span>
        </span>
      </div>
      <div className="recent-topics">
        <h4>Recent Topics:</h4>
        <ul>
          <li>"My glucose finally under control!"</li>
          <li>"Best low-GI Indian breakfast ideas"</li>
          <li>"Managing GDM at work"</li>
        </ul>
      </div>
      <button className="community-btn">
        <span>Join Facebook Group</span>
        <span className="btn-arrow">→</span>
      </button>
    </div>

    <div className="community-card clickable" onClick={() => window.open('https://t.me/gdm_support_india', '_blank')}>
      <div className="card-icon-animated">📱</div>
      <div className="card-badge expert">Expert Tips</div>
      <h3>Telegram Channel</h3>
      <p>Daily tips, meal ideas, and expert advice delivered to your phone</p>
      <div className="community-stats">
        <span className="stat">
          <span className="stat-icon">📢</span>
          <span className="stat-text">800+ Subscribers</span>
        </span>
        <span className="stat">
          <span className="stat-icon">⭐</span>
          <span className="stat-text">Expert Curated</span>
        </span>
      </div>
      <div className="channel-preview">
        <h4>Today's Tip:</h4>
        <p>"Add 1 tbsp of cinnamon to your morning oats - may help regulate blood sugar!"</p>
      </div>
      <button className="community-btn">
        <span>Subscribe to Channel</span>
        <span className="btn-arrow">→</span>
      </button>
    </div>

    <div className="community-card clickable" onClick={() => window.open('https://www.reddit.com/r/GestationalDiabetes/', '_blank')}>
      <div className="card-icon-animated">📖</div>
      <div className="card-badge global">Global Community</div>
      <h3>Reddit Discussions</h3>
      <p>In-depth discussions, scientific articles, and global perspectives</p>
      <div className="community-stats">
        <span className="stat">
          <span className="stat-icon">🌍</span>
          <span className="stat-text">15,000+ Members</span>
        </span>
        <span className="stat">
          <span className="stat-icon">💡</span>
          <span className="stat-text">Evidence-Based</span>
        </span>
      </div>
      <div className="reddit-highlights">
        <h4>Top Discussions:</h4>
        <ul>
          <li>"GDM success stories compilation"</li>
          <li>"Latest research on GDM management"</li>
          <li>"International meal ideas"</li>
        </ul>
      </div>
      <button className="community-btn">
        <span>Join Reddit</span>
        <span className="btn-arrow">→</span>
      </button>
    </div>

    <div className="community-card clickable" onClick={() => window.open('https://meet.google.com/gdm-support', '_blank')}>
      <div className="card-icon-animated">🎥</div>
      <div className="card-badge">Weekly Sessions</div>
      <h3>Virtual Support Meetups</h3>
      <p>Weekly video calls with healthcare educators and peer support</p>
      <div className="community-stats">
        <span className="stat">
          <span className="stat-icon">📅</span>
          <span className="stat-text">Every Saturday 5 PM</span>
        </span>
        <span className="stat">
          <span className="stat-icon">👨‍⚕️</span>
          <span className="stat-text">Expert Led</span>
        </span>
      </div>
      <div className="next-session">
        <h4>Next Session:</h4>
        <p><strong>Saturday, Feb 8 at 5:00 PM</strong></p>
        <p>Topic: "Indian Meal Planning for GDM"</p>
        <p>Speaker: Dr. Priya Sharma, Nutritionist</p>
      </div>
      <button className="community-btn">
        <span>Register for Meetup</span>
        <span className="btn-arrow">→</span>
      </button>
    </div>

    <div className="community-card clickable" onClick={openSuccessStories}>
      <div className="card-icon-animated">⭐</div>
      <div className="card-badge inspiring">Inspiring</div>
      <h3>Success Stories</h3>
      <p>Read how other mothers managed GDM and had healthy babies</p>
      <div className="community-stats">
        <span className="stat">
          <span className="stat-icon">📖</span>
          <span className="stat-text">500+ Stories</span>
        </span>
        <span className="stat">
          <span className="stat-icon">❤️</span>
          <span className="stat-text">Hope & Inspiration</span>
        </span>
      </div>
      <div className="story-preview">
        <div className="story-quote">"I was terrified when diagnosed at 26 weeks. With diet changes and walking, I managed without insulin. My baby was born healthy at 3.2 kg!" - Priya, Mumbai</div>
      </div>
      <button className="community-btn">
        <span>Read Stories</span>
        <span className="btn-arrow">→</span>
      </button>
    </div>

    <div className="community-card clickable" onClick={() => window.open('https://forms.gle/gdm-expert-qa', '_blank')}>
      <div className="card-icon-animated">🩺</div>
      <div className="card-badge">Free</div>
      <h3>Ask the Experts</h3>
      <p>Monthly Q&A with endocrinologists, nutritionists, and obstetricians</p>
      <div className="community-stats">
        <span className="stat">
          <span className="stat-icon">📅</span>
          <span className="stat-text">Last Sunday/Month</span>
        </span>
        <span className="stat">
          <span className="stat-icon">🎓</span>
          <span className="stat-text">Certified Experts</span>
        </span>
      </div>
      <div className="expert-panel">
        <h4>Expert Panel:</h4>
        <ul>
          <li>Dr. Anjali Mehta - Endocrinologist</li>
          <li>Dr. Kavita Singh - Obstetrician</li>
          <li>Neha Gupta - Clinical Nutritionist</li>
        </ul>
      </div>
      <button className="community-btn">
        <span>Submit Question</span>
        <span className="btn-arrow">→</span>
      </button>
    </div>

    <div className="community-card clickable" onClick={findLocalGroups}>
      <div className="card-icon-animated">📍</div>
      <div className="card-badge">Near You</div>
      <h3>Local Support Groups</h3>
      <p>Find in-person support groups in your city</p>
      <div className="community-stats">
        <span className="stat">
          <span className="stat-icon">🏙️</span>
          <span className="stat-text">25+ Cities</span>
        </span>
        <span className="stat">
          <span className="stat-icon">🤝</span>
          <span className="stat-text">In-Person Meetups</span>
        </span>
      </div>
      <div className="location-finder">
        <input type="text" placeholder="Enter your city..." className="city-input" />
        <button className="find-btn">Find Groups</button>
      </div>
      <button className="community-btn">
        <span>Browse All Cities</span>
        <span className="btn-arrow">→</span>
      </button>
    </div>
  </div>

  <div className="community-guidelines">
    <h3>Community Guidelines</h3>
    <div className="guidelines-grid">
      <div className="guideline-item">
        <span className="guideline-icon">💝</span>
        <h4>Be Kind & Supportive</h4>
        <p>We're all on this journey together</p>
      </div>
      <div className="guideline-item">
        <span className="guideline-icon">🔒</span>
        <h4>Privacy First</h4>
        <p>What's shared here stays here</p>
      </div>
      <div className="guideline-item">
        <span className="guideline-icon">🩺</span>
        <h4>Medical Advice Disclaimer</h4>
        <p>Always consult your doctor</p>
      </div>
      <div className="guideline-item">
        <span className="guideline-icon">🌟</span>
        <h4>Share Your Wins</h4>
        <p>Celebrate every victory, big or small</p>
      </div>
    </div>
  </div>
    </section>
  );
};

export default CommunitySection;
