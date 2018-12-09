import React from 'react'

function Block({ bottom, left, isVertical }) {
  return (
    <div 
      style={{
        backgroundColor: "#0277BD",
        outline: "4px solid black",
        position: "absolute",
        height: isVertical
          ? 296
          : 96,
        width: isVertical
          ? 96
          : 296,
        top: bottom,
        left,
      }}
    />
  )
}

export default Block
