import React from "react";
import { Dialog } from "@headlessui/react";
import { XIcon } from "lucide-react";

const UserProfileModal = ({ isOpen, onClose, user, onUpdateStatus }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className=" mt-10 mb-3 z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50 " aria-hidden="true"></div>
      <div className="fixed inset-0 flex items-center justify-center rounded border-0 overflow-auto">
        <Dialog.Panel className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              User Profile
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-200"
            >
              <XIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="text-lg font-semibold text-gray-800">
                {user.userDetails.name}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-lg font-semibold text-gray-800">{user.userDetails.email}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Career Goals</p>
              <p className="text-lg font-medium text-gray-500">{(user.profile.career_goals).toString()}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Course Of Study</p>
              <p className="text-lg font-medium text-gray-500">{user.profile.course_of_study}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Interests</p>
              <p className="text-lg font-medium text-gray-500">{(user.profile.interests).toString()}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Skills</p>
              <p className="text-lg font-medium text-gray-500">{(user.profile.skills).toString()}</p>
            </div>
            {'\n'}
            <div className="space-y-2">
              <p className="text-xl font-bold text-gray-800">Additional Information</p>
              <p className="text-lg font-medium text-gray-500">{user.additional_infomation ? user.additional_infomation : 'No additional information included'}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Application Status</p>
              <p className="text-[15px] font-medium text-gray-800">
                {user.status}
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <p className="text-sm font-medium text-gray-500">Update Status</p>
            <div className="flex gap-2">
              <button
                onClick={() => onUpdateStatus("Declined")}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Decline
              </button>
              <button
                onClick={() => onUpdateStatus("Scheduled for Interview")}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Schedule for Interview
              </button>
              <button
                onClick={() => onUpdateStatus("Interviewed")}
                className="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600"
              >
                Mark as Interviewed
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UserProfileModal;
