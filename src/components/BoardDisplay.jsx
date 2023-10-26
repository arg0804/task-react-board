import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import './BoardDisplay.css';


function binPacking(cuts, binWidth, binHeight) {
  const sortedCuts = [...cuts].sort((a, b) => b.height - a.height);

  const bins = [{ width: binWidth, height: binHeight, blocks: [] }];
  const smallBlocks = [];

  sortedCuts.forEach((cut) => {
    for (let i = 0; i < cut.quantity; i++) {
      let bestFitBin = null;

      if (cut.width > binWidth || cut.height > binHeight) {
        smallBlocks.push(cut);
        continue;
      }

      for (const bin of bins) {
        if (cut.width <= bin.width && cut.height <= bin.height) {
          if (!bestFitBin || (bin.width - cut.width) * (bin.height - cut.height) <
              (bestFitBin.width - cut.width) * (bestFitBin.height - cut.height)) {
            bestFitBin = bin;
          }
        }
      }

      if (bestFitBin) {
        const newBlock = { width: cut.width, height: cut.height };
        bestFitBin.blocks.push(newBlock);

        bestFitBin.width -= cut.width;
        bestFitBin.height -= cut.height;
      } else {
        if (cut.width <= binWidth && cut.height <= binHeight) {
          for (const bin of bins) {
            if (bin.width >= cut.width && bin.height >= cut.height) {
              const newBlock = { width: cut.width, height: cut.height };
              bin.blocks.push(newBlock);

              bin.width -= cut.width;
              bin.height -= cut.height;
              break;
            }
          }
        }

        if (!bestFitBin) {
          // If there's no bin that can fit the cut, create a new bin
          const newBin = { width: binWidth, height: binHeight, blocks: [] };
          newBin.blocks.push({ width: cut.width, height: cut.height });
          bins.push(newBin);
        }
      }
    }
  });

  // Add small blocks to fill empty spaces
  smallBlocks.forEach((cut) => {
    for (const bin of bins) {
      if (cut.width <= bin.width && cut.height <= bin.height) {
        const newBlock = { width: cut.width, height: cut.height };
        bin.blocks.push(newBlock);

        bin.width -= cut.width;
        bin.height -= cut.height;
        break;
      }
    }
  });

  return bins;
}








function BoardDisplay({ cuts, boardWidth, boardHeight, selectedImage }) {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const packedBins = binPacking(cuts, boardWidth, boardHeight);

    const newBlocks = packedBins.reduce((acc, bin) => [...acc, ...bin.blocks], []);

    setBlocks(newBlocks);
  }, [cuts, boardWidth, boardHeight]);

  return (
    <div className={classNames('BoardDisplay', 'board-display')}>
      <div>
        <img
          src={selectedImage}
          className={classNames('selected-image')}
        />
        <div className="block-row">
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
      ></div> 
      ))}
        </div>
      </div>
    </div>
  );
}

export default BoardDisplay;
