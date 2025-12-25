import React from "react";
import HeroCard from "./HeroCard";
import ModeToggle from "./ModeToggle";
import CreateCard from "./CreateCard";
import JoinCard from "./JoinCard";
import CreatedGroupsList from "./CreatedGroupsList";
import ExternalGroupsList from "./ExternalGroupsList";
import ProviderConnections from "./ProviderConnections";
import LiveConversations from "./LiveConversations";
import "styles/narisangha/leftsection";
import { CreateForm } from "./CreateCard";
import { JoinForm } from "./JoinCard";
import { CreatedGroup } from "./CreatedGroupsList";
import { ExternalGroup } from "./ExternalGroupsList";
import { ExternalFeedItem } from "./LiveConversations";
import { Connections } from "./ProviderConnections";

interface LeftSectionProps {
  mode: string;
  setMode: (mode: string) => void;
  viewMode: string;
  setViewMode: (mode: string) => void;
  createForm: CreateForm;
  handleCreateChange: (field: keyof CreateForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  previewCreate: () => void;
  continueCreate: () => void;
  joinForm: JoinForm;
  handleJoinChange: (field: keyof JoinForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  previewJoin: () => void;
  continueJoin: () => void;
  myCreatedGroups: CreatedGroup[];
  myExternalGroups: ExternalGroup[];
  connections: Connections;
  connectingProvider: string | null;
  handleConnectProvider: (provider: string) => void;
  stage: string;
  setStage: (stage: string) => void;
  loadingFeeds: boolean;
  externalFeeds: ExternalFeedItem[];
}

const LeftSection: React.FC<LeftSectionProps> = ({
  mode: _mode,
  setMode,
  viewMode,
  setViewMode,
  createForm,
  handleCreateChange,
  previewCreate,
  continueCreate,
  joinForm,
  handleJoinChange,
  previewJoin,
  continueJoin,
  myCreatedGroups,
  myExternalGroups,
  connections,
  connectingProvider,
  handleConnectProvider,
  stage,
  setStage,
  loadingFeeds,
  externalFeeds
}) => {
  return (
    <section>
      <HeroCard setMode={setMode} />
      <ModeToggle viewMode={viewMode} setViewMode={setViewMode} />

      {viewMode === "setup" && (
        <div className="deck-shell">
          <CreateCard 
            createForm={createForm}
            handleCreateChange={handleCreateChange}
            previewCreate={previewCreate}
            continueCreate={continueCreate}
          />
          <JoinCard 
            joinForm={joinForm}
            handleJoinChange={handleJoinChange}
            previewJoin={previewJoin}
            continueJoin={continueJoin}
          />
        </div>
      )}

      {viewMode === "mygroups" && (
        <div className="left-section-margin-top">
          <CreatedGroupsList 
            myCreatedGroups={myCreatedGroups}
            setViewMode={setViewMode}
            setMode={setMode}
          />
          <ExternalGroupsList 
            myExternalGroups={myExternalGroups}
            setViewMode={setViewMode}
          />
        </div>
      )}

      {viewMode === "discover" && (
        <div className="left-section-margin-top">
          <ProviderConnections 
            connections={connections}
            connectingProvider={connectingProvider}
            handleConnectProvider={handleConnectProvider}
            myExternalGroups={myExternalGroups}
          />
          <LiveConversations 
            stage={stage}
            setStage={setStage}
            loadingFeeds={loadingFeeds}
            externalFeeds={externalFeeds}
          />
        </div>
      )}
    </section>
  );
};

export default LeftSection;

