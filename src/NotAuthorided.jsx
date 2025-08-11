import React from 'react';
import { ExclamationIcon } from '@heroicons/react/outline';

const Unauthorized = ({ role }) => {
    if (role !== "DIRECTOR") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <ExclamationIcon className="w-16 h-16 text-red-500 mx-auto" />
                    <h2 className="text-2xl font-semibold text-gray-800 mt-4">Access Denied</h2>
                    <p className="text-gray-600 mt-2">You do not have the necessary permissions to view this page.</p>
                    <br />
                    (आपके पास इस पृष्ठ को देखने की आवश्यक अनुमतियाँ नहीं हैं।)
                </div>
            </div>
        );
    }

    return <div>{/* Content for authorized users */}</div>;
};

export default Unauthorized;
