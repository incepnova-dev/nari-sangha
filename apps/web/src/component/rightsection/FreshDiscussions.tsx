import React, { ChangeEvent } from "react";
import "styles/narisangha/rightsection";
import { ExternalFeedItem } from "../leftsection/LiveConversations";

interface FreshDiscussionsProps {
  stage: string;
  setStage: (stage: string) => void;
  loadingFeeds: boolean;
  externalFeeds: ExternalFeedItem[];
  fetchExternalFeeds: (stage: string) => void;
  setViewMode: (mode: string) => void;
}

const FreshDiscussions: React.FC<FreshDiscussionsProps> = ({ 
  stage, 
  setStage, 
  loadingFeeds, 
  externalFeeds, 
  fetchExternalFeeds, 
  setViewMode 
}) => {
  return (
    <section className="forum-card fresh-discussions-section">
      <header>
        <div>
          <h2>Fresh Community Discussions</h2>
          <p>Latest posts from Reddit, Quora, Instagram, Facebook & Discord</p>
        </div>
      </header>
      
      <div className="feed-filters fresh-discussions-filters">
        <select 
          value={stage} 
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setStage(e.target.value)}
          className="fresh-discussions-select"
        >
          <option value="maternal">Baby & Maternal</option>
          <option value="adolescent">Adolescent & Young</option>
          <option value="reproductive">Reproductive</option>
          <option value="menopause">Perimenopause & Elderly</option>
          <option value="cross">Cross-age & Cancer</option>
        </select>
        <button 
          className="btn small secondary"
          onClick={() => fetchExternalFeeds(stage)}
        >
          Refresh
        </button>
      </div>

      {loadingFeeds ? (
        <div className="fresh-discussions-loading">
          Loading fresh discussions…
        </div>
      ) : externalFeeds.length === 0 ? (
        <div className="fresh-discussions-empty">
          <div className="fresh-discussions-empty-icon">💬</div>
          <div className="fresh-discussions-empty-text">
            No discussions found. Try connecting more platforms in Discover tab.
          </div>
        </div>
      ) : (
        <div className="feed-items">
          {externalFeeds.slice(0, 5).map((item) => (
            <article key={item.id} className="feed-item">
              <div className="fresh-discussions-item-header">
                <span className="feed-tag">{item.source}</span>
                <span className="fresh-discussions-item-age">
                  {item.ageLabel}
                </span>
              </div>
              <div className="feed-item-title">{item.title}</div>
              <div className="feed-item-snippet">{item.snippet}</div>
              <div className="feed-item-meta">
                <span>{item.score || 0} upvotes</span>
                <a href={item.url} target="_blank" rel="noreferrer" className="feed-link">
                  Open discussion
                </a>
              </div>
            </article>
          ))}
          
          {externalFeeds.length > 5 && (
            <button 
              className="btn small secondary fresh-discussions-view-all"
              onClick={() => setViewMode("discover")}
            >
              View all {externalFeeds.length} discussions
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default FreshDiscussions;

