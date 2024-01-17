import { useEffect } from "react";
import { userApi } from "../UserApi";

export function Courses() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${userApi}/courses`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const jsonData = await response.json();
          console.log(jsonData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return <h1>Courses</h1>;
}
