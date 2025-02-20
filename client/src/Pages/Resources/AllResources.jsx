import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Importing Icons
import { FaSearch, FaPlus, FaSpinner } from "react-icons/fa";

import { Pagination, ToastMsg } from "../../Utilities";
import { CreateResourceModal, ResourceCard } from "../../Components";

// Importing APIs
import { CoreMemberServices } from "../../Services";

const AllResources = () => {
  const { createResourceFunction, fetchAllResourcesFunction } =
    CoreMemberServices();

  const [loading, setLoading] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);

  // ****************** Fetch all Resources Handlers Starts here *****************
  // Search Logic
  const [searchResource, setSearchResource] = useState("");
  const [debouncedSearchResource, setDebouncedSearchResource] =
    useState(searchResource);

  // Debounce mechanism for serach input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchResource(searchResource);
    }, 1000); // 1s debounce time

    return () => {
      clearTimeout(handler);
    };
  }, [searchResource]);

  // Pagination Logic
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPages: null,
  });

  const setCurrentPage = (page) => {
    setPageInfo((prev) => ({ ...prev, currentPage: page }));
  };

  const [resources, setResources] = useState([]);

  // Fetch all resources
  const fetchAllResourcesHandler = async () => {
    setLoading(true);
    try {
      const response = await fetchAllResourcesFunction({
        page: pageInfo.currentPage,
        search: debouncedSearchResource,
      });

      if (response.status === 200) {
        const formattedResources = response.data.data.map((resource) => ({
          id: resource.id, // Unique ID
          title: resource.title,
          platforms: resource.platforms || [],
          count: resource.totalQuestions,
          lastUpdated: resource.lastUpdatedAt.split("T")[0], // Extract date part
          description: resource.description,
        }));

        setResources(formattedResources);
      } else {
        ToastMsg(response.response.data.message, "error");
        console.log(response.response.data.message);
      }
    } catch (error) {
      ToastMsg("Internal Server Error!", "error");
      console.error("Fetch All Resources Error: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchResources = async () => {
      await fetchAllResourcesHandler();
    };

    fetchResources();
  }, [pageInfo.currentPage, debouncedSearchResource]);

  // ******************** Fetch all Resources Handler end's here ****************

  // Resources Creating Handlers
  const handleCreateResource = async (data) => {
    //console.log("Creating resource:", data);
    try {
      const response = await createResourceFunction(data);
      if (response.status == 200) {
        ToastMsg(response.data.message, "success");
      } else {
        ToastMsg(response.response.data.message, "error");
        console.log(response);
      }
    } catch (error) {
      ToastMsg("Internal Server Error", "error");
      console.log("Internal server error: ", error);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto">
        {/* Search and Create Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12 bg-white p-6 rounded-2xl shadow-sm">
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchResource}
              onChange={(e) => setSearchResource(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gfgsc-green transition-all duration-200"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gfgsc-green to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 w-full md:w-auto justify-center shadow-lg shadow-gfgsc-green/20"
          >
            <FaPlus className="text-sm" />
            <span>Create Resource</span>
          </motion.button>
        </div>

        {/* Resources Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-4xl text-gfgsc-green" />
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              layout
            >
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Create Resource Modal */}
      <CreateResourceModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateResource}
      />
    </div>
  );
};

export default AllResources;
