import { FaClock } from 'react-icons/fa';

const RecentActivity = ({ activities }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
      {activities.length > 0 ? (
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <li key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-teal-800 text-white rounded-full">
                  {activity.icon ? activity.icon : <FaClock />}
                </div>
                <div>
                  <p className="font-medium text-gray-700">{activity.description}</p>
                  <p className="text-sm text-gray-500">{activity.timestamp}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">No recent activity found.</p>
      )}
    </div>
  );
};

export default RecentActivity;
