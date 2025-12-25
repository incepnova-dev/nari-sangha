import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "styles/narisangha";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import MainSection from "../main/MainSection";
import { CreateForm } from "../leftsection/CreateCard";
import { JoinForm } from "../leftsection/JoinCard";
import { CreatedGroup } from "../leftsection/CreatedGroupsList";
import { ExternalGroup } from "../leftsection/ExternalGroupsList";
import { ExternalFeedItem } from "../leftsection/LiveConversations";
import { Connections } from "../leftsection/ProviderConnections";
import { getCurrentUser } from "../../services";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<string>("create");
  const [language, setLanguage] = useState<string>("en");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  
  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      
      if (!token) {
        // No token found, redirect to landing page
        navigate("/");
        return;
      }
      
      // Try to get current user
      const result = await getCurrentUser();
      if (result.success && result.data) {
        setCurrentUser(result.data);
      } else {
        // Authentication failed, redirect to landing page
        navigate("/");
        return;
      }
      
      setIsCheckingAuth(false);
    };
    
    checkAuth();
  }, [navigate]);
  
  // Debug: Log when currentUser changes
  useEffect(() => {
  }, [currentUser]);
  
  // Wrap setCurrentUser to add debugging
  const handleSetCurrentUser = (userData: any) => {
    setCurrentUser(userData);
  };
  
  // External connections and feeds state
  const [connections, setConnections] = useState<Connections>({
    discord: false,
    facebook: false,
    reddit: false,
  });
  const [externalFeeds, setExternalFeeds] = useState<ExternalFeedItem[]>([]);
  const [myExternalGroups, setMyExternalGroups] = useState<ExternalGroup[]>([]);
  const [loadingFeeds, setLoadingFeeds] = useState<boolean>(false);
  const [connectingProvider, setConnectingProvider] = useState<string | null>(null);
  const [stage, setStage] = useState<string>("maternal");
  const [myCreatedGroups, setMyCreatedGroups] = useState<CreatedGroup[]>([]);
  const [viewMode, setViewMode] = useState<string>("setup"); // setup, mygroups, discover

  const [createForm, setCreateForm] = useState<CreateForm>({
    name: "",
    description: "",
    topics: "",
    languages: "",
    location: "",
    privacy: "public",
    platforms: "internal"
  });
  
  const [joinForm, setJoinForm] = useState<JoinForm>({
    topics: "",
    ageRange: "",
    languages: "",
    platformPreference: "",
    anonymity: "ok"
  });

  // Fetch external data on mount and stage change (only when authenticated)
  useEffect(() => {
    if (!isCheckingAuth && currentUser) {
      fetchConnections();
      fetchExternalFeeds(stage);
      fetchMyExternalGroups();
      fetchMyCreatedGroups();
    }
  }, [stage, isCheckingAuth, currentUser]);

  const fetchConnections = async () => {
    try {
      const res = await fetch("/api/community/connections");
      const data = await res.json();
      setConnections(data);
    } catch (e) {
      console.error("Error fetching connections", e);
    }
  };

  const fetchExternalFeeds = async (lifeStage: string) => {
    setLoadingFeeds(true);
    try {
      const res = await fetch(`/api/community/external/feeds?stage=${lifeStage}`);
      const data = await res.json();
      setExternalFeeds(data.items || []);
    } catch (e) {
      console.error("Error fetching feeds", e);
    } finally {
      setLoadingFeeds(false);
    }
  };

  const fetchMyExternalGroups = async () => {
    try {
      const res = await fetch("/api/community/external/my-groups");
      const data = await res.json();
      setMyExternalGroups(data.groups || []);
    } catch (e) {
      console.error("Error fetching external groups", e);
    }
  };

  const fetchMyCreatedGroups = async () => {
    try {
      const res = await fetch("/api/community/my-created-groups");
      const data = await res.json();
      setMyCreatedGroups(data.groups || []);
    } catch (e) {
      console.error("Error fetching created groups", e);
    }
  };

  const handleConnectProvider = async (provider: string) => {
    setConnectingProvider(provider);
    try {
      const res = await fetch(`/api/community/connect/${provider}`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.authUrl) {
        window.location.href = data.authUrl;
      }
    } catch (e) {
      console.error("Error connecting provider", e);
    } finally {
      setConnectingProvider(null);
    }
  };

  const handleCreateChange = (field: keyof CreateForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCreateForm({ ...createForm, [field]: e.target.value });
  };

  const handleJoinChange = (field: keyof JoinForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setJoinForm({ ...joinForm, [field]: e.target.value });
  };

  const callAgent = async (path: string, body: any) => {
    try {
      const res = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error("[agent] error:", err);
      alert("Agent service unavailable. Wire this to your backend.");
      throw err;
    }
  };

  const previewCreate = async () => {
    const payload = createForm;
    await callAgent("/agent/previewCommunity", { mode: "create", ...payload });
  };

  const continueCreate = async () => {
    const payload = createForm;
    const result = await callAgent("/agent/createCommunity", { mode: "create", ...payload });
    // Refresh created groups after successful creation
    if (result) {
      fetchMyCreatedGroups();
      setViewMode("mygroups");
    }
  };

  const previewJoin = async () => {
    const payload = joinForm;
    await callAgent("/agent/previewCommunities", { mode: "join", ...payload });
  };

  const continueJoin = async () => {
    const payload = joinForm;
    await callAgent("/agent/searchCommunities", {
      mode: "join",
      ...payload
    });
  };

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return null; // or a loading spinner
  }

  return (
    <div className="page-shell">
      <Header 
        mode={mode}
        setMode={setMode}
        language={language}
        setLanguage={setLanguage}
        currentUser={currentUser}
        setCurrentUser={handleSetCurrentUser}
      />

      <MainSection
        currentUser={currentUser}
        language={language}
        mode={mode}
        setMode={setMode}
        viewMode={viewMode}
        setViewMode={setViewMode}
        createForm={createForm}
        handleCreateChange={handleCreateChange}
        previewCreate={previewCreate}
        continueCreate={continueCreate}
        joinForm={joinForm}
        handleJoinChange={handleJoinChange}
        previewJoin={previewJoin}
        continueJoin={continueJoin}
        myCreatedGroups={myCreatedGroups}
        myExternalGroups={myExternalGroups}
        connections={connections}
        connectingProvider={connectingProvider}
        handleConnectProvider={handleConnectProvider}
        stage={stage}
        setStage={setStage}
        loadingFeeds={loadingFeeds}
        externalFeeds={externalFeeds}
        fetchExternalFeeds={fetchExternalFeeds}
        setCurrentUser={handleSetCurrentUser}
      />

      <Footer />
    </div>
  );
};

export default Home;

