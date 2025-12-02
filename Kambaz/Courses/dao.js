import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
export default function CoursesDao() {
  function findAllCourses() {
    return model.find({}, { name: 1, description: 1, image: 1 });
  }

  // async function findCoursesForEnrolledUser(userId) {
  //   const { enrollments } = db;
  //   const courses = await model.find({}, { name: 1, description: 1, image: 1 });
  //   const enrolledCourses = courses.filter((course) =>
  //     enrollments.some(
  //       (enrollment) =>
  //         enrollment.user === userId && enrollment.course === course._id
  //     )
  //   );
  //   console.log("enroled:", courses);
  //   return enrolledCourses;
  // }
  function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    return model.create(newCourse);
  }
  function deleteCourse(courseId) {
    return model.deleteOne({ _id: courseId });
  }

  function updateCourse(courseId, courseUpdates) {
    return model.findByIdAndUpdate(courseId, courseUpdates, { new: true });

    // return model.updateOne({ _id: courseId }, { $set: courseUpdates });
    // const { courses } = db;
    // const course = courses.find((course) => course._id === courseId);
    // Object.assign(course, courseUpdates);
    // return course;
  }

  function findCourseById(courseId) {
    return model.findById(courseId);
  }

  return {
    findAllCourses,
    // findCoursesForEnrolledUser,
    createCourse,
    deleteCourse,
    updateCourse,
    findCourseById,
  };
}
