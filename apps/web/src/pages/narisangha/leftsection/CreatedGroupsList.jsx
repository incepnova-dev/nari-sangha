import React from "react";
import "../../../styles/narisangha/leftsection/CreatedGroupsList.css";

const CreatedGroupsList = ({ myCreatedGroups, setViewMode, setMode }) => {
  return (
    <div className="created-groups-container">
      <h2 className="created-groups-title">Communities You Created</h2>
      <p className="created-groups-subtitle">
        Communities you've built across platforms
      </p>
      
      {myCreatedGroups.length === 0 ? (
        <div className="created-groups-empty">
          <div className="created-groups-empty-icon">🌱</div>
          <div className="created-groups-empty-text">No communities created yet</div>
          <button 
            className="btn primary created-groups-empty-button"
            onClick={() => { setViewMode("setup"); setMode("create"); }}
          >
            Create your first community
          </button>
        </div>
      ) : (
        <div className="created-groups-grid">
          {myCreatedGroups.map((group) => (
            <div key={group.id} className="deck-card">
              <div className="deck-header">
                <div>
                  <div className="created-groups-item-header-row">
                    <div className="deck-title">{group.name}</div>
                    <span className="deck-pill">{group.privacy}</span>
                  </div>
                  <div className="deck-subtitle">{group.description}</div>
                </div>
              </div>
              <div className="created-groups-item-content">
                <div className="created-groups-item-platforms">
                  {group.platforms?.split(",").map((platform) => (
                    <div key={platform} className="hero-chip created-groups-item-platform-chip">
                      {platform.trim()}
                    </div>
                  ))}
                </div>
                <div className="created-groups-item-meta">
                  <div>📍 {group.location || "Global"}</div>
                  <div>👥 {group.memberCount || 0} members</div>
                  <div>💬 {group.topics}</div>
                </div>
              </div>
              <div className="deck-footer">
                <div className="deck-footer-actions">
                  <button className="btn small secondary">View Dashboard</button>
                  <button className="btn small secondary">Manage Settings</button>
                  <button className="btn small primary">Open Community</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreatedGroupsList;

