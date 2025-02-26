import { useState } from "react";

// Importing Icons
import { FaSpinner } from "react-icons/fa";

const AddProblemModal = ({ isOpen, onClose, onAdd }) => {
  const [loading, setLoading] = useState(false);

  const platforms = ["LeetCode", "CodeChef", "Codeforces", "GeeksforGeeks"];
  const [newProblem, setNewProblem] = useState({
    title: "",
    difficulty: "EASY",
    platform: platforms[0],
    link: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await onAdd(newProblem);
    } catch (error) {
      console.log("Error in creating resource: ", error);
    } finally {
      setLoading(false);
      setNewProblem({
        title: "",
        difficulty: "EASY",
        platform: platforms[0],
        link: "",
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Problem</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                required
                className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                value={newProblem.title}
                onChange={(e) =>
                  setNewProblem({ ...newProblem, title: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Difficulty
              </label>
              <select
                className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                value={newProblem.difficulty}
                onChange={(e) =>
                  setNewProblem({ ...newProblem, difficulty: e.target.value })
                }
              >
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Platform
              </label>
              <select
                className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                value={newProblem.platform}
                onChange={(e) =>
                  setNewProblem({ ...newProblem, platform: e.target.value })
                }
              >
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Link
              </label>
              <input
                type="url"
                required
                className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                value={newProblem.link}
                onChange={(e) =>
                  setNewProblem({ ...newProblem, link: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-gfgsc-green text-white rounded-lg hover:bg-opacity-90"
            >
              {loading ? (
                <FaSpinner className="animate-spin inline-block" />
              ) : null}{" "}
              Add Problem
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProblemModal;
