/*
  Materia: Desenvolvimento de Aplicações Moveis
  Turma: 121
  Nome: Erick Santos Brito - 2021200278
*/ 

import React, { useState } from "react";
import "./App.css";

function App() {
  // State para o novo serviço e descrição
  const [service, setService] = useState("");
  const [description, setDescription] = useState("");
  // State para armazenar a lista de itens
  const [lista, setLista] = useState([]);
  // State para rastrear o índice do item sendo editado
  const [editIndex, setEditIndex] = useState(null);
  // States para os campos editáveis ​​do item atualmente sendo editado
  const [editService, setEditService] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("incompleto");

  // Função para lidar com a alteração do serviço
  const handleServiceChange = (event) => {
    setService(event.target.value);
  };

  // Função para lidar com a alteração da descrição
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // Função para lidar com a alteração do status de edição
  const handleStatusChange = (event) => {
    setEditStatus(event.target.value);
  };

  // Função para adicionar um novo item à lista
  const addInfo = () => {
    if (service.trim() === "" || description.trim() === "") return;
    const newItem = {
      service,
      description,
      status: "incompleto",
      expanded: false,
    };
    setLista([...lista, newItem]);
    setService("");
    setDescription("");
  };

  // Função para remover um item da lista
  const removeInfo = (index) => {
    const newLista = [...lista];
    newLista.splice(index, 1);
    setLista(newLista);
  };

  // Função para editar um item da lista
  const editInfo = (index) => {
    const currentItem = lista[index];
    setEditIndex(index);
    setEditService(currentItem.service);
    setEditDescription(currentItem.description);
    setEditStatus(currentItem.status);
  };

  // Função para confirmar a edição de um item
  const confirmEdit = () => {
    const newLista = lista.map((item, index) => {
      if (index === editIndex) {
        return {
          ...item,
          service: editService,
          description: editDescription,
          status: editStatus,
        };
      }
      return item;
    });
    setLista(newLista);
    setEditIndex(null);
    setEditService("");
    setEditDescription("");
    setEditStatus("incompleto");
  };

  // Função para alternar a exibição da descrição do item
  const toggleDescription = (index) => {
    const newLista = [...lista];
    newLista[index].expanded = !newLista[index].expanded;
    setLista(newLista);
  };

  return (
    <div className="App">
      <h1>Serviços</h1>
      <div className="Container">
        <label htmlFor="service">Serviço:</label>
        <input
          type="text"
          id="service"
          value={service}
          onChange={handleServiceChange}
          placeholder="Digite um serviço"
        />
        <br />
        <label htmlFor="description">Descrição:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Digite uma descrição"
        />
        <br />
        <button onClick={addInfo}>Adicionar</button>
      </div>

      <ul>
        {/* Mapeando a lista de itens */}
        {lista.map((item, index) => (
          <li key={index}>
            <strong>Serviço: </strong> {item.service}
            <br />
            <strong>Status: </strong> {item.status}
            <br />
            {/* Verificando se a descrição do item está expandida */}
            {item.expanded && (
              <>
                <strong>Descrição: </strong>
                <p>{item.description}</p>
                <button onClick={() => removeInfo(index)}>Remover</button>
                {/* Verificando se o item está sendo editado */}
                {editIndex === index ? (
                  <div className="Status">
                    <label>
                      Incompleto
                      <input
                        type="radio"
                        checked={editStatus === "incompleto"}
                        value="incompleto"
                        onChange={handleStatusChange}
                      />
                    </label>
                    <label>
                      Em Andamento
                      <input
                        type="radio"
                        checked={editStatus === "em andamento"}
                        value="em andamento"
                        onChange={handleStatusChange}
                      />
                    </label>
                    <label>
                      Concluído
                      <input
                        type="radio"
                        checked={editStatus === "concluído"}
                        value="concluído"
                        onChange={handleStatusChange}
                      />
                    </label>
                    <br />
                    <label>
                      Editar Serviço:
                      <input
                        type="text"
                        value={editService}
                        onChange={(e) => setEditService(e.target.value)}
                      />
                    </label>
                    <label>
                      Editar Descrição:
                      <input
                        type="text"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                      />
                    </label>
                    <button onClick={confirmEdit}>Confirmar</button>
                  </div>
                ) : (
                  // Botão editar para o item
                  <button onClick={() => editInfo(index)}>Editar</button>
                )}
              </>
            )}
            {/* Botão para expandir/recolher a descrição do item */}
            <button onClick={() => toggleDescription(index)}>
              {item.expanded ? "Recolher" : "Expandir"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
