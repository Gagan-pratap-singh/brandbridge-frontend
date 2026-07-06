import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

import ProtectedRoute from "./routes/ProtectedRoute";

/* Brand Layout */
import DashboardLayout from "./layouts/DashboardLayout";

/* Brand Pages */
import Dashboard from "./pages/brand/Dashboard";
import Campaigns from "./pages/brand/Campaigns";
import Applications from "./pages/brand/Applications";
import Messages from "./pages/brand/Messages";
import Notifications from "./pages/brand/Notifications";
import Profile from "./pages/brand/Profile";
import Analytics from "./pages/brand/Analytics";
import Settings from "./pages/brand/Settings";
import DiscoverInfluencers from "./pages/brand/DiscoverInfluencers";
import Invitations from "./pages/brand/Invitations";

/* Influencer Layout */
import InfluencerLayout from "./layouts/InfluencerLayout";

/* Influencer Pages */
import InfluencerDashboard from "./pages/influencer/Dashboard";
import Discover from "./pages/influencer/Discover";
import InfluencerApplications from "./pages/influencer/Applications";
import InfluencerMessages from "./pages/influencer/Messages";
import InfluencerNotifications from "./pages/influencer/Notifications";
import Bookmarks from "./pages/influencer/Bookmarks";
import InfluencerProfile from "./pages/influencer/Profile";
import InfluencerSettings from "./pages/influencer/Settings";
import InfluencerInvitations from "./pages/influencer/Invitations";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

{/* Brand Dashboard */}
<Route
  path="/dashboard"
  element={
    <ProtectedRoute role="brand">
      <DashboardLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<Dashboard />} />

  <Route path="campaigns" element={<Campaigns />} />

  <Route path="applications" element={<Applications />} />

  {/* Messages */}
  <Route path="messages">
    <Route index element={<Messages />} />
    <Route path=":userId" element={<Messages />} />
  </Route>

  <Route
    path="notifications"
    element={<Notifications />}
  />

  <Route path="profile" element={<Profile />} />

  <Route path="analytics" element={<Analytics />} />

  <Route path="settings" element={<Settings />} />

  <Route
    path="influencers"
    element={<DiscoverInfluencers />}
  />
  <Route
  path="invitations"
  element={<Invitations />}
  />
</Route>

      {/* Influencer Dashboard */}
      <Route
        path="/influencer"
        element={
          <ProtectedRoute role="influencer">
          <InfluencerLayout />
          </ProtectedRoute>
        }>
        <Route index element={<InfluencerDashboard />} />
        <Route path="discover" element={<Discover />} />
        <Route
          path="applications"
          element={<InfluencerApplications />}
        />
        <Route path="messages">
        <Route index element={<InfluencerMessages />} />
        <Route path=":userId" element={<InfluencerMessages />} />
        </Route>
        <Route
          path="notifications"
          element={<InfluencerNotifications />}
        />
        <Route path="bookmarks" element={<Bookmarks />} />
        <Route
          path="profile"
          element={<InfluencerProfile />}
        />
        <Route
          path="settings"
          element={<InfluencerSettings />}
        />
        <Route
          path="invitations"
          element={<InfluencerInvitations />}
        />
      </Route>
    </Routes>
  );
}

export default App;