import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { FaLightbulb, FaTags, FaUsers, FaMoneyBill, FaFileUpload } from "react-icons/fa";

interface IdeaSubmissionProps {
  onBack: () => void;
  user: any;
  apiBaseUrl: string;
}

const categories = [
  "Technology",
  "Healthcare",
  "Education",
  "Finance",
  "Environment",
  "Consumer",
  "Other"
];

const fieldStyle: React.CSSProperties = {
  marginTop: 4,
  width: "100%",
  padding: 8,
  borderRadius: 6,
  border: "1px solid #ccc",
  fontSize: "1rem",
  boxSizing: "border-box"
};

const IdeaSubmission: React.FC<IdeaSubmissionProps> = ({ onBack, user, apiBaseUrl }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [audience, setAudience] = useState("");
  const [budget, setBudget] = useState("");
  const [attachments, setAttachments] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title || !category || !problem || !solution || !audience || !budget) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("problem", problem);
      formData.append("solution", solution);
      formData.append("audience", audience);
      formData.append("budget", budget);
      formData.append("author", user.name);
      if (attachments && attachments[0]) {
        formData.append("attachment", attachments[0]);
      }

      const response = await fetch(`${apiBaseUrl}/api/ideas/submit`, {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + token
        },
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        // Clear fields if you want, or keep as is
        setTitle("");
        setCategory("");
        setProblem("");
        setSolution("");
        setAudience("");
        setBudget("");
        setAttachments(null);
      } else {
        setError(data.message || "Submission failed.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="idea-submission" style={{
        background: "rgba(255,255,255,0.15)",
        borderRadius: 16,
        padding: 36,
        maxWidth: 480,
        margin: "40px auto",
        color: "#222",
        boxShadow: "0 4px 24px rgba(25, 118, 210, 0.13)",
        textAlign: "center"
      }}>
        <h2 style={{color: "#FFD600", marginBottom: 16}}>🎉 Idea Submitted!</h2>
        <p style={{fontSize: "1.1rem", marginBottom: 24}}>
          Thank you, <strong>{user.name}</strong>, for sharing your idea with IdeLight!  
          Our team will review it and get back to you if needed.
        </p>
        <button
          className="login-btn"
          onClick={onBack}
          style={{padding: "12px 24px", fontSize: "1rem", cursor: "pointer"}}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="idea-submission" style={{
      background: "rgba(255,255,255,0.15)",
      borderRadius: 16,
      padding: 36,
      maxWidth: 480,
      margin: "40px auto",
      color: "#222",
      boxShadow: "0 4px 24px rgba(25, 118, 210, 0.13)"
    }}>
      <h2 style={{display: "flex", alignItems: "center", gap: 8, marginBottom: 24}}>
        <FaLightbulb color="#FFD600" style={{filter: "drop-shadow(0 0 4px #FFD600)"}} /> Submit Your Idea
      </h2>
      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: 16}}>
        <label>
          <FaLightbulb /> Idea Title *
          <input
            type="text"
            placeholder="Enter a catchy title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={loading}
            style={fieldStyle}
          />
        </label>
        <label>
          <FaTags /> Category *
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            disabled={loading}
            style={fieldStyle}
          >
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
        <label>
          Problem Statement *
          <textarea
            placeholder="What problem does your idea solve?"
            value={problem}
            onChange={e => setProblem(e.target.value)}
            disabled={loading}
            rows={3}
            style={fieldStyle}
          />
        </label>
        <label>
          Solution Overview *
          <textarea
            placeholder="Describe your solution"
            value={solution}
            onChange={e => setSolution(e.target.value)}
            disabled={loading}
            rows={3}
            style={fieldStyle}
          />
        </label>
        <label>
          <FaUsers /> Target Audience *
          <input
            type="text"
            placeholder="Who will benefit from this idea?"
            value={audience}
            onChange={e => setAudience(e.target.value)}
            disabled={loading}
            style={fieldStyle}
          />
        </label>
        <label>
          <FaMoneyBill /> Estimated Budget (₹) *
          <CurrencyInput
            id="budget-input"
            name="budget"
            placeholder="Enter amount in rupees"
            decimalsLimit={2}
            value={budget}
            onValueChange={(value) => setBudget(value || "")}
            prefix="₹"
            groupSeparator=","
            disabled={loading}
            style={fieldStyle}
          />
        </label>
        <label>
          <FaFileUpload /> Attach Pitch Deck or Image (optional)
          <input
            type="file"
            accept=".pdf,.ppt,.pptx,.jpg,.jpeg,.png"
            onChange={e => setAttachments(e.target.files)}
            disabled={loading}
            style={fieldStyle}
          />
        </label>
        {error && <div className="error" style={{marginTop: 4}}>{error}</div>}
        <button className="login-btn" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Idea"}
        </button>
        <button type="button" className="login-btn" style={{background: "#fff", color: "#1976d2"}} onClick={onBack} disabled={loading}>
          Back to Dashboard
        </button>
      </form>
    </div>
  );
};

export default IdeaSubmission;
