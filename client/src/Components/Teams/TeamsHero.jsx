import { motion } from "framer-motion";
import {
  IoCodeWorking,
  IoPeople,
  IoPersonCircle,
  IoTrophy,
} from "react-icons/io5";

const TeamHero = ({ myTeam }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-emerald-600 to-gfgsc-green
                    rounded-2xl p-6 shadow-2xl mb-10"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">
            {myTeam.name}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <IoTrophy className="text-gfg-white text-2xl" />
              <span className="font-semibold text-gfg-white">
                Rank: {myTeam.rank}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <IoCodeWorking className="text-gfg-white text-2xl" />
              <span className="font-semibold text-gfg-white">
                Total Questions: {myTeam.totalQuestionsSolved}
              </span>
            </div>
          </div>
        </div>
        <IoPeople className="text-6xl text-gfg-green opacity-30" />
      </div>

      <div className="grid grid-cols-5 gap-4">
        {myTeam.members.map((member, index) => (
          <motion.div
            key={member.name}
            whileHover={{ scale: 1.05 }}
            className="bg-gfg-white rounded-xl p-4 shadow-md 
                          border-2 border-transparent hover:border-gfgsc-green 
                          transition-all duration-300"
          >
            <div className="flex items-center space-x-3 mb-2">
              <IoPersonCircle className="text-4xl text-gfgsc-green" />
              <div>
                <h3 className="font-bold text-gfg-black">{member.name}</h3>
                <p className="text-sm text-gray-500">Rank: {member.rank}</p>
                <p className="text-sm  text-gfg-black">
                  {member.solved} Problems
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TeamHero;
