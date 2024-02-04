import React, { useEffect } from "react";
import { adminApi } from "../AdminApi";
import { Link } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { courseState } from "../store/atoms/courses";

function Courses() {
  const setCourses = useSetRecoilState(courseState);
  const courses = useRecoilValue(courseState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${adminApi}/courses`, {
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
            <Link key={course._id} to={`/admin/course/${course._id}`}>
              <div className="w-80 h-96 flex flex-col overflow-hidden">
                <img src={course.imageURL} alt="" className="" />
                <div className="bg-[#e6f1fc] px-2 pb-1 flex-grow flex flex-col">
                  <div className="text-lg font-medium line-clamp-1">
                    {course.title}
                  </div>
                  <div className="text-justify line-clamp-4">
                    {course.description}
                  </div>
                  <div className="text-end font-semibold mt-auto">
                    Cost ${course.price}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Courses;
