import React from "react";
import LiveQAForum from "./LiveQAForum";
import SafetyCard from "./SafetyCard";
import CommunityOverview from "./CommunityOverview";
import FreshDiscussions from "./FreshDiscussions";
import { CreatedGroup } from "../leftsection/CreatedGroupsList";
import { ExternalGroup } from "../leftsection/ExternalGroupsList";
import { ExternalFeedItem } from "../leftsection/LiveConversations";
import { Connections } from "../leftsection/ProviderConnections";

interface RightSectionProps {
  stage: string;
  setStage: (stage: string) => void;
  externalFeeds: ExternalFeedItem[];
  loadingFeeds: boolean;
  fetchExternalFeeds: (stage: string) => void;
  myCreatedGroups: CreatedGroup[];
  myExternalGroups: ExternalGroup[];
  connections: Connections;
  setViewMode: (mode: string) => void;
}

const RightSection: React.FC<RightSectionProps> = ({
  stage,
  setStage,
  externalFeeds,
  loadingFeeds,
  fetchExternalFeeds,
  myCreatedGroups,
  myExternalGroups,
  connections,
  setViewMode
}) => {
  return (
    <aside className="right-column">
      <LiveQAForum />
      <SafetyCard />
      <CommunityOverview 
        myCreatedGroups={myCreatedGroups}
        myExternalGroups={myExternalGroups}
        connections={connections}
        externalFeeds={externalFeeds}
      />
      <FreshDiscussions 
        stage={stage}
        setStage={setStage}
        loadingFeeds={loadingFeeds}
        externalFeeds={externalFeeds}
        fetchExternalFeeds={fetchExternalFeeds}
        setViewMode={setViewMode}
      />
    </aside>
  );
};

export default RightSection;

