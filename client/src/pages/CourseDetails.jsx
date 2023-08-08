import React from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { courseState } from "../store/atoms/courses";

function CourseDetails() {
  const courses = useRecoilValue(courseState);
  const { id } = useParams();
  console.log(courses)
  const course = courses.find((element) => element._id === id);
  console.log(course);
  return <div>CourseDetails</div>;
}

export default CourseDetails;
