import { title } from "process";
import Course from "../components/course";

export default function Home() {

  const courses = [
      {major: "CS", title: "Intro to Programming", code: "CS101", description: "Principles of algorithmic problem solving and programming. Data, types, functions, control structures, and input/output. Introduction to the software development process: design, implementation, testing, and documentation. Syntax and semantics of a modern programming language. 3 lectures. Formerly CPE/CSC 101.", minUnits: 3, maxUnits: 3, termsOffered: "Fall, Winter", prerequisites: "NONE"},
      {major: "MATH", title: "Calculus I", code: "MATH151", description: "Introduction to differential calculus.", minUnits: 2, maxUnits: 6, termsOffered: "Fall, Winter, Spring", prerequisites: "NONE"},
      {major: "PHYS", title: "General Physics", code: "PHYS121", description: "Fundamentals of physics with lab.", minUnits: 6, maxUnits: 7, termsOffered: "Fall", prerequisites: "MATH151"},
  ];


  return (
    <div>
      <main >
        <div className="search-bar">
         <b> Search Bar: </b>
         <form>
          <input type="text" placeholder="Enter Key Word..." />
          <button type="submit">Search</button>
         </form>
        </div>

        <div className = "catalog-container">
        {courses.map(course => <Course key={course.code} {...course} />)}
        </div>

      </main>
    </div>
  );
}
