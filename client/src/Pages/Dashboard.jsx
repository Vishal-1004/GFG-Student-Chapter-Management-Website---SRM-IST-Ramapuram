import { useEffect, useState } from "react";

// Icons
import { MdEmojiEvents, MdTrendingUp } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";

// Components & Utilities
import {
  CustomCalendar,
  DashboardHeader,
  LeaderboardSection,
  NotificationsSection,
  StatsSection,
} from "../Components";
import { ConfirmationPopup, ToastMsg } from "../Utilities";

import { UserServices } from "../Services";

const Dashboard = () => {
  const {
    toggleSubscribeFunction,
    getProfilePageDataFunction,
    fetchTop5UsersFunction,
  } = UserServices();

  const [stats, setStats] = useState([
    { icon: MdTrendingUp, label: "Points", value: "0", change: 0 },
    { icon: MdEmojiEvents, label: "Current Rank", value: "#0", change: 0 },
    { icon: IoStatsChart, label: "Previous Rank", value: "#0", change: 0 },
  ]);
  const [firstName, setFirstName] = useState(null);

  const [top5Users, setTop5Users] = useState([]);

  const [notificationsEnabled, setNotificationsEnabled] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // ================ DUMMY DATA ================

  const notifications = [
    "Team 'CodeCrusaders' achieved 2nd place in last contest",
    "New resource shared: Advanced DP Techniques",
    "Upcoming Contest: LeetCode Weekly on Sunday",
  ];

  const events = [
    {
      type: "contest",
      platform: "leetcode",
      name: "Weekly Contest 123",
      time: "2025-02-06T14:30:00",
      link: "https://leetcode.com/contest/123",
    },
    {
      type: "meeting",
      platform: "leetcode",
      name: "Weekly Contest 123",
      time: "2025-02-06T14:30:00",
      link: "https://leetcode.com/contest/123",
    },
  ];

  // ================ Dashboard Handlers ================

  // Get basic user data on page load
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getProfilePageDataFunction();
        if (response.status === 200) {
          const userData = response.data;

          // Extract first name correctly
          const extractFirstName = (fullName) => {
            const nameParts = fullName.replace(/\./g, "").split(" "); // Remove dots and split
            for (let part of nameParts) {
              if (part.length > 1) return part; // Return first element with more than 1 character
            }
            return "User"; // Default fallback
          };

          setFirstName(extractFirstName(userData.name));

          // Update notifications status
          setNotificationsEnabled(!userData.subscribed);

          // Update stats
          setStats([
            {
              icon: MdTrendingUp,
              label: "Points",
              value: userData.totalQuestionSolved || "0",
              change: 0,
            },
            {
              icon: MdEmojiEvents,
              label: "Current Rank",
              value: `#${userData.currentRank || "0"}`,
              change: 0,
            },
            {
              icon: IoStatsChart,
              label: "Previous Rank",
              value: `#${userData.prevMonthData.prevRank || "0"}`,
              change: 0,
            },
          ]);
        } else {
          setFirstName("User");
          ToastMsg(response.response.data.message, "error");
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
        ToastMsg("Failed to load user data", "error");
      }
    };

    const fetchTop5Users = async () => {
      try {
        const response = await fetchTop5UsersFunction();
        if (response.status === 200) {
          setTop5Users(response.data.data);
        } else {
          ToastMsg(response.response.data.message, "error");
        }
      } catch (error) {
        console.log("Error fetching top 5 users:", error);
        ToastMsg("Failed to load top 5 users", "error");
      }
    };

    fetchUserData();
    fetchTop5Users();
  }, []);

  // Notifications toggle handler
  const handleToggleNotifications = () => {
    setShowConfirmation(true);
  };
  // Notifications toggle confirmation handler with API call
  const confirmToggle = async () => {
    try {
      const response = await toggleSubscribeFunction();
      //console.log(response);
      if (response.status == 200) {
        setNotificationsEnabled(!notificationsEnabled);
        ToastMsg(response.data.message, "success");
      } else {
        console.log("Error: ", response.response.data.message);
        ToastMsg(response.response.data.message, "error");
      }
    } catch (error) {
      console.log("Internal server error: ", error);
      ToastMsg("Internal server error! Please try later", "error");
    }
  };
  //================ Dashboard Handlers END ================

  return (
    <div className="min-h-screen pb-8">
      <ConfirmationPopup
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={confirmToggle}
        type={notificationsEnabled ? "info" : "success"}
        title={
          notificationsEnabled
            ? "Disable Notifications?"
            : "Enable Notifications?"
        }
        message={
          notificationsEnabled
            ? "You won't receive any notifications about updates and events. Are you sure?"
            : "You'll start receiving notifications about updates and events. Continue?"
        }
        confirmText={notificationsEnabled ? "Disable" : "Enable"}
      />

      <DashboardHeader
        name={firstName}
        notificationsEnabled={notificationsEnabled}
        onToggleNotifications={handleToggleNotifications}
      />

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-6">
          <StatsSection stats={stats} />
          <CustomCalendar events={events} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <LeaderboardSection top5Users={top5Users} />
          <NotificationsSection
            title="Recent Updates"
            notifications={notifications}
          />
          <NotificationsSection
            title="Announcements"
            notifications={notifications}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
