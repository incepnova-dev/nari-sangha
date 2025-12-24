import React from "react";
import "styles/narisangha/leftsection";
import { ExternalGroup } from "./ExternalGroupsList";

export interface Connections {
  discord: boolean;
  facebook: boolean;
  reddit: boolean;
}

interface ProviderConnectionsProps {
  connections: Connections;
  connectingProvider: string | null;
  handleConnectProvider: (provider: string) => void;
  myExternalGroups: ExternalGroup[];
}

const ProviderConnections: React.FC<ProviderConnectionsProps> = ({ 
  connections, 
  connectingProvider, 
  handleConnectProvider, 
  myExternalGroups 
}) => {
  return (
    <div className="provider-connections-container">
      <h2 className="provider-connections-title">Connect Your Accounts</h2>
      <p className="provider-connections-subtitle">
        Link Discord, Facebook or Reddit to discover and sync your existing groups
      </p>
      
      <div className="provider-connections-grid">
        {(["discord", "facebook", "reddit"] as const).map((provider) => (
          <div key={provider} className="deck-card">
            <div className="provider-connections-card">
              <div className="provider-connections-content">
                <div className="provider-connections-name">
                  {provider.charAt(0).toUpperCase() + provider.slice(1)}
                </div>
                <div className="provider-connections-status">
                  {connections[provider]
                    ? "✓ Connected - We can see your communities and suggest relevant ones"
                    : "Connect to discover and sync your groups automatically"}
                </div>
                {connections[provider] && (
                  <div className="provider-connections-chips">
                    <div className="hero-chip provider-connections-chip">
                      {myExternalGroups.filter(g => g.provider === provider).length} groups found
                    </div>
                  </div>
                )}
              </div>
              <button
                className={`${connections[provider] ? "btn small secondary" : "btn primary"} provider-connections-button`}
                disabled={connectingProvider === provider}
                onClick={() => handleConnectProvider(provider)}
              >
                {connections[provider]
                  ? "✓ Connected"
                  : connectingProvider === provider
                  ? "Connecting…"
                  : `Connect ${provider}`}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderConnections;

