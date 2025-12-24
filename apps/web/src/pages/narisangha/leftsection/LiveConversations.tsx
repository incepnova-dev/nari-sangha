import React, { ChangeEvent } from "react";
import "styles/narisangha/leftsection";

export interface ExternalFeedItem {
  id: string;
  title: string;
  snippet?: string;
  source: string;
  score?: number;
  ageLabel?: string;
  url?: string;
}

interface LiveConversationsProps {
  stage: string;
  setStage: (stage: string) => void;
  loadingFeeds: boolean;
  externalFeeds: ExternalFeedItem[];
}

const LiveConversations: React.FC<LiveConversationsProps> = ({ 
  stage, 
  setStage, 
  loadingFeeds, 
  externalFeeds 
}) => {
  return (
    <div>
      <div className="live-conversations-header">
        <div>
          <h2 className="live-conversations-title">Live Web Conversations</h2>
          <p className="live-conversations-subtitle">
            Curated discussions from connected platforms
          </p>
        </div>
        <select 
          value={stage} 
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setStage(e.target.value)}
          className="live-conversations-select"
        >
          <option value="maternal">Baby & Maternal</option>
          <option value="adolescent">Adolescent & Young</option>
          <option value="reproductive">Reproductive</option>
          <option value="menopause">Perimenopause & Elderly</option>
          <option value="cross">Cross-age & Cancer</option>
        </select>
      </div>

      {loadingFeeds ? (
        <div className="live-conversations-loading">
          Loading external conversations…
        </div>
      ) : externalFeeds.length === 0 ? (
        <div className="live-conversations-empty">
          <div className="live-conversations-empty-icon">🔍</div>
          <div className="live-conversations-empty-text">No conversations found for this stage</div>
          <div className="live-conversations-empty-subtext">
            Try connecting more accounts or selecting a different life stage
          </div>
        </div>
      ) : (
        <div className="live-conversations-grid">
          {externalFeeds.map((item) => (
            <div key={item.id} className="deck-card">
              <div className="deck-header">
                <div>
                  <div className="live-conversations-item-header">
                    <span className="feed-tag">{item.source.toUpperCase()}</span>
                    <span className="live-conversations-item-meta">
                      {item.score} upvotes · {item.ageLabel}
                    </span>
                  </div>
                  <div className="deck-title live-conversations-item-title">{item.title}</div>
                </div>
              </div>
              <div className="live-conversations-item-content">
                <div className="deck-subtitle">{item.snippet}</div>
              </div>
              <div className="deck-footer">
                <div className="deck-footer-actions">
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn small secondary live-conversations-item-link"
                  >
                    Open on {item.source}
                  </a>
                  <button className="btn small primary">
                    Discuss in NariSangha
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveConversations;

