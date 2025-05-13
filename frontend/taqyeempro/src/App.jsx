import "./App.css";
import { MathJaxContext } from "better-react-mathjax";
import NonUserRoutes from "./routes/NonUserRoutes";
import StudentRoutes from "./routes/StudentRoutes";
import ModeratorRoutes from "./routes/ModeratorRoutes";

function App() {
  const role = sessionStorage.getItem("userRole"); // 'student' or 'moderator'

  const mathJaxConfig = {
    loader: { load: ["[tex]/ams"] },
    tex: {
      packages: { "[+]": ["ams"] }
    }
  };

  return (
    <MathJaxContext config={mathJaxConfig}>
      {<ModeratorRoutes />}
      {/* {role === "student" && <StudentRoutes />} */}
      {/* {!role && <NonUserRoutes />} */}
    </MathJaxContext>
  );
}

export default App;
