import "./App.css";
import { Button, Stack } from "@chakra-ui/react"
import NonUserRoutes from "./routes/NonUserRoutes";
import StudentRoutes from "./routes/StudentRoutes";
import ModeratorRoutes from "./routes/ModeratorRoutes";

function App() {
  const role = sessionStorage.getItem("userRole");  

  return (
    <>
      {role === "student" && <StudentRoutes />}
      {role === "moderator" && <ModeratorRoutes />}
      {!role && <NonUserRoutes />}
    </>
  );
}

export default App;
