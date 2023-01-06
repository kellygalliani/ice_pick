import React from "react";
import "./App.css";
import LoginPage from "./components/login/login";

import { useModal } from "./contexts/modalContext/modalContext";
import Modal from "./components/modal/modal";
import { GlobalStyle } from "./styles/globalStyles";
import FilterFrases from "./components/filter/filter";



function App() {

  const {stateModal, showModal} = useModal()

  return (
    <div className="App">
      <GlobalStyle/>
      {/* <LoginPage />
      <div></div>
      <RegisterPage/>
      <div>
        <EditPage/>
      </div>
      <DeletePage/>
      <GetPage/> */}
      {stateModal && <Modal/>}
      <button onClick={() => showModal(<LoginPage/>)}>Abrir Modal Login</button>
      <button onClick={() => showModal(<RegisterPage/>)}>Abrir Modal Cadastro</button>
      <button onClick={() => showModal(<EditPage/>)}>Abrir Modal de Editar</button>
      <FilterFrases/>
    </div>
  );
}

export default App;
