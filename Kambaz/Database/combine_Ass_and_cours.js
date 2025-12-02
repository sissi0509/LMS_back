import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const courses = JSON.parse(
  fs.readFileSync(path.join(__dirname, "newCoursesWithImage.json"), "utf-8")
);

const assignments = JSON.parse(
  fs.readFileSync(path.join(__dirname, "assignments.json"), "utf-8")
);

const map = {};
assignments.forEach((a) => {
  if (!map[a.course]) map[a.course] = [];
  const { course, ...assignmentWithoutCourse } = a;
  map[a.course].push(assignmentWithoutCourse);
});

const merged = courses.map((course) => {
  const courseId = course._id;
  return {
    ...course,
    assignments: map[courseId] || [],
  };
});

fs.writeFileSync(
  path.join(__dirname, "mergedCoursesWithAssignments.json"),
  JSON.stringify(merged, null, 2),
  "utf-8"
);
