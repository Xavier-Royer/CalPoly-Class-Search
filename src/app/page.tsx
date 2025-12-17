"use client"


import { refresh } from "next/cache";
import Course from "../components/course";
import { useEffect, useState } from "react";

export default function Home() {

  // const courses = [
  //     {major: "CS", title: "Intro to Programming", code: "CS101", description: "Principles of algorithmic problem solving and programming. Data, types, functions, control structures, and input/output. Introduction to the software development process: design, implementation, testing, and documentation. Syntax and semantics of a modern programming language. 3 lectures. Formerly CPE/CSC 101.", minUnits: 3, maxUnits: 3, termsOffered: "Fall, Winter", prerequisites: "NONE"},
  //     {major: "MATH", title: "Calculus I", code: "MATH151", description: "Introduction to differential calculus.", minUnits: 2, maxUnits: 6, termsOffered: "Fall, Winter, Spring", prerequisites: "NONE"},
  //     {major: "PHYS", title: "General Physics", code: "PHYS121", description: "Fundamentals of physics with lab.", minUnits: 6, maxUnits: 7, termsOffered: "Fall", prerequisites: "MATH151"},
  // ];

  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<courseType[]>([]);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSearchText, setcurrentSearchText] = useState("");
  const [prerequisites, setPrerequisites] = useState(false);
  const [units, setUnits] = useState("not a number");
 
  //const res = await fetch("api/courses")
  //const courses =  await res.json();


  //get all courses from an api request to the data base 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();    
    setSearchTerm(currentSearchText);
  };

  useEffect(() => {
    setLoading(true);
    setError(false);
    async function load(){
      
      const key_word  = searchTerm;
      const num = parseInt(units);
      const credits = isNaN(num) ? null : num;
      // let credits
      // try{
      //   credits = parseInt(units);

      // }
      // catch{
      //   credits = null;
      // }

      const prereqs = prerequisites === true ? "NONE" : null;
      
      console.log(prereqs + " these are prequres" )
      console.log(credits + " these are credits" )

      try{
        const  res = await fetch(`/api/courses?key_word=${key_word}&prerequisites=${prereqs}&credits=${credits}`);
        const data = await res.json();
        setCourses(data);
      }
      catch (error) {
        console.log("Error loading courses" + String(error) );
        setError(true);
      }
      finally{
        setLoading(false);
      }
    }
    load();
  }, [searchTerm,units,prerequisites]);

  

  if (error){
    return <div>Error loading courses.</div>;
  }

  
 

  return (
    <div>
      <main >
        <div className="search-bar">
         <b> Search Bar: </b>
         <form>
          <input onChange={(e) => setcurrentSearchText(e.target.value)}  type="text" placeholder="Enter Key Word..." />
          <button onClick= { (e) => handleSubmit(e)} type="submit">Search</button>
         </form>
        </div>


        <div className = "filter-and-results-container"> 
        
          {loading ? <div>Loading courses...</div> : 
          <>
            <div>Search Results: {courses.length}</div>
            <div className = "catalog-container">
            {courses.map( course  => <Course key={course.code} {...course} />)}
            </div>
          </>
          }

          <div className= "filter">
            <form>
              <h3> <b> Filters: </b> </h3>
              
                <div className = "filter-item">
                  <b>Credits: </b>
                  <input type="textarea" placeholder="e.g 4" onChange={(e) => setUnits(e.target.value)}></input>
                </div>
                <div className = "filter-item">
                  <b>No Prereqs: </b>
                  <input type="checkbox" defaultChecked = {false} onChange={(e) => setPrerequisites(e.target.checked)}></input>
                
              </div>
            </form>
          </div>

      </div>


      </main>
    </div>
  );
}

type courseType = {
  major_id: string; 
  title: string;
  code: string;
  description: string;
  min_credits: number;
  max_credits: number;
  terms_offered: string;
  prerequisites: string;
}

