import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
export default function EnrollmentsDao() {
  // function enrollUserInCourse(userId, courseId) {
  //   const { enrollments } = db;

  //   const enrollment = {
  //     _id: uuidv4(),
  //     user: userId,
  //     course: courseId,
  //   };
  //   enrollments.push(enrollment);
  //   return enrollment;
  // }

  // function unenrollUserFromCourse(userId, courseId) {
  //   const { enrollments } = db;
  //   const index = enrollments.findIndex(
  //     (e) => e.user === userId && e.course === courseId
  //   );
  //   if (index !== -1) {
  //     enrollments.splice(index, 1);
  //   }
  // }
  // function findEnrollmentsForCurrentUser(userId) {
  //   const { enrollments } = db;
  //   return enrollments.filter((e) => e.user === userId);
  // }

  async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments
      .map((enrollment) => enrollment.course)
      .filter((c) => c !== null);
  }
  async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments
      .map((enrollment) => enrollment.user)
      .filter((u) => u !== null);
  }

  async function enrollUserInCourse(userId, courseId) {
    return model.create({
      user: userId,
      course: courseId,
      _id: `${userId}-${courseId}`,
    });
  }
  async function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
  }
  async function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
  }

  return {
    enrollUserInCourse,
    unenrollUserFromCourse,
    findCoursesForUser,
    findUsersForCourse,
    unenrollAllUsersFromCourse,
    // findEnrollmentsForCurrentUser,
  };
}
