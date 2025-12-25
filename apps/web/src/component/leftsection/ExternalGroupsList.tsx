import React from "react";
import "styles/narisangha/leftsection";

export interface ExternalGroup {
  id: string;
  name: string;
  description?: string;
  provider?: string;
  memberCount?: string | number;
  activityLevel?: string;
}

interface ExternalGroupsListProps {
  myExternalGroups: ExternalGroup[];
  setViewMode: (mode: string) => void;
}

const ExternalGroupsList: React.FC<ExternalGroupsListProps> = ({ myExternalGroups, setViewMode }) => {
  return (
    <div>
      <h2 className="external-groups-title">External Communities You Joined</h2>
      <p className="external-groups-subtitle">
        Discord, Facebook, and Reddit groups you're part of
      </p>
      
      {myExternalGroups.length === 0 ? (
        <div className="external-groups-empty">
          <div className="external-groups-empty-icon">🔗</div>
          <div className="external-groups-empty-text">No external groups connected</div>
          <button 
            className="btn primary external-groups-empty-button"
            onClick={() => setViewMode("discover")}
          >
            Connect your accounts
          </button>
        </div>
      ) : (
        <div className="external-groups-grid">
          {myExternalGroups.map((group) => (
            <div key={group.id} className="deck-card">
              <div className="deck-header">
                <div>
                  <div className="external-groups-item-header-row">
                    <div className="deck-title">{group.name}</div>
                    <span className="feed-tag external-groups-item-tag">
                      {group.provider}
                    </span>
                  </div>
                  <div className="deck-subtitle">{group.description || "External community"}</div>
                </div>
              </div>
              <div className="external-groups-item-content">
                <div className="external-groups-item-meta">
                  <div>👥 {group.memberCount || "N/A"} members</div>
                  <div>📊 {group.activityLevel || "Active"}</div>
                  <div>🔔 Synced to feed</div>
                </div>
              </div>
              <div className="deck-footer">
                <div className="deck-footer-actions">
                  <button className="btn small secondary">View on {group.provider}</button>
                  <button className="btn small secondary">Sync Settings</button>
                  <button className="btn small primary">Open Feed</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExternalGroupsList;

