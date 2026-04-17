import React from 'react';

const EmergencyRequests = () => {
  // আপাততো ডামি ডেটা, পরে ডেটাবেস থেকে আসবে
  const requests = [
    { id: 1, blood: "B-", location: "Dhaka Medical", bag: 2, contact: "017xxx" },
    { id: 2, blood: "O+", location: "Chittagong Hospital", bag: 1, contact: "018xxx" }
  ];

  return (
    <section className="my-10 px-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <span className="w-3 h-3 bg-red-600 rounded-full animate-ping"></span>
        <h2 className="text-2xl font-bold text-gray-800">Emergency Requests</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((req) => (
          <div key={req.id} className="bg-white border-2 border-red-100 p-5 rounded-2xl shadow-sm hover:border-red-500 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-4xl font-black text-red-600">{req.blood}</h3>
                <p className="text-gray-500 font-medium mt-1">{req.location}</p>
              </div>
              <div className="bg-red-50 text-red-700 px-3 py-1 rounded-lg text-sm font-bold">
                {req.bag} Bag Needed
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <button className="flex-1 bg-red-600 text-white py-2 rounded-xl font-bold hover:bg-red-700">Donate Now</button>
              <button className="px-4 py-2 border-2 border-gray-200 rounded-xl hover:bg-gray-50">Details</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EmergencyRequests;