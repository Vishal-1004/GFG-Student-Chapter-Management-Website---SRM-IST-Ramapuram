import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Importing Icons
import { FaSpinner } from "react-icons/fa";

import { ProfileHero, ProfileSecondary } from "../../Components";
import { ToastMsg } from "../../Utilities";

// Importing APIs
import { UserServices } from "../../Services";

const Profile = () => {
  const { id } = useParams(); // 67bf1dae9abafaae75f73b7d

  const { getProfilePageDataFunction } = UserServices();

  const [loading, setLoading] = useState(true);

  const [userProfileData, setUserProfileData] = useState({
    name: "",
    email: "",
    role: "User",
    academic_year: "Unknown",
    profilePic: null,
    bio: "",

    social: [],

    stats: {
      questions: 0,
      individualRank: null,
      previousRank: null,
    },

    profiles: {
      leetcode: {
        badgesCount: 0,
        ranking: 0,
        totalProblemSolved: 0,
      },
      codechef: {
        rating: 0,
        highestRating: 0,
        countryRank: 0,
      },
      codeforces: {
        rating: 0,
        rank: "Unrated",
        totalProblemSolved: 0,
      },
      geeksforgeeks: {
        solvedProblems: 0,
        codingScore: 0,
        rank: 0,
      },
    },

    badges: [],

    avgPerDay: 0,
    maxStreak: 0,
    dailyActivity: [],
  });

  //* **************** Fetch Profile Data *****************//
  const fetchProfileData = async (profileId) => {
    try {
      setLoading(true);
      //console.log("Fetching profile data for:", profileId);
      const response = await getProfilePageDataFunction({ userId: profileId });
      //console.log(response);

      if (response.status !== 200) {
        ToastMsg("Error fetching profile data! Please try later", "error");
      } else {
        const data = response.data;

        setUserProfileData({
          name: data.name || "",
          email: data.email || "",
          role: data.role
            ? data.role.charAt(0).toUpperCase() +
              data.role.slice(1).toLowerCase()
            : "User",
          academic_year: data.academicYear || "Unknown",
          profilePic: data.profilePicture || null,
          bio: data.bio || "",

          social: [
            {
              platform: "codolio",
              url: `https://codolio.com/profile/${data.codolioUsername}`,
            },
            {
              platform: "linkedin",
              url: `https://linkedin.com/in/${data.linkedinUsername}`,
            },
          ].filter((link) => link.url),

          stats: {
            questions: data.totalQuestionSolved || 0,
            individualRank: data.currentRank || null,
            previousRank: data.prevMonthData?.prevRank || null,
          },

          profiles: {
            leetcode: {
              handle: data.leetcodeUsername || null,
              badgesCount: data.platforms.leetcode.badgesCount || 0,
              ranking: data.platforms.leetcode.ranking || 0,
              totalProblemSolved:
                data.platforms.leetcode.totalProblemSolved || 0,
            },
            codechef: {
              handle: data.codechefUsername || null,
              rating: data.platforms.codechef.rating || 0,
              highestRating: data.platforms.codechef.highestRating || 0,
              countryRank: data.platforms.codechef.countryRank || 0,
            },
            codeforces: {
              handle: data.codeforcesUsername || null,
              rating: data.platforms.codeforces.rating || 0,
              rank: data.platforms.codeforces.rank || "Unrated",
              totalProblemSolved:
                data.platforms.codeforces.totalProblemSolved || 0,
            },
            geeksforgeeks: {
              handle: data.geeksforgeeksUsername || null,
              universityRank: data.platforms.geeksforgeeks.universityRank || 0,
              codingScore: data.platforms.geeksforgeeks.codingScore || 0,
              problemsSolved: data.platforms.geeksforgeeks.problemSolved || 0,
            },
          },

          badges: [
            ...data.achievement.gold.map((badge) => ({
              id: Math.random(),
              name: "Gold Medal",
              type: "gold",
              date: `${badge.year}-${badge.month
                .toString()
                .padStart(2, "0")}-01`,
              description:
                "Awarded for outstanding performance in coding contests.",
            })),
            ...data.achievement.silver.map((badge) => ({
              id: Math.random(),
              name: "Silver Medal",
              type: "silver",
              date: `${badge.year}-${badge.month
                .toString()
                .padStart(2, "0")}-01`,
              description:
                "Awarded for excellent performance in coding contests.",
            })),
            ...data.achievement.bronze.map((badge) => ({
              id: Math.random(),
              name: "Bronze Medal",
              type: "bronze",
              date: `${badge.year}-${badge.month
                .toString()
                .padStart(2, "0")}-01`,
              description: "Awarded for good performance in coding contests.",
            })),
          ],

          avgPerDay: data.avgPerDay || 0,
          maxStreak: data.maxStreak || 0,
          dailyActivity: data.dailyActivity || [],
        });

        //console.log("Profile Data:", userProfileData);
      }
    } catch (error) {
      ToastMsg("Error fetching profile data! Please try later", "error");
      console.error("Error fetching profile data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProfileData(id);
      //console.log("Profile ID:", id);
    } else {
      fetchProfileData();
    }
  }, [id]);

  //* *****************************************************//

  return (
    <div className="min-h-screen">
      {loading ? (
        <div className="p-6 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <FaSpinner className="animate-spin text-4xl text-gfgsc-green" />
            <p className="text-gray-600">Loading resource...</p>
          </div>
        </div>
      ) : (
        <>
          <ProfileHero userProfile={userProfileData} />
          <ProfileSecondary
            userProfile={userProfileData}
          />
        </>
      )}
      
    </div>
  );
};

export default Profile;
