import "./App.css";
import { MathJaxContext } from "better-react-mathjax";
import NonUserRoutes from "./routes/NonUserRoutes";
import StudentRoutes from "./routes/StudentRoutes";
import ModeratorRoutes from "./routes/ModeratorRoutes";

function App() {
  const role = sessionStorage.getItem("userRole"); // 'student' or 'moderator'  

  return (
    <>
      {/* <NonUserRoutes/> */}
      <StudentRoutes/>
      {/*<ModeratorRoutes/>*/}

      {/* {role === "student" && <StudentRoutes />}
      {role === "moderator" && <ModeratorRoutes />}
      {!role && <NonUserRoutes />} */}
    </>
  );
}

export default App;
