import React from "react";

interface DashboardProps {
  user: any;
  onLogout: () => void;
  onSubmitIdea: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onSubmitIdea }) => (
  <div className="dashboard">
    <h2>Welcome, {user.name}!</h2>
    <p>Role: {user.role}</p>
    <button className="login-btn" onClick={onSubmitIdea}>Submit an Idea</button>
    <button className="login-btn" style={{marginLeft: 8}} onClick={onLogout}>Logout</button>
  </div>
);

export default Dashboard;
