import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getStoredJobApplication } from "../../utility/localstorage";

const AppliedJobs = () => {
  const jobs = useLoaderData();

  const [appiledJobs, setAppliedJobs] = useState([]);
  const [displayJobs, setDisplayJobs] = useState([]);

  const handleJobsFilter = filter => {
    if(filter === 'all'){
      setDisplayJobs(appiledJobs);
    }
    else if (filter === 'remote'){
      const remoteJobs = appiledJobs.filter(job => job.remote_or_onsite === 'Remote');
      setDisplayJobs(remoteJobs);
    }
    else if (filter === 'onsite'){
      const onsiteJobs = appiledJobs.filter(job => job.remote_or_onsite === 'Onsite');
      setDisplayJobs(onsiteJobs);
    }
  }

  useEffect(() => {
    const storedJobIds = getStoredJobApplication();
    if (jobs.length > 0) {
      // const jobsApplied = jobs.filter(job => storedJobIds.includes(job.id))
      const jobsAppied = [];
      for (const id of storedJobIds) {
        const job = jobs.find((job) => job.id === id);
        if (job) {
          jobsAppied.push(job);
        }
      }
      setAppliedJobs(jobsAppied);
      setDisplayJobs(jobsAppied);

      // console.log(jobs, storedJobIds, jobsApplied);
    }
  }, [jobs]);
  return (
    <div>
      <h2>Applied Jobs Page: {appiledJobs.length}</h2>
      <details className="dropdown">
        <summary className="m-1 btn">open or close</summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          <li onClick={()=> handleJobsFilter('all')}><a>All</a></li>
          <li onClick={()=> handleJobsFilter('remote')}><a>Remote</a></li>
          <li onClick={()=> handleJobsFilter('onsite')}><a>Onsite</a></li>
        </ul>
      </details>
      <ul>
        {displayJobs.map((job) => (
          <li key={job.id}>
            <span>
              {job.job_title} {job.company_name}
            </span>
            <br />
            <span className="text-[#33F7FF]">
            {job.remote_or_onsite}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppliedJobs;
