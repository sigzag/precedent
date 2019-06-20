const { max } = Math;

window.games.president = function president(rules) {
  function fan(children, d = -450) {
    close(children).forEach((card, i) => card.tra(0, -d, 0).rot(children.length < 2 ? 0 : -1/6 + 2/6 * i / (children.length - 1), 2).tra(0, d, 0));
    return children;
  }
  function close(children) {
    children.forEach((card, i) => card.reset().tra(0, 0, 20 - i));
    return children;
  }

  class Card extends El {
    render() {
      return el('card',
        el('front',
          el('number', [3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2][this.n]),
          el('suit', this.s)
        ),
        el('back')
      );
    }
    status(status) {
      if (this._status === status) return;
      this._status = status;
      this.tra(0, (this._status || 0) * 10 - status * 10, 0);
      if (status === 2) this.el.style.borderColor = 'lime';
      if (status === 1) this.el.style.borderColor = 'dodgerblue';
      if (status === 0) this.el.style.borderColor = null;
    }
    events() { this.el.onclick = () => toggle(this); }
    toJSON() { return { n: this.n, s: this._s }; }
  }
  
  const table = new El({ tag: 'table' }).appendTo(window.scene).rot(1/4, 0).tra(0, -100, 0);
  const draw = new El().appendTo(table).tra(0, 0, 2);
  const pile = new El().appendTo(table).tra(100, 0, 2);
  
  const suit = (i) => { const suit = el('span', ['⚢', '⚣', '⚤', '♥']/*['♥', '♣', '♦', '♠']*/[i]); suit.style.color = i & 1 ? 'rgb(255, 36, 0);' : 'forestgreen'; return suit; };
  const gen = () => Array(52).fill(null).map((_, i) => new Card({ n: i % 13, s: suit(floor(i / 13)), _s: floor(i / 13) }));
  const deck = gen();
  deck.pick = (card) => deck.find(({ n, _s }) => card.n === n && card.s === _s);
  const hands = Array(rules.size).fill(null).map((_, i) =>
    new El({ tag: 'hand' }).appendTo(table).rot(2 * i / rules.size, 2).tra(0, 200, 0).rot(-1/4, 0).tra(0, 0, 100)
  );
  const avatars = hands.map(() => new Sprite({ tag: 'avatar' }).tra(0, 0, 50));

  draw.append(...deck);
  
  let legal = null;
  const selected = [];
  const toggle = (card) => {
    if (!isLegal(card))
      return;
  
    if (selected.includes(card))
      selected.splice(selected.indexOf(card), 1);
    else if (legal.reduce((m, play) => max(m, play.length), 0) === selected.length)
      return;
    else
      selected.push(card);
  
    deck.forEach((card) => card.status(0));
    if (legal.reduce((m, play) => max(m, play.length), 0) > selected.length)
      legal.forEach((play) => play.forEach((card) => card.status(!selected.length || card.n === selected[0].n ? 1 : 0)));
    selected.forEach((card) => card.status(2));
    window.scene.draw();
  };
  const isLegal = (play) => legal && (
    play === 'PASS' ||
    legal.find((set) => set.includes(play)) ||
    legal.find((set) => set.length === play.length && !set.find((card) => !play.includes(card)))
  );
  new El({ tag: 'xbutton', text: 'pass' }).appendTo(window.scene).tra(100, 250, 0).onclick = () => isLegal('PASS') && window.socket.emit('play', 'PASS')
  new El({ tag: 'xbutton', text: 'play' }).appendTo(window.scene).tra(-100, 250, 0).el.onclick = () => isLegal(selected) && window.socket.emit('play', selected);
  
  window.onstate = function onstate({ game, rules, me }) {
    legal = game.legal && game.players[game.turn % rules.size].id === me.id && game.legal.map((play) => play.map(deck.pick));
    selected.length = 0;

    game.players.forEach(({ cards }, i) => hands[i].empty().append(...cards.map(deck.pick)));
    draw.empty().append(...game.draw.map(deck.pick));
    pile.empty().append(...game.pile.map(deck.pick));
  
    game.players.forEach(({ cards }, i) => {
      fan(cards.map(deck.pick))
      avatars[i].appendTo(hands[i]);
    });
    close(game.draw.map(deck.pick));
    close(game.pile.map(deck.pick));
    if (game.play)
      fan(game.play.map(deck.pick), 100);
  
    deck.forEach((card) => card.status(0));
    if (legal)
      legal.forEach((play) => play.forEach((card) => card.status(1)));
  };
};
