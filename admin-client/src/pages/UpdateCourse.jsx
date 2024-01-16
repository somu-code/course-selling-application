import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { courseState } from "../store/atoms/courses";
import { adminApi } from "../AdminApi";

function UpdateCourse() {
  const courses = useRecoilValue(courseState);
  const navigate = useNavigate();
  const { id } = useParams();
  const course = courses.find((element) => {
    if (element._id == id) {
      return element;
    }
  });
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [price, setPrice] = useState(course.price);
  const [published, setPublished] = useState(course.published);
  const [imageURL, setImageURL] = useState(course.imageURL);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${adminApi}/update-course?courseId=${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: course._id,
            title,
            description,
            price,
            published,
            imageURL,
          }),
        },
      );
      if (response.ok) {
        const jsonData = await response.json();
        navigate(`/admin/course/${id}`);
        alert("Course updated successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="min-h-[90vh] flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-slate-300 p-6 gap-4 rounded-xl w-2/5"
      >
        <h3 className="text-center font-semibold text-[#2866df]">
          Update Course
        </h3>
        <input
          type="text"
          name="title"
          id="courseTitle"
          placeholder="Title"
          required
          className="pl-2 py-2 rounded-md focus:outline-blue-500"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <textarea
          rows="2"
          type="text"
          name="description"
          id="courseDescription"
          placeholder="Description"
          required
          className="pl-2 py-2 rounded-md focus:outline-blue-500"
          onChange={(event) => setDescription(event.target.value)}
          value={description}
        ></textarea>
        <input
          type="number"
          name="price"
          id="coursePrice"
          placeholder="Price"
          required
          className="pl-2 py-2 rounded-md focus:outline-blue-500"
          onChange={(event) => setPrice(event.target.value)}
          value={price}
        />
        <div className="bg-white py-2 rounded-md px-2 flex flex-row justify-between items-center">
          <label htmlFor="coursePublished">Published</label>
          <select
            name="published"
            id="coursePublished"
            required
            onChange={(event) => setPublished(event.target.value)}
            value={published}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <input
          type="url"
          name="imageURL"
          id="imageURL"
          placeholder="Image URL"
          required
          onChange={(event) => setImageURL(event.target.value)}
          value={imageURL}
          className="bg-white py-2 rounded-md px-2"
        />
        <button
          type="submit"
          className="bg-[#2866df] text-white font-semibold py-2 rounded-md hover:bg-[#215ac8]"
        >
          Update Course
        </button>
      </form>
    </div>
  );
}

export default UpdateCourse;
