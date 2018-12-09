import './App.css';
import Block from './Block';
import Blocks from './Blocks';
import React, { Component } from 'react';

class App extends Component {
  state = {};

  componentWillMount() {
    this.setState({
      blocks: [ ...Blocks.first ],
      left: [ ...Blocks.first ],
      error: false,
      added: [],
      selected: "first",
    });
  };

  setBlock = id =>
    this.setState({
      blocks: [ ...Blocks[id] ],
      left: [ ...Blocks[id] ],
      error: false,
      added: [],
      selected: id,
    });

  addBlock = _ => {
    const { added, left } = this.state;

    for(let i = 0; i < left.length; i++) {
      const block = left[i];
      if(block.bottom === 0) {
        added.push(block);
        left.splice(i, 1);
        return this.setState({
          added,
          left,
        });
      };

      if(block.isVertical){
        for(let j = 0; j < added.length; j++) {
          const _block = added[j];
          const blockBottom = _block.bottom + (
            _block.isVertical
              ? 300
              : 100
          );
          const blockLeft = _block.left
          if(blockLeft <=  block.left
              && blockBottom === block.bottom){
            added.push(block);
            left.splice(i, 1);
            return this.setState({
              added,
              left,
            });
          };
        }
      } else {
        let touched = 0;
        for(let j = 0; j < added.length; j++) {
          const _block = added[j];
          const blockBottom = _block.bottom + (
            _block.isVertical
              ? 300
              : 100
          );
          const blockLeft = _block.left;
          const blockRight = _block.left + (
            _block.isVertical
              ? 100
              : 300
          );
          const _blockRight = block.left + (
            block.isVertical
              ? 100
              : 300
          );
          if(blockLeft === block.left + 100
              && blockBottom === block.bottom){
            added.push(block);
            left.splice(i, 1);
            return this.setState({
              added,
              left,
            });
          };

          if( blockBottom === block.bottom) {
            touched += Math.max(0, 
              Math.min(blockRight, _blockRight)) -
              Math.max(blockLeft, block.left)
          };
        };

        if(touched >= 200) {
          added.push(block);
          left.splice(i, 1);
          return this.setState({
            added,
            left,
          });
        };
      };
    };

    this.setState({ error: true, })
  };

  restart = _ => 
    this.setState({
      left: [ ...this.state.blocks ],
      added: [],
      error: false,
    });

  render() {
    const { added, blocks, error, selected } = this.state;
    const finished = added.length === blocks.length;

    return (
      <div>
        <div style={{
          width: 800,
          height: 800,
          marginLeft: 50,
          transform: 'scale(1, -1)',
        }}>
        {
          added.map((block, i) =>
              <Block {...block} key={i} />)
        }
        </div>

        <div
          style={{
            position: "absolute",
            display: 'flex',
            flexDirection: 'column',
            right: 50,
            top: 50,
          }}
        >
          <button
            style={{
              padding: 30,
              borderRadius: 12,
              backgroundColor: '#F44336',
              color: '#FAFAFA',
              display: 'blocsk',
            }}
            onClick={error || finished
              ? this.restart
              : this.addBlock}
          >
            {
              error
              ? "ERROR NO PATH CLICK TO RESTART"
              : finished
                ? "FINISHED CLICK TO RESTART"
                : "NEXT"}
          </button>
          {
            Object.keys(Blocks).map(key =>
              <button
              key={key}
              style={{
                padding: 30,
                borderRadius: 12,
                marginTop: 10,
                backgroundColor: key === selected 
                  ? '#43A047'
                  : '#607D8B',
                color: '#FAFAFA',
                display: 'blocsk',
              }}
              onClick={_ => this.setBlock(key)}
            >
              {"CHOOSE BLOCKS NAMED " + key.toLocaleUpperCase()}
            </button>)
          }
        </div>
      </div>
    );
  }
}

export default App;
