import React from 'react';

const Joblist = ({ jobs }) => {
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div key={job.id} className="p-4 border rounded-lg shadow-sm">
          <h3 className="text-xl font-bold">{job.title}</h3>
          <p>{job.company} - {job.location}</p>
          <p>{job.salary}</p>
          <div className="flex items-center">
            <span className="text-sm text-gray-600">Match Score: </span>
            <div className="w-24 bg-gray-200 rounded-full h-2.5 ml-2">
              <div
                className={`h-2.5 rounded-full ${
                  job.matchScore >= 80 ? 'bg-green-500' :
                  job.matchScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${job.matchScore}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Joblist;