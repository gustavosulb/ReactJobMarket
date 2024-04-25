import Hero from "../components/hero"
import HomeCard from "../components/homecards"
import JobListings from "../components/jobListings"
import ViewAllJobs from "../components/viewAllJobs"

const Home = () => {
  return (
    <>
        <Hero />
        <HomeCard />
        <JobListings isHome={true}/>
        <ViewAllJobs />
    </>
  )
}

export default Home