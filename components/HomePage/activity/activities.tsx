import React, { useEffect, useState } from "react";
import api from "@/lib/api";

type Activity = {
  id: string;
  type: string;
  icon: string | null;
  title: string | null;
  content: string | null;
  link: string;
  image: string | null;
  uploaded_at: string;
};

const ProgramsPage: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch activities from API
  const fetchActivities = async () => {
    try {
      const response = await api.get("/activities.php?activity=2");
      setActivities(response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-700">
        Activities
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="relative bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex flex-col"
          >
            {/* If image exists, show only image and title */}
            {activity.image ? (
              <>
                <img
                  src={"https://alhudaic.ca/api/" + activity.image}
                  alt={activity.title || "Activity Image"}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {activity.title || "No Title"}
                  </h3>
                </div>
              </>
            ) : (
              // If no image, show only title and content
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {activity.title || "No Title"}
                </h3>
                <p className="text-gray-600">
                  {activity.content || "No description available."}
                </p>
              </div>
            )}

            {/* Register Button */}
            {/* <div className="p-6">
              <a
                href={activity.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-gold-600"
              >
                Register
              </a>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramsPage;
