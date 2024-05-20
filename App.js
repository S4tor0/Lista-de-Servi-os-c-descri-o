//Desenvolvimento de Aplicações Moveis
//121
//Erick Santos Brito  - 2021200278

import { useState } from "react";
import './App.css';

function App()
{
  //criando o estado para os serviços de para as descrições
  const [service,setServs] = useState('');
  const [description,setDescription] = useState('');
  const [lista,setLista] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editService, setEditService] = useState('');
  const [editDescription, setEditDescription] = useState('');

//cadastro do serviço
  const handleServices = (event) => 
  {
    //checa se o serviço que está sendo adicionado não é vazio
    if (event.target.value.trim() !== '') 
    {
      setServs(event.target.value); 
    }
  }
//cadastro da descrição
  const handleDescription = (event) =>
  {
    if (event.target.value.trim() !== '')
    {
      setDescription(event.target.value); 
    }
  }
//adiciona o cadastro do serviço e da descrição a lista
  const handleInfo = () =>
  {
    setLista([...lista,{service,description}]);
    setServs('');
    setDescription('');
  }
//remoção do cadastro da lista
  const removeInfo = (index) =>
  {
    const newLista = lista.filter((item,i) => i !== index)
    setLista(newLista);
  }

//editar a lista
  const editInfo = (index) =>
  {
    //define o valor com base no item da lista
    const currentItem = lista[index]
    setEditService(currentItem.service);
    setEditDescription(currentItem.description);
    setEditIndex(index);
  }

  const confirmEdit = () =>
  {
    const newLista = [...lista];
    newLista[editIndex] = {service: editService, description: editDescription};
    setLista(newLista);
    setEditIndex(null);
    setEditService('');
    setEditDescription('');
  }

  return(
    <div className="App">
      <h1>Serviços</h1>
      <div className="Conteiner">
        <label>Serviço: </label>
        <input 
          type="text" 
          value={service} 
          onChange={handleServices} 
          placeholder="Digite um serviço"
        />
        <br></br>
        <label>Descrição: </label>
        <input 
          type="text" 
          value={description} 
          onChange={handleDescription}
          placeholder="Digite uma descrição"
        />
        <br></br>
        <button onClick={handleInfo} >Adicionar</button>
        </div>

        <ul>
          {lista.map((item, index) => (
            <li key={index}>
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editService}
                    onChange={(e) => setEditService(e.target.value)}
                  />
                  <textarea 
                    type="text" 
                    style={{ width: 'auto', height: 'auto' }} 
                    value={editDescription} 
                    onChange={(e) => setEditDescription(e.target.value)} 
                  />

                  <button onClick={confirmEdit}>Confirmar</button>
                </>
              ) : (
                <>
                  <strong>Serviço: </strong> {item.service}<br/>
                  <strong>Descrição: </strong> <p>{item.description} </p> 
                  <button onClick={() => removeInfo(index)}>Remover</button>
                    {editIndex === index ? (
                      <button onClick={() => confirmEdit(index)}>Confirmar</button>  
                    ) : (
                      <button onClick={() => editInfo(index)}>Editar</button>
                    )}
                </>
              )}
            </li>
          ))}
        </ul>
    </div>
  );
}

export default App;
