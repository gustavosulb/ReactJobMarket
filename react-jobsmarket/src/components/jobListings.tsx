import { useState, useEffect } from 'react';
import JobListing from './jobListing';
import Spinner from '../components/spinner'


interface JobListingProps{
  isHome?:boolean;
}

interface JobProp {
  id:string;
  type:string;
  description:string;
  title:string;
  salary:string;
  location:string;
  company: {
      companyName: string;
      description: string;
      contactEmail: string;
      contactPhone: string;
  };
}


const JobListings = ({isHome=false}:JobListingProps) => {
    const [jobs,setJobs] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{

      const fecthJobs = async () => {
        const ApiURL = isHome ? '?_limit=3' : ''

        try{
          const res = await fetch('/api/jobs'+ApiURL);
          const data = await res.json();
          setJobs(data);
        }catch(e:unknown){
          console.log("An error ocurred fetching the jobs",  e)
        }finally{
          setLoading(false);
        }
    
      }

      fecthJobs();

    },[])

    //const recentJobs = isHome ? jobs.slice(0,3) : jobs;

  return (
    <>
        <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? 'Recent Jobs' : 'Browse Jobs'}
        </h2>
        
         
            { loading  ?  (
              <Spinner loading={loading}/>
            ) : (

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              { 
                jobs!.map((job:JobProp)=>{
                        return (
                            <JobListing key={job.id} job={job}/>
                        );
                  })
                }
              </div>
            )}
          

          
          
          
        
      </div>
    </section>
    </>
  )
}

export default JobListings