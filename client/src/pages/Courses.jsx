import React, { useEffect, useState } from "react";
import { serverApi } from "../ServerApi";

function Courses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${serverApi}/admin/courses`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const jsonData = await response.json();
        setCourses(jsonData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="max-w-screen-2xl mx-auto mt-8">
      <h1 className="text-center font-medium text-2xl text-[#1E0E62] mb-8">
        Courses
      </h1>
      <div className="flex flex-row gap-8 flex-wrap justify-center">
        {courses.map((course) => {
          return (
            <div key={course._id} className="w-80 h-80 flex flex-col">
              <img src={course.imageURL} alt="" />
              <div className="bg-[#e6f1fc] px-2 pb-1 flex-grow flex flex-col">
                <div className="text-lg font-medium">{course.title}</div>
                <div className="text-justify line-clamp-3">
                  {course.description}
                </div>
                <div className="text-end font-semibold mt-auto">
                  Cost ${course.price}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Courses;
