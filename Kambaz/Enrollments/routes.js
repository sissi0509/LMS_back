// import EnrollmentsDao from "./dao.js";

// export default function EnrollmentsRoutes(app, db) {
//   const enrollmentsDao = EnrollmentsDao(db);

//   const findEnrollmentsForCurrentUser = (req, res) => {
//     let { userId } = req.params;
//     if (userId === "current") {
//       const currentUser = req.session["currentUser"];
//       if (!currentUser) {
//         res.sendStatus(401);
//         return;
//       }
//       userId = currentUser._id;
//     }
//     const enrollments = enrollmentsDao.findEnrollmentsForCurrentUser(userId);
//     res.json(enrollments);
//   };
//   app.get("/api/users/:userId/enrollments", findEnrollmentsForCurrentUser);
// }
