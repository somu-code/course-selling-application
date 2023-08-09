import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverApi } from "../ServerApi";
import { Link } from "react-router-dom";

function CourseDetails() {
  const [course, setCourse] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `${serverApi}/admin/course?courseId=${id}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const jsonData = await response.json();
          setCourse(jsonData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourse();
  }, []);
  return (
    <div className="max-w-screen-2xl mx-auto min-h-[90vh] flex justify-center items-center">
      <div className="flex flex-row">
        <div className="w-1/2 p-6 bg-[#e6f1fc] flex flex-col justify-evenly gap-8">
          <h2 className="text-2xl font-semibold text-center">{course.title}</h2>
          <p className="text-justify">{course.description}</p>
          <p className="font-semibold text-end">Cost {course.price}</p>
          <div className="flex flex-row justify-between">
            <Link to={`/admin/update-course/${course._id}`}>
              <div className="bg-[#25DAC5] px-3 py-1 rounded-full">
                <button className="text-[#FFFFFF] text-lg font-semibold text-center">
                  Edit
                </button>
              </div>
            </Link>
            <div className="bg-[#25DAC5] px-3 py-1 rounded-full">
              <button className="text-[#FFFFFF] text-lg font-semibold text-center">
                Delete
              </button>
            </div>
          </div>
        </div>
        <img src={course.imageURL} alt="course image" className="w-1/2" />
      </div>
    </div>
  );
}

export default CourseDetails;
