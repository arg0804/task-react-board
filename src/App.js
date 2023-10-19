import React, { useState } from 'react';
import InputForm from './components/InputForm';
import BoardDisplay from './components/BoardDisplay';
import './App.css';

function App() {
  const [cuts, setCuts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const boardWidth = 3630;
  const boardHeight = 1830;

  const addCut = (newCut) => {
    setCuts([...cuts, newCut]);
  };

  const handleSelectImage = (image) => {
    setSelectedImage(image);
  };

  const addBlocksToBoard = () => {
    setBlocks([...blocks, { width: 100, height: 100 }]);
  };

return (
  <div className="App">
    <h1>Board Cutting Optimization</h1>
    <InputForm
      addCut={addCut}
      cuts={cuts}
      setCuts={setCuts}
      onImageSelect={handleSelectImage}
      blocks={blocks}
      setBlocks={setBlocks}
      addBlocksToBoard={addBlocksToBoard}
    />
    <BoardDisplay
      cuts={cuts}
      boardWidth={boardWidth}
      boardHeight={boardHeight}
      selectedImage={selectedImage}
      blocks={blocks}
    />
   </div>
  );
}

export default App;