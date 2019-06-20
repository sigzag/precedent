window.games.urspiel = function urspiel(rules) {
  function fan(children) {
    close(children).forEach((piece, i) => piece.tra(0, 0, 20 * i));
    return children;
  }
  function close(children) {
    children.forEach((card) => card.reset());
    return children;
  }
  
  class Tile extends El {
    constructor(attrs) {
      super({ ...attrs, tag: 'tile' });
    }
    status(status) {
      if (this._status === status) return;
      this._status = status;
      if (status === 2) this.el.style.borderColor = 'lime';
      if (status === 1) this.el.style.borderColor = 'dodgerblue';
      if (status === 0) this.el.style.borderColor = null;
    }
    events() { this.el.onclick = () => toggle(this); }
  }
  
  const table = new El({ tag: 'table' }).appendTo(window.scene);//.rot(1/4, 0).tra(0, -100, 0);
  const board = new El({ tag: 'board' }).appendTo(table).tra(0, 0, 10);
  const tiles = Array(15).fill(null).map((_, i) =>
    new Tile({ i: i - 1 }).appendTo(board)
      .tra(
        -425 + (i < 5 ? 450 - i * 50 : i > 12 ? 1250 - i * 50 : 50 * i),
        0 + (i < 5 || i > 12 ? 25 : -25),
        0
      )
  );
  
  tiles[0].reset().tra(-50, 100, 0);
  
  const me = new El().appendTo(table); new El().appendTo(me).tra(50, 100, 0); new El().appendTo(me).tra(-50, 100, 0);
  const ai = new El().appendTo(table); new El().appendTo(ai).tra(50, -100, 0); new El().appendTo(ai).tra(-50, -100, 0);
  const players = [me, ai];
  
  const pieces = [];
  const pick = ({ i, player }) => pieces.find((piece) => i == piece.i && player == piece.player);
  
  let legal = null;
  let a = null;
  let b = null;
  const toggle = (tile) => {
    if (!legal)
      return;
    if (a == null) {
      if (!isLegal(tile.i))
        return;
      a = tile.i;
      tiles.map((tile) => tile.status(isLegal(`${a}->${tile.i}`) ? 1 : a == tile.i ? 2 : 0));
    } else if (b == null && a == tile.i) {
      a = null;
      tiles.map((tile) => tile.status(isLegal(tile.i) ? 1 : 0));
    } else if (b == null) {
      if (!isLegal(`${a}->${tile.i}`))
        return;
      b = tile.i;
      tiles.map((tile) => tile.status(a == tile.i || b == tile.i ? 2 : 0));
    } else if (b == tile.i) {
      b = null;
      tiles.map((tile) => tile.status(isLegal(`${a}->${tile.i}`) ? 1 : a == tile.i ? 2 : 0));
    }
    window.scene.draw();
  };
  const isLegal = (play) => legal && legal.includes(play) || legal.find((set) => set.startsWith(`${play}->`));
  new El({ tag: 'xbutton', text: 'start' }).appendTo(window.scene).tra(0, 200, 100).el.onclick = () => window.socket.emit('start');
  new El({ tag: 'xbutton', text: 'play' }).appendTo(window.scene).tra(-100, 150, 100).el.onclick = () => isLegal(`${a}->${b}`) && window.socket.emit('play', `${a}->${b}`);
  
  window.onstate = function onstate({ game, me}) {
    legal = game.legal && game.players[game.turn % rules.size].id === me.id && game.legal;
    a = b = null;

    if (!pieces.length) {
      for (let i = 0; i < 10; i++) pieces.push(new El({ tag: 'piece-me', i, player: game.players[0].id }));
      for (let i = 0; i < 10; i++) pieces.push(new El({ tag: 'piece-ai', i, player: game.players[1].id }));
    }
  
    game.players.forEach(({ pile, draw }, i) => {
      players[i].children[0].empty().append(...pile.map(pick));
      players[i].children[1].empty().append(...draw.map(pick));
    });
    game.board.forEach((pieces, i) => {
      tiles[i + 1].empty().append(...pieces.map(pick));
      fan(tiles[i].children);
    });
  
    if (legal)
      tiles.map((tile) => tile.status(isLegal(tile.i) ? 1 : 0));
  };
};
