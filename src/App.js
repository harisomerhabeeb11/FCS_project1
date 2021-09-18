import { Container, Typography } from "@material-ui/core";
import "./App.css";
import Decomposition from "./Decomposition";

function App() {
  return (
    <Container maxWidth="md">
      <Typography
        variant="h4"
        align="center"
        style={{ margin: "2rem 0" }}
      >
        Foundation of Computer Science
      </Typography>
      <Typography variant="h6" align="center" style={{ marginBottom: "1.5rem" }}>
        Project 1
      </Typography>
      <Decomposition />
    </Container>
  );
}

export default App;
