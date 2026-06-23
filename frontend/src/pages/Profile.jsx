import { useState, useEffect } from "react";
import {
  getAllUsers,
  getUserById,
  updateProfile,
  changePassword,
  updateNotificationPreferences,
} from "../services/userService";

function Profile() {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileMessage, setProfileMessage] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // NOTIFICATION PREFERENCES STATE
  const [preferences, setPreferences] = useState({
    onAssignment: true,
    onComment: true,
    onDueDate: true,
    onCardMove: false,
  });
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      loadProfile(selectedUserId);
    }
  }, [selectedUserId]);

  const fetchUsers = async () => {
    try {
      const users = await getAllUsers();
      setAllUsers(users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const loadProfile = async (id) => {
    try {
      const user = await getUserById(id);
      setName(user.name);
      setEmail(user.email);
      setPreferences(
        user.notificationPreferences || {
          onAssignment: true,
          onComment: true,
          onDueDate: true,
          onCardMove: false,
        }
      );
      setProfileMessage("");
      setPasswordMessage("");
      setNotificationMessage("");
    } catch (error) {
      console.error("Failed to load profile:", error);
    }
  };

  const handleSaveProfile = async () => {
    setProfileMessage("");
    if (!name.trim() || !email.trim()) return;
    try {
      await updateProfile(selectedUserId, name, email);
      setProfileMessage("✅ Profile updated successfully");
      fetchUsers();
    } catch (error) {
      setProfileMessage("❌ " + (error.response?.data?.message || "Failed to update profile"));
    }
  };

  const handleChangePassword = async () => {
    setPasswordMessage("");
    if (!currentPassword || !newPassword) return;
    try {
      await changePassword(selectedUserId, currentPassword, newPassword);
      setPasswordMessage("✅ Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      setPasswordMessage("❌ " + (error.response?.data?.message || "Failed to change password"));
    }
  };

  const handleToggle = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSavePreferences = async () => {
    setNotificationMessage("");
    try {
      await updateNotificationPreferences(selectedUserId, preferences);
      setNotificationMessage("✅ Notification preferences saved");
    } catch (error) {
      setNotificationMessage("❌ " + (error.response?.data?.message || "Failed to save preferences"));
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "450px" }}>
      <h1>Profile</h1>

      <label style={{ fontWeight: "bold", fontSize: "13px" }}>Select your account</label>
      <select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
        style={{ width: "100%", marginBottom: "20px", marginTop: "4px", padding: "6px" }}
      >
        <option value="">-- Choose account --</option>
        {allUsers.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name} ({user.email})
          </option>
        ))}
      </select>

      {selectedUserId && (
        <>
          {/* PROFILE INFO SECTION */}
          <div style={{ background: "#f9f9f9", border: "1px solid #ddd", borderRadius: "8px", padding: "16px", marginBottom: "20px" }}>
            <h3 style={{ marginTop: 0 }}>Profile Information</h3>
            <label style={{ fontSize: "13px", fontWeight: "bold" }}>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", marginBottom: "10px", marginTop: "4px", padding: "6px" }}
            />
            <label style={{ fontSize: "13px", fontWeight: "bold" }}>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", marginBottom: "10px", marginTop: "4px", padding: "6px" }}
            />
            <button onClick={handleSaveProfile}>Save Profile</button>
            {profileMessage && <p style={{ fontSize: "13px", marginTop: "8px" }}>{profileMessage}</p>}
          </div>

          {/* CHANGE PASSWORD SECTION */}
          <div style={{ background: "#f9f9f9", border: "1px solid #ddd", borderRadius: "8px", padding: "16px", marginBottom: "20px" }}>
            <h3 style={{ marginTop: 0 }}>Change Password</h3>
            <label style={{ fontSize: "13px", fontWeight: "bold" }}>Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={{ width: "100%", marginBottom: "10px", marginTop: "4px", padding: "6px" }}
            />
            <label style={{ fontSize: "13px", fontWeight: "bold" }}>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ width: "100%", marginBottom: "10px", marginTop: "4px", padding: "6px" }}
            />
            <button onClick={handleChangePassword}>Change Password</button>
            {passwordMessage && <p style={{ fontSize: "13px", marginTop: "8px" }}>{passwordMessage}</p>}
          </div>

          {/* NOTIFICATION PREFERENCES SECTION */}
          <div style={{ background: "#f9f9f9", border: "1px solid #ddd", borderRadius: "8px", padding: "16px" }}>
            <h3 style={{ marginTop: 0 }}>Notification Preferences</h3>

            <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", fontSize: "14px" }}>
              <input
                type="checkbox"
                checked={preferences.onAssignment}
                onChange={() => handleToggle("onAssignment")}
              />
              Notify me when I'm assigned to a card
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", fontSize: "14px" }}>
              <input
                type="checkbox"
                checked={preferences.onComment}
                onChange={() => handleToggle("onComment")}
              />
              Notify me when someone comments on my card
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", fontSize: "14px" }}>
              <input
                type="checkbox"
                checked={preferences.onDueDate}
                onChange={() => handleToggle("onDueDate")}
              />
              Notify me when a due date is approaching
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", fontSize: "14px" }}>
              <input
                type="checkbox"
                checked={preferences.onCardMove}
                onChange={() => handleToggle("onCardMove")}
              />
              Notify me when a card I'm on is moved
            </label>

            <button onClick={handleSavePreferences}>Save Preferences</button>
            {notificationMessage && <p style={{ fontSize: "13px", marginTop: "8px" }}>{notificationMessage}</p>}
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;