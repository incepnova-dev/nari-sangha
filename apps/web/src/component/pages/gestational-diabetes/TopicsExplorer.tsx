import React from 'react';
import '../../../styles/pages/gestational-diabetes.css';

interface TopicsExplorerProps {
  openTopicPanel?: (topic: string) => void;
}

const TopicsExplorer: React.FC<TopicsExplorerProps> = ({ 
  openTopicPanel = () => {} 
}) => {
  return (
    <section id="learn" className="topics-explorer">
      <div className="section-header">
        <div className="header-badge-prominent">
          <span className="badge-pulse"></span>
          <span className="badge-text">25 Comprehensive Topics</span>
        </div>
        <h2 className="section-title-prominent">
          Your Complete <span className="title-highlight">GDM Knowledge Hub</span>
        </h2>
        <p className="section-subtitle-prominent">
          <span className="subtitle-sparkle">💡</span>
          Medically-accurate, beautifully explained. Each topic card opens a world of interactive learning — 
          <strong>click to explore</strong> blood sugar science, nutrition plans, monitoring techniques, and evidence-based care strategies.
          <span className="subtitle-sparkle">💡</span>
        </p>
      </div>


      <div className="topics-grid">
        <div className="topic-card" data-topic="understanding" onClick={() => openTopicPanel('understanding')}>
          <div className="topic-header" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="topic-icon">📚</div>
            <div className="topic-number">01</div>
          </div>
          <div className="topic-body">
            <h3 className="topic-title">Understanding Gestational Diabetes</h3>
            <p className="topic-preview">What is GDM, why it happens, and how it affects 3-25% of pregnancies in India</p>
            <div className="topic-tags">
              <span className="tag">Basics</span>
              <span className="tag">Definition</span>
            </div>
          </div>
          <div className="topic-footer">
            <span className="read-time">⏱ 5 min read</span>
            <span className="topic-arrow">→</span>
          </div>
        </div>

        <div className="topic-card" data-topic="risk-factors" onClick={() => openTopicPanel('risk-factors')}>
          <div className="topic-header" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <div className="topic-icon">⚠️</div>
            <div className="topic-number">02</div>
          </div>
          <div className="topic-body">
            <h3 className="topic-title">Risk Factors for Indian Women</h3>
            <p className="topic-preview">Genetic predisposition, lifestyle factors, and high-risk categories specific to South Asian women</p>
            <div className="topic-tags">
              <span className="tag">Risk Assessment</span>
              <span className="tag">Prevention</span>
            </div>
          </div>
          <div className="topic-footer">
            <span className="read-time">⏱ 7 min read</span>
            <span className="topic-arrow">→</span>
          </div>
        </div>

        <div className="topic-card" data-topic="screening" onClick={() => openTopicPanel('screening')}>
          <div className="topic-header" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <div className="topic-icon">🔬</div>
            <div className="topic-number">03</div>
          </div>
          <div className="topic-body">
            <h3 className="topic-title">Screening and Diagnosis</h3>
            <p className="topic-preview">OGTT testing, diagnostic criteria, and screening protocols (DIPSI/WHO guidelines)</p>
            <div className="topic-tags">
              <span className="tag">Testing</span>
              <span className="tag">ICMR Guidelines</span>
            </div>
          </div>
          <div className="topic-footer">
            <span className="read-time">⏱ 6 min read</span>
            <span className="topic-arrow">→</span>
          </div>
        </div>

        <div className="topic-card" data-topic="symptoms" onClick={() => openTopicPanel('symptoms')}>
          <div className="topic-header" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
            <div className="topic-icon">🌡️</div>
            <div className="topic-number">04</div>
          </div>
          <div className="topic-body">
            <h3 className="topic-title">Symptoms: Mild to Severe</h3>
            <p className="topic-preview">Recognizing symptoms from mild thirst to critical warning signs requiring immediate attention</p>
            <div className="topic-tags">
              <span className="tag">Warning Signs</span>
              <span className="tag">Emergency</span>
            </div>
          </div>
          <div className="topic-footer">
            <span className="read-time">⏱ 8 min read</span>
            <span className="topic-arrow">→</span>
          </div>
        </div>

        
        <div className="topic-card" data-topic="doctor-visit" onClick={() => openTopicPanel('doctor-visit')}>
          <div className="topic-header" style={{ background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' }}>
            <div className="topic-icon">👨‍⚕️</div>
            <div className="topic-number">05</div>
          </div>
          <div className="topic-body">
            <h3 className="topic-title">When to See Your Doctor</h3>
            <p className="topic-preview">Immediate, urgent, and routine care timelines for optimal GDM management</p>
            <div className="topic-tags">
              <span className="tag">Medical Care</span>
              <span className="tag">Emergency</span>
            </div>
          </div>
          <div className="topic-footer">
            <span className="read-time">⏱ 5 min read</span>
            <span className="topic-arrow">→</span>
          </div>
        </div>

        
        <div className="topic-card" data-topic="mother-impact" onClick={() => openTopicPanel('mother-impact')}>
          <div className="topic-header" style={{ background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }}>
            <div className="topic-icon">🤰</div>
            <div className="topic-number">06</div>
          </div>
          <div className="topic-body">
            <h3 className="topic-title">Impact on Mother's Health</h3>
            <p className="topic-preview">Short-term complications and long-term health implications including Type 2 diabetes risk</p>
            <div className="topic-tags">
              <span className="tag">Maternal Health</span>
              <span className="tag">Long-term</span>
            </div>
          </div>
          <div className="topic-footer">
            <span className="read-time">⏱ 9 min read</span>
            <span className="topic-arrow">→</span>
          </div>
        </div>

        
        <div className="topic-card" data-topic="baby-impact" onClick={() => openTopicPanel('baby-impact')}>
          <div className="topic-header" style={{ background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' }}>
            <div className="topic-icon">👶</div>
            <div className="topic-number">07</div>
          </div>
          <div className="topic-body">
            <h3 className="topic-title">Impact on Baby's Health</h3>
            <p className="topic-preview">Understanding macrosomia, birth complications, and long-term health effects on your child</p>
            <div className="topic-tags">
              <span className="tag">Fetal Health</span>
              <span className="tag">Neonatal</span>
            </div>
          </div>
          <div className="topic-footer">
            <span className="read-time">⏱ 8 min read</span>
            <span className="topic-arrow">→</span>
          </div>
        </div>

        
        <div className="topic-card" data-topic="doctor-questions" onClick={() => openTopicPanel('doctor-questions')}>
          <div className="topic-header" style={{ background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' }}>
            <div className="topic-icon">❓</div>
            <div className="topic-number">08</div>
          </div>
          <div className="topic-body">
            <h3 className="topic-title">Questions to Ask Your Doctor</h3>
            <p className="topic-preview">Essential questions about diagnosis, treatment, baby's health, and delivery planning</p>
            <div className="topic-tags">
              <span className="tag">Communication</span>
              <span className="tag">Empowerment</span>
            </div>
          </div>
          <div className="topic-footer">
            <span className="read-time">⏱ 6 min read</span>
            <span className="topic-arrow">→</span>
          </div>
        </div>

        
        <div className="topic-card" data-topic="medical-management" onClick={() => openTopicPanel('medical-management')}>
          <div className="topic-header" style={{ background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)' }}>
            <div className="topic-icon">💊</div>
            <div className="topic-number">09</div>
          </div>
          <div className="topic-body">
            <h3 className="topic-title">Medical Management</h3>
            <p className="topic-preview">Dietary management, exercise, insulin therapy, and medication options</p>
            <div className="topic-tags">
              <span className="tag">Treatment</span>
              <span className="tag">Medications</span>
            </div>
          </div>
          <div className="topic-footer">
            <span className="read-time">⏱ 10 min read</span>
            <span className="topic-arrow">→</span>
          </div>
        </div>

        
        <div className="topic-card" data-topic="monitoring" onClick={() => openTopicPanel('monitoring')}>
          <div className="topic-header" style={{ background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' }}>
            <div className="topic-icon">📊</div>
            <div className="topic-number">10</div>
          </div>
          <div className="topic-body">
            <h3 className="topic-title">Blood Glucose Monitoring</h3>
            <p className="topic-preview">Home monitoring guidelines, target levels, and tracking tools (ACOG/ADA standards)</p>
            <div className="topic-tags">
              <span className="tag">Self-Care</span>
              <span className="tag">Daily Tracking</span>
            </div>
          </div>
          <div className="topic-footer">
            <span className="read-time">⏱ 7 min read</span>
            <span className="topic-arrow">→</span>
          </div>
        </div>

        
        <div className="topic-card" data-topic="diet" onClick={() => openTopicPanel('diet')}>
          <div className="topic-header" style={{ background: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)' }}>
            <div className="topic-icon">🥗</div>
            <div className="topic-number">11</div>
          </div>
          <div className="topic-body">
            <h3 className="topic-title">Dietary Guidelines for Indian Women</h3>
            <p className="topic-preview">Indian meal planning, foods to include and avoid, and practical tips for managing GDM</p>
            <div className="topic-tags">
              <span className="tag">Nutrition</span>
              <span className="tag">Indian Diet</span>
            </div>
          </div>
          <div className="topic-footer">
            <span className="read-time">⏱ 12 min read</span>
            <span className="topic-arrow">→</span>
          </div>
        </div>

        
        <div className="topic-card" data-topic="exercise" onClick={() => openTopicPanel('exercise')}>
          <div className="topic-header" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
            <div className="topic-icon">💪</div>
            <div className="topic-number">12</div>
          </div>
          <div className="topic-body">
            <h3 className="topic-title">Exercise and Physical Activity</h3>
            <p className="topic-preview">Safe exercises during pregnancy, guidelines, and benefits for glucose control</p>
            <div className="topic-tags">
              <span className="tag">Fitness</span>
              <span className="tag">Safety</span>
            </div>
          </div>
          <div className="topic-footer">
            <span className="read-time">⏱ 8 min read</span>
            <span className="topic-arrow">→</span>
          </div>
        </div>

        
        <div className="topic-card" data-topic="pregnancy-stages" onClick={() => openTopicPanel('pregnancy-stages')}>
          <div className="topic-header" style={{ background: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)' }}>
            <div className="topic-icon">📅</div>
            <div className="topic-number">13</div>
          </div>
          <div className="topic-body">
            <h3 className="topic-title">Journey Through Pregnancy Stages</h3>
            <p className="topic-preview">Trimester-by-trimester guide to managing GDM from diagnosis to delivery</p>
            <div className="topic-tags">
              <span className="tag">Timeline</span>
              <span className="tag">Care Plan</span>
            </div>
          </div>
          <div className="topic-footer">
            <span className="read-time">⏱ 11 min read</span>
            <span className="topic-arrow">→</span>
          </div>
        </div>

        
        <div className="topic-card" data-topic="warning-signs" onClick={() => openTopicPanel('warning-signs')}>
          <div className="topic-header" style={{ background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)' }}>
            <div className="topic-icon">🚨</div>
            <div className="topic-number">14</div>
          </div>
          <div className="topic-body">
            <h3 className="topic-title">Alarming Signs to Watch For</h3>
            <p className="topic-preview">Critical warning signs for both mother and baby requiring immediate medical attention</p>
            <div className="topic-tags">
              <span className="tag">Emergency</span>
              <span className="tag">Safety</span>
            </div>
          </div>
          <div className="topic-footer">
            <span className="read-time">⏱ 6 min read</span>
            <span className="topic-arrow">→</span>
          </div>
        </div>

        
        <div className="topic-card" data-topic="family-support" onClick={() => openTopicPanel('family-support')}>
          <div className="topic-header" style={{ background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' }}>
            <div className="topic-icon">👨‍👩‍👧‍👦</div>
            <div className="topic-number">15</div>
          </div>
          <div className="topic-body">
            <h3 className="topic-title">Family Support and Care</h3>
            <p className="topic-preview">How family members can support, create supportive environment, and emotional needs</p>
            <div className="topic-tags">
              <span className="tag">Support System</span>
              <span className="tag">Family Care</span>
            </div>
          </div>
          <div className="topic-footer">
            <span className="read-time">⏱ 9 min read</span>
            <span className="topic-arrow">→</span>
          </div>
        </div>

        
        <div className="topic-card" data-topic="prevention" onClick={() => openTopicPanel('prevention')}>
          <div className="topic-header" style={{ background: 'linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)' }}>
            <div className="topic-icon">🛡️</div>
            <div className="topic-number">16</div>
          </div>
          <div className="topic-body">
            <h3 className="topic-title">Preventive Steps for Future</h3>
            <p className="topic-preview">Preventing GDM in next pregnancy and reducing Type 2 diabetes risk</p>
            <div className="topic-tags">
              <span className="tag">Prevention</span>
              <span className="tag">Future Health</span>
            </div>
          </div>
          <div className="topic-footer">
            <span className="read-time">⏱ 7 min read</span>
            <span className="topic-arrow">→</span>
          </div>
        </div>

        
        <div className="topic-card" data-topic="postpartum" onClick={() => openTopicPanel('postpartum')}>
          <div className="topic-header" style={{ background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)' }}>
            <div className="topic-icon">🌸</div>
            <div className="topic-number">17</div>
          </div>
          <div className="topic-body">
            <h3 className="topic-title">Postpartum Care</h3>
            <p className="topic-preview">After delivery care, glucose monitoring, and long-term follow-up schedule</p>
            <div className="topic-tags">
              <span className="tag">Recovery</span>
              <span className="tag">Follow-up</span>
            </div>
          </div>
          <div className="topic-footer">
            <span className="read-time">⏱ 8 min read</span>
            <span className="topic-arrow">→</span>
          </div>
        </div>

        
        <div className="topic-card" data-topic="breastfeeding" onClick={() => openTopicPanel('breastfeeding')}>
          <div className="topic-header" style={{ background: 'linear-gradient(135deg, #f3e7e9 0%, #e3eeff 100%)' }}>
            <div className="topic-icon">🤱</div>
            <div className="topic-number">18</div>
          </div>
          <div className="topic-body">
            <h3 className="topic-title">Breastfeeding with GDM History</h3>
            <p className="topic-preview">Benefits of breastfeeding for mother and baby, tips for successful nursing</p>
            <div className="topic-tags">
              <span className="tag">Breastfeeding</span>
              <span className="tag">Benefits</span>
            </div>
          </div>
          <div className="topic-footer">
            <span className="read-time">⏱ 6 min read</span>
            <span className="topic-arrow">→</span>
          </div>
        </div>

        
        <div className="topic-card" data-topic="lifestyle" onClick={() => openTopicPanel('lifestyle')}>
          <div className="topic-header" style={{ background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)' }}>
            <div className="topic-icon">🏃‍♀️</div>
            <div className="topic-number">19</div>
          </div>
          <div className="topic-body">
            <h3 className="topic-title">Lifestyle Modifications</h3>
            <p className="topic-preview">Long-term dietary changes, physical activity, and sustainable weight management</p>
            <div className="topic-tags">
              <span className="tag">Lifestyle</span>
              <span className="tag">Sustainability</span>
            </div>
          </div>
          <div className="topic-footer">
            <span className="read-time">⏱ 10 min read</span>
            <span className="topic-arrow">→</span>
          </div>
        </div>

        
        <div className="topic-card" data-topic="myths" onClick={() => openTopicPanel('myths')}>
          <div className="topic-header" style={{ background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)' }}>
            <div className="topic-icon">🔍</div>
            <div className="topic-number">20</div>
          </div>
          <div className="topic-body">
            <h3 className="topic-title">Traditional Practices & Myths</h3>
            <p className="topic-preview">Separating facts from fiction, safe traditional practices, and what to avoid</p>
            <div className="topic-tags">
              <span className="tag">Myths</span>
              <span className="tag">Facts</span>
            </div>
          </div>
          <div className="topic-footer">
            <span className="read-time">⏱ 8 min read</span>
            <span className="topic-arrow">→</span>
          </div>
        </div>

        
        <div className="topic-card" data-topic="emotional-health" onClick={() => openTopicPanel('emotional-health')}>
          <div className="topic-header" style={{ background: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)' }}>
            <div className="topic-icon">🧘‍♀️</div>
            <div className="topic-number">21</div>
          </div>
          <div className="topic-body">
            <h3 className="topic-title">Emotional and Mental Health</h3>
            <p className="topic-preview">Managing anxiety, stress, guilt, and maintaining mental wellbeing during pregnancy</p>
            <div className="topic-tags">
              <span className="tag">Mental Health</span>
              <span className="tag">Coping</span>
            </div>
          </div>
          <div className="topic-footer">
            <span className="read-time">⏱ 9 min read</span>
            <span className="topic-arrow">→</span>
          </div>
        </div>

        
        <div className="topic-card" data-topic="work-life" onClick={() => openTopicPanel('work-life')}>
          <div className="topic-header" style={{ background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)' }}>
            <div className="topic-icon">💼</div>
            <div className="topic-number">22</div>
          </div>
          <div className="topic-body">
            <h3 className="topic-title">Work and Daily Life Management</h3>
            <p className="topic-preview">Managing GDM at workplace, social situations, and daily routines</p>
            <div className="topic-tags">
              <span className="tag">Work-Life</span>
              <span className="tag">Practical Tips</span>
            </div>
          </div>
          <div className="topic-footer">
            <span className="read-time">⏱ 7 min read</span>
            <span className="topic-arrow">→</span>
          </div>
        </div>

        
        <div className="topic-card" data-topic="financial" onClick={() => openTopicPanel('financial')}>
          <div className="topic-header" style={{ background: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)' }}>
            <div className="topic-icon">💰</div>
            <div className="topic-number">23</div>
          </div>
          <div className="topic-body">
            <h3 className="topic-title">Financial Considerations</h3>
            <p className="topic-preview">Healthcare costs, government schemes, insurance coverage, and cost-saving strategies</p>
            <div className="topic-tags">
              <span className="tag">Finances</span>
              <span className="tag">Resources</span>
            </div>
          </div>
          <div className="topic-footer">
            <span className="read-time">⏱ 6 min read</span>
            <span className="topic-arrow">→</span>
          </div>
        </div>

        
        <div className="topic-card" data-topic="technology" onClick={() => openTopicPanel('technology')}>
          <div className="topic-header" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="topic-icon">📱</div>
            <div className="topic-number">24</div>
          </div>
          <div className="topic-body">
            <h3 className="topic-title">Technology and Resources</h3>
            <p className="topic-preview">Helpful apps, tracking tools, reliable sources (ICMR, WHO, ACOG, FOGSI)</p>
            <div className="topic-tags">
              <span className="tag">Technology</span>
              <span className="tag">Tools</span>
            </div>
          </div>
          <div className="topic-footer">
            <span className="read-time">⏱ 7 min read</span>
            <span className="topic-arrow">→</span>
          </div>
        </div>

        
        <div className="topic-card" data-topic="delivery" onClick={() => openTopicPanel('delivery')}>
          <div className="topic-header" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
            <div className="topic-icon">🏥</div>
            <div className="topic-number">25</div>
          </div>
          <div className="topic-body">
            <h3 className="topic-title">Labor and Delivery Preparation</h3>
            <p className="topic-preview">What to expect during labor, delivery planning, and immediate postpartum care</p>
            <div className="topic-tags">
              <span className="tag">Delivery</span>
              <span className="tag">Planning</span>
            </div>
          </div>
          <div className="topic-footer">
            <span className="read-time">⏱ 10 min read</span>
            <span className="topic-arrow">→</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopicsExplorer;
