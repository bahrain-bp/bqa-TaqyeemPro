import "./App.css";
import { MathJaxContext } from "better-react-mathjax";
import NonUserRoutes from "./routes/NonUserRoutes";
import StudentRoutes from "./routes/StudentRoutes";
import ModeratorRoutes from "./routes/ModeratorRoutes";

function App() {
  const role = sessionStorage.getItem("userRole"); // 'student' or 'moderator'  

  return (
    <>
<<<<<<<<< Temporary merge branch 1
      <NonUserRoutes/>
      {/* <StudentRoutes/> */}
      {/*<ModeratorRoutes/>*/}
=========
      {role === "student" && <StudentRoutes />}
      {role === "moderator" && <ModeratorRoutes />}
      {!role && <NonUserRoutes />}
>>>>>>>>> Temporary merge branch 2
    </>
  );
}

export default App;
