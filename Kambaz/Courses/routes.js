import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";
import deleteQuizService from "../Quizzes/deleteQuizService.js";
export default function CourseRoutes(app) {
  const dao = CoursesDao();
  const enrollmentsDao = EnrollmentsDao();
  const createCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const newCourse = await dao.createCourse(req.body);
    await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };
  const enrollInCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    const enrollment = enrollmentsDao.enrollUserInCourse(
      currentUser._id,
      courseId
    );
    res.json(enrollment);
  };

  const unenrollFromCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    enrollmentsDao.unenrollUserFromCourse(currentUser._id, courseId);
    res.sendStatus(200);
  };

  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  };
  const findCoursesForEnrolledUser = async (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = await enrollmentsDao.findCoursesForUser(userId);
    res.json(courses);
  };
  // const deleteCourse = async (req, res) => {
  //   const { courseId } = req.params;
  //   await enrollmentsDao.unenrollAllUsersFromCourse(courseId);
  //   const status = await dao.deleteCourse(courseId);
  //   res.send(status);
  // };
  // Courses/routes.js

  // DELETE /api/courses/:courseId
  const deleteCourse = async (req, res) => {
    const { courseId } = req.params;
    const course = await dao.findCourseById(courseId);
    const quizIds = course.quizzes || [];
    await Promise.all(
      quizIds.map((quizId) => deleteQuizService(courseId, quizId))
    );
    await enrollmentsDao.unenrollAllUsersFromCourse(courseId);
    const status = await dao.deleteCourse(courseId);
    res.send(status);
  };

  const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const updateCourse = await dao.updateCourse(courseId, courseUpdates);
    res.json(updateCourse);
  };
  const findCourseById = async (req, res) => {
    const { courseId } = req.params;
    const course = await dao.findCourseById(courseId);
    res.json(course);
  };

  const findUsersForCourse = async (req, res) => {
    const { courseId } = req.params;
    const users = await enrollmentsDao.findUsersForCourse(courseId);
    res.json(users);
  };

  app.get("/api/courses/:courseId/users", findUsersForCourse);
  app.put("/api/courses/:courseId", updateCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.get("/api/courses/:courseId", findCourseById);
  app.get("/api/courses", findAllCourses);
  app.post("/api/users/current/courses", createCourse);
  app.post("/api/users/enrollments/:courseId", enrollInCourse);
  app.delete("/api/users/enrollments/:courseId", unenrollFromCourse);
}
