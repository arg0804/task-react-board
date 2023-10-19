import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import './BoardDisplay.css';

function BoardDisplay({ cuts, boardWidth, boardHeight, selectedImage }) {
  const [blocks, setBlocks] = useState([]);

useEffect(() => {
let totalBlockHeight = 0;
  let leftPosition = 0;
  const newBlocks = [];
  for (const cut of cuts) {
    for (let i = 0; i < cut.quantity; i++) {
      if (cut.height <= boardHeight && cut.width <= boardWidth - leftPosition) {
        const block = {
          width: cut.width,
          height: cut.height,
          left: leftPosition,
          top: totalBlockHeight,
        };
        leftPosition += cut.width;
        newBlocks.push(block);
      } else {
        leftPosition = 0;
        totalBlockHeight += cut.height;
        const block = {
          width: cut.width,
          height: cut.height,
          left: leftPosition,
          top: totalBlockHeight,
        };
        leftPosition += cut.width;
        newBlocks.push(block);
      }
    }
  }
  setBlocks(newBlocks);
}, [cuts, boardWidth, boardHeight]);

return (
  <div className={classNames('BoardDisplay', 'board-display')}>
    <div>
      <img
        src={selectedImage}
        className={classNames('selected-image')}
      />
      <div className='block-row'>
      {blocks.map((block, blockIndex) => (
        <div
          key={blockIndex}
            className={classNames('Block', 'block')}
            style={{
              width: block.width + 'px',
              height: block.height + 'px',
              left: block.left + 'px',
              top: block.top + 'px',
            }}
          >
         </div>
      ))}
      </div>
    </div>
  </div>
 );
}

export default BoardDisplay;
