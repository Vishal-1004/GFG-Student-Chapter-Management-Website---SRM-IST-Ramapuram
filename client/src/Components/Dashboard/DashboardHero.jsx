import { useState } from "react";
import { motion } from "framer-motion";
import {
  MdTrendingUp,
  MdEmojiEvents,
  MdGroups,
  MdNotifications,
  MdCalendarToday,
  MdNotificationsOff,
} from "react-icons/md";
import {
  SiLeetcode,
  SiCodechef,
  SiCodeforces,
  SiGeeksforgeeks,
} from "react-icons/si";
import CustomCalendar from "../Calendar/CustomCalendar";
import NotificationItem from "../ui/NotificationItem";
import { ConfirmationPopup, ToastMsg } from "../../Utilities";

// Mock data for API
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
    description: "Team Sync for upcoming contest",
    name: "Team Sync",
    time: "2025-02-22T15:00:00",
    attendees: "CORE",
    link: "https://meet.google.com/xyz",
  },
  {
    type: "meeting",
    description: "DSA Discussion for upcoming contest",
    name: "DSA Discussion",
    time: "2025-02-22T17:00:00",
    attendees: "ALL",
    link: "https://meet.google.com/abc",
  },
  {
    type: "contest",
    platform: "leetcode",
    name: "Weekly Contest 123",
    time: "2025-02-22T17:00:00",
    link: "https://leetcode.com/contest/123",
  },
];

const notifications = [
  "Team 'CodeCrusaders' achieved 2nd place in last contest",
  "New resource shared: Advanced DP Techniques",
  "Upcoming Contest: LeetCode Weekly on Sunday",
];

const platformProgress = [
  {
    platform: "leetcode",
    problems: "156",
    rank: "1,234",
    progress: 75,
  },
  {
    platform: "codechef",
    problems: "89",
    rank: "2,567",
    progress: 60,
  },
  {
    platform: "codeforces",
    problems: "79",
    rank: "3,123",
    progress: 45,
  },
  {
    platform: "gfg",
    problems: "102",
    rank: "892",
    progress: 80,
  },
];

const stats = [
  {
    icon: MdTrendingUp,
    label: "Points",
    value: "324",
    change: 12,
  },
  {
    icon: MdEmojiEvents,
    label: "Current Rank",
    value: "#42",
    change: 5,
  },
  {
    icon: MdGroups,
    label: "Team Position",
    value: "#3",
    change: 2,
  },
];

const StatCard = ({ icon: Icon, label, value, change }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
  >
    <div className="flex items-center justify-between mb-3">
      <div className="p-2.5 rounded-xl bg-gfgsc-green-200/50">
        <Icon className="text-xl text-gfgsc-green" />
      </div>
      {change && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-1 text-sm font-medium ${
            change > 0 ? "text-gfgsc-green" : "text-red-500"
          }`}
        >
          {change > 0 ? "↑" : "↓"} {Math.abs(change)}%
        </motion.div>
      )}
    </div>
    <h4 className="text-3xl font-bold text-gfg-black mb-1">{value}</h4>
    <p className="text-sm text-gray-600">{label}</p>
  </motion.div>
);

const PlatformCard = ({ platform, problems, rank, progress }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
  >
    <div className="flex items-center gap-4">
      <div className="text-2xl">
        {platform === "leetcode" && <SiLeetcode className="text-[#FFA116]" />}
        {platform === "codechef" && <SiCodechef className="text-[#5B4638]" />}
        {platform === "codeforces" && (
          <SiCodeforces className="text-[#1F8ACB]" />
        )}
        {platform === "gfg" && <SiGeeksforgeeks className="text-gfgsc-green" />}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-gfg-black">{problems} points</span>
          <span className="text-sm bg-gfgsc-green-200/50 text-gfgsc-green px-2 py-0.5 rounded-full">
            Rank #{rank}
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="bg-gradient-to-r from-gfgsc-green to-gfgsc-green-400 h-2 rounded-full"
          />
        </div>
      </div>
    </div>
  </motion.div>
);

const DashboardHero = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleToggleNotifications = () => {
    setShowConfirmation(true);
  };

  const confirmToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
    ToastMsg(
      `Notifications ${!notificationsEnabled ? "enabled" : "disabled"}!`,
      !notificationsEnabled ? "success" : "info"
    );
  };

  return (
    <div className="min-h-screen pb-8 ">
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

      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gfg-black mb-2">
            Hey Surya! 👋
          </h1>
          <p className="text-gray-600">
            Ready to conquer some coding challenges today?
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggleNotifications}
          className={`
            relative p-3 rounded-xl shadow-sm transition-colors duration-300
            ${notificationsEnabled ? "bg-white" : "bg-gray-100"}
          `}
        >
          {notificationsEnabled ? (
            <MdNotifications className="text-xl text-gfgsc-green" />
          ) : (
            <MdNotificationsOff className="text-xl text-gray-400" />
          )}
          {notificationsEnabled && notifications.length > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </motion.button>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                change={stat.change}
              />
            ))}
          </div>

          {/* Calendar */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <CustomCalendar events={events} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Platform Progress */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gfg-black">
                Platform Progress
              </h3>
              <MdCalendarToday className="text-gfgsc-green" />
            </div>
            <div className="space-y-4">
              {platformProgress.map((platform, index) => (
                <PlatformCard
                  key={index}
                  platform={platform.platform}
                  problems={platform.problems}
                  rank={platform.rank}
                  progress={platform.progress}
                />
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="font-semibold text-gfg-black mb-4">
              Recent Updates
            </h3>
            <div className="space-y-2">
              {notifications.map((notification, index) => (
                <NotificationItem key={index} message={notification} />
              ))}
            </div>
          </div>

          {/* Annoucements */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="font-semibold text-gfg-black mb-4">Annoucements</h3>
            <div className="space-y-2">
              {notifications.map((notification, index) => (
                <NotificationItem key={index} message={notification} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;
