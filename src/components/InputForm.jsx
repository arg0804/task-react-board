import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import './InputForm.css';
import blackImage from '../assets/images/black.jpg';
import greenImage from '../assets/images/green.jpg';
import brownImage from '../assets/images/brown.jpg';
import paintedImage from '../assets/images/painted.jpg';

function InputForm({ addCut, cuts, setCuts, onImageSelect, }) {
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [quantity, setQuantity] = useState('');
  const [inputData, setInputData] = useState([]);
  const [inputCount, setInputCount] = useState(1);
  const [editIndex, setEditIndex] = useState(-1);
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [blackImage, greenImage, brownImage, paintedImage];

  const maxAllowedCuts = 10;

  
const addCutHandler = useCallback(() => {
  if (height && width && quantity) {
    if (inputData.length < maxAllowedCuts) {
      const newCut = {
        id: Date.now(),
        width: parseFloat(width),
        height: parseFloat(height),
        quantity: parseInt(quantity),
      };
    
      addCut(newCut);
      setInputCount(inputCount + 1);
      setInputData([...inputData, newCut]);
  
      setHeight('');
      setWidth('');
      setQuantity('');
    } else {
      alert(`You can only add up to ${maxAllowedCuts} cuts.`);
    }
  }
}, [addCut, height, width, inputCount, inputData, quantity])


const editInput = (index) => {
  const updatedCuts = [...cuts];

  if (index >= 0 && index < updatedCuts.length) {
    const editedCut = updatedCuts[index];
    
    const newWidth = prompt("Enter new width:", editedCut.width);
    const newHeight = prompt("Enter new height:", editedCut.height);
    const newQuantity = prompt("Enter new quantity:", editedCut.quantity);

    if (newWidth !== null && newHeight !== null && newQuantity !== null) {
      updatedCuts[index] = {
        width: parseFloat(newWidth),
        height: parseFloat(newHeight),
        quantity: parseInt(newQuantity),
      };
    }
  }

  setCuts(updatedCuts);
  setEditIndex(-1);
};
  

const deleteInput = (index) => {
  const cutId = inputData[index].id;
  const updatedInputData = inputData.filter((data) => data.id !== cutId);
  setInputData(updatedInputData);
  const updatedCuts = [...cuts];
  updatedCuts.splice(index, 1);
  setCuts(updatedCuts);
};
const onImageClick = (image) => {
  setSelectedImage(image);
  onImageSelect(image);
};

return (
  <div className="head-input">
    <div className={classNames('InputForm', 'input-form-container')}>
      <div className="image-selection">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`image ${index + 1}`}
            onClick={() => onImageSelect(image)}
            className={classNames('image', { 'selectedImage': image === selectedImage })}
          />
        ))}
      </div>
      <div className={classNames('input-group')}>
        <label className={classNames('label')}>Width:</label>
        <input
          type="number"
          className={classNames('input')}
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
      </div>
      <div className={classNames('input-group')}>
        <label className={classNames('label')}>Height:</label>
        <input
          type="number"
          className={classNames('input')}
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <div className={classNames('input-group')}>
        <label className={classNames('label')}>Quantity:</label>
        <input
          type="number"
          className={classNames('input')}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <button className={classNames('button')} onClick={addCutHandler}>
        Add Cut
      </button>
      <div>
        {inputData.map((data, index) => (
          <div key={index}>
            <button className='edit-btn' onClick={() => editInput(index)}>Edit</button>
            <button className='delete-btn' onClick={() => deleteInput(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default InputForm;