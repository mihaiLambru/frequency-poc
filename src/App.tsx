import React, { useState } from "react";
import { Button } from "antd";
import Francesco from "./Francesco";
import Greta from "./Greta";

function App() {
  const [openedModal, setOpenedModal] = useState<"Francesco" | "Greta" | null>(
    null
  );

  return (
    <>
      <Button onClick={() => setOpenedModal("Francesco")}>
        Modal one
      </Button>
      <Button onClick={() => setOpenedModal("Greta")}>Modal two</Button>
      <Francesco
        onClose={() => setOpenedModal(null)}
        isOpen={openedModal === "Francesco"}
      />
      <Greta
        onClose={() => setOpenedModal(null)}
        isOpen={openedModal === "Greta"}
      />
    </>
  );
}

export default App;
