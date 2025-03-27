import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaSearch, FaPlus, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiVideo } from "react-icons/bi";

// Sample Resource Data
const initialResourcesData = [
  {
    id: "1",
    title: "React Fundamentals",
    description: "A comprehensive guide to learning React from scratch",
    videoCount: 12,
    lastUpdated: "2024-03-15T10:30:00Z"
  },
  {
    id: "2", 
    title: "Advanced JavaScript Techniques",
    description: "Deep dive into modern JavaScript programming concepts",
    videoCount: 8,
    lastUpdated: "2024-02-20T14:45:00Z"
  },
  {
    id: "3",
    title: "Node.js Backend Development",
    description: "Learn to build scalable backend applications with Node.js",
    videoCount: 15,
    lastUpdated: "2024-03-10T09:15:00Z"
  }
];

const ResourceCard = ({ resource }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <Link to={`/resources/${resource.id}`}>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gfgsc-green transition-colors">
            {resource.title}
          </h3>

          <p className="text-gray-600 mb-6 line-clamp-2 text-sm">
            {resource.description}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
            <div className="flex items-center">
              <BiVideo className="mr-2 text-gfgsc-green" />
              <span className="font-medium">{resource.videoCount}</span>
              <span className="ml-1">Videos</span>
            </div>
            <div className="flex items-center">
              {new Date(resource.lastUpdated).toLocaleDateString()}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const AllResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResource, setSearchResource] = useState("");
  const [debouncedSearchResource, setDebouncedSearchResource] = useState(searchResource);

  // Simulate data fetching
  useEffect(() => {
    const fetchResources = () => {
      // Simulate API delay
      setTimeout(() => {
        // Filter resources based on search
        const filteredResources = initialResourcesData.filter(resource => 
          resource.title.toLowerCase().includes(debouncedSearchResource.toLowerCase()) ||
          resource.description.toLowerCase().includes(debouncedSearchResource.toLowerCase())
        );

        setResources(filteredResources);
        setLoading(false);
      }, 500);
    };

    fetchResources();
  }, [debouncedSearchResource]);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchResource(searchResource);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchResource]);

  return (
    <div className="min-h-screen p-3 sm:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Search and Create Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 sm:mb-12 bg-white p-4 sm:p-6 rounded-2xl shadow-sm">
          <div className="relative w-full sm:max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchResource}
              onChange={(e) => setSearchResource(e.target.value)}
              className="w-full pl-12 pr-4 py-2 sm:py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gfgsc-green transition-all duration-200"
            />
          </div>
  
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-gfgsc-green to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 w-full sm:w-auto shadow-lg shadow-gfgsc-green/20"
          >
            <FaPlus className="text-sm" />
            <span>Create Resource</span>
          </motion.button>
        </div>
  
        {/* Resources Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-3xl sm:text-4xl text-gfgsc-green" />
          </div>
        ) : resources.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-64 text-center">
            <div className="text-gray-400 text-lg sm:text-xl mb-2">No resources found</div>
            <div className="text-gray-500 text-sm sm:text-base">Try adjusting your search or create a new resource</div>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              layout
            >
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default AllResources;