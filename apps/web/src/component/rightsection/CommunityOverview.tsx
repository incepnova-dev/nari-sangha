import React from "react";
import "styles/narisangha/rightsection";
import { CreatedGroup } from "../leftsection/CreatedGroupsList";
import { ExternalGroup } from "../leftsection/ExternalGroupsList";
import { ExternalFeedItem } from "../leftsection/LiveConversations";
import { Connections } from "../leftsection/ProviderConnections";

interface CommunityOverviewProps {
  myCreatedGroups: CreatedGroup[];
  myExternalGroups: ExternalGroup[];
  connections: Connections;
  externalFeeds: ExternalFeedItem[];
}

const CommunityOverview: React.FC<CommunityOverviewProps> = ({ 
  myCreatedGroups, 
  myExternalGroups, 
  connections, 
  externalFeeds 
}) => {
  return (
    <section className="forum-card community-overview-section">
      <header>
        <div>
          <h2>Your Community Overview</h2>
          <p>Quick snapshot of your activity across platforms</p>
        </div>
      </header>
      <div className="community-overview-content">
        <div className="community-overview-grid">
          <div className="community-overview-stat community-overview-stat-created">
            <div className="community-overview-stat-value">
              {myCreatedGroups.length}
            </div>
            <div className="community-overview-stat-label">Created Groups</div>
          </div>
          <div className="community-overview-stat community-overview-stat-joined">
            <div className="community-overview-stat-value">
              {myExternalGroups.length}
            </div>
            <div className="community-overview-stat-label">Joined Groups</div>
          </div>
          <div className="community-overview-stat community-overview-stat-platforms">
            <div className="community-overview-stat-value">
              {Object.values(connections).filter(Boolean).length}
            </div>
            <div className="community-overview-stat-label">Connected Platforms</div>
          </div>
          <div className="community-overview-stat community-overview-stat-conversations">
            <div className="community-overview-stat-value">
              {externalFeeds.length}
            </div>
            <div className="community-overview-stat-label">Active Conversations</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityOverview;

