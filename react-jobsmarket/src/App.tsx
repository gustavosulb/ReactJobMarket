

import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import Home from "./pages/Home";
import MainLayout from "./Layout/MainLayout";
import JobsPage from "./pages/JobsPage";
import NotFound from "./pages/NotFound";
import JobPage, {jobLoader} from "./pages/JobPage";
import EditJob from "./pages/EditJob";
import AddJob from "./pages/AddJob";
import { toast } from 'react-toastify';

interface JobProp {
  id?:string;
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


const addJob= (newJob:JobProp)=>{
 
  const add = async () => {
   
    try{
      await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(newJob)
      });
      return;
    }catch(e:unknown){
      console.log("An error ocurred SAVING the job",  e)
    }finally{
      toast.success('new job added!');
    }

  }

  add();
  return;

}

const removeJob = (id:string)=>{
  
  const remove = async () => {
   
    try{
      await fetch('/api/jobs/'+id, {
        method: 'DELETE'
      });
    }catch(e:unknown){
      console.log("An error ocurred DELETING the job",  e)
    }finally{
      toast.info('Job Deleted!');
    }

  }

  remove();
  return;

} 

const editJob = (Job:JobProp) =>{
  console.log(Job);
  console.log('we start editing');


  const edit = async () => {
   
    try{
      await fetch('/api/jobs/'+Job.id, {
        method: 'PUT',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(Job)
      });
    }catch(e:unknown){
      console.log("An error ocurred savinf the job",  e)
    }finally{
      toast.success('Job Edited!');
    }

  }

  edit();
  return;

} 

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout/>}>
      <Route index element={<Home/>} />
      <Route path="/jobs" element={<JobsPage/>} />
      <Route loader={jobLoader} path="/jobs/:id" element={<JobPage callbackDeleteJob={removeJob}/>} />
      <Route loader={jobLoader} path="/jobs/edit/:id" element={<EditJob callbackEditJob={editJob}/>} />
      <Route path="/add-job" element={<AddJob callbackAddJob={addJob}/>} />
      <Route path="*" element={<NotFound/>} />
    </Route>
  )
);

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
