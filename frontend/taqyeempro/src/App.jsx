import "./App.css";
import { Button, Stack } from "@chakra-ui/react"
import NonUserRoutes from "./routes/NonUserRoutes";
import StudentRoutes from "./routes/StudentRoutes";
import ModeratorRoutes from "./routes/ModeratorRoutes";

function App() {

  return (
    <>
      <NonUserRoutes/>
      {/* <StudentRoutes/> */}
      {/*<ModeratorRoutes/>*/}
    </>
  );
}

export default App;
