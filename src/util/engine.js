const el = (t, ...c) => (t = document.createElement(t), t.append(...c.filter((c) => !!c).map((c) => c instanceof El ? c.el : c)), t);
class El {
  constructor(attrs = {}) {
    Object.assign(this, attrs, { children: [], p: v3(), r: m4() });
    if (this.render || this.tag) {
      this.el = this.render ? this.render() : el(this.tag, this.text);
      document.body.children[0].append(this.el);
      if (this.events)
        this.events(this.el);
    }
  }
  reset() {
    this.p = v3();
    this.r = m4();
    return this;
  }
  rot(a, d) {
    this.r = multiply(this.r, rotate(a, d));
    return this;
  }
  tra(...v) {
    this.p = translate(v, this.p, this.r);
    return this;
  }
  draw(m = m4()) {
    m = multiply(m, m4(this.p, this.r));
    const nextTransform = transform(m);
    let dirty = this.children.reduce((dirty, child) => child.draw(m) || dirty, false);
    if (this.el && this.el.style.transform !== nextTransform) {
      this.el.style.transform = nextTransform;
      dirty = true;
    }
    return dirty;
  }
  appendTo(parent) {
    parent.append(this);
    return this;
  }
  append(...children) {
    children = children.filter((child) => !!child);
    this.children = this.children.concat(children);
    for (const child of children) {
      if (child.parent && child.parent !== this) child.parent.remove(child);
      child.parent = this;
    }
    return this;
  }
  remove(...children) {
    this.children = this.children.filter((child) => !children.includes(child));
    for (const child of children) child.parent = null;
    return this;
  }
  empty() {
    return this.remove(...this.children);
  }
}
class Sprite extends El {
  draw(m = m4()) {
    m = multiply(m, m4(this.p, this.r));
    const nextTransform = transform([1, 0, 0, m[3], 0, 1, 0, m[7], 0, 0, 1, m[10], 0, 0, 0, 1]);
    let dirty = this.children.reduce((dirty, child) => child.draw(m) || dirty, false);
    if (this.el && this.el.style.transform !== nextTransform) {
      this.el.style.transform = nextTransform;
      dirty = true;
    }
    return dirty;
  }
}

window.games = {};
const queue = (function() {
  const states = [];
  let timeout = null;
  function nextState() {
    timeout = null;
    if (!states.length) return;
    const state = states.shift();
    if (state == null) {
      document.body.className = '';
    } else {
      game(state);
      document.body.className = state.game ? 'playing' : 'waiting';
      if (state.game) {
        if (!window.onstate) window.games[state.rules.game](state.rules);
        window.onstate(state);
      } else if (window.onstate) {
        window.onstate = null;
        scene.empty();
      }
      if (window.scene.draw())
        timeout = setTimeout(nextState, 1000);
    }
  }
  return function queue(state) { states.push(state); if (!timeout) nextState(); };
}());

function chat({ user, message }) {

}

function room({ id, name, rules: { game, size }, players }) {
  const res = el('room',
    el('span', name),
    el('span', game),
    el('span', `${players.length}/${size}`)
  );
  res.onclick = () => window.socket.emit('join', id);
  return res;
}

const game = (function() {
  const game = document.getElementById('game');
  const leave = document.getElementById('game-leave');
  const start = document.getElementById('game-start');

  leave.onclick = () => window.socket.emit('leave');
  start.onclick = () => window.socket.emit('start');

  return function(state) {
    start.style.display = state.owner.id === state.me.id ? '' : 'none';
    while (game.firstChild)
      game.removeChild(game.firstChild);
    game.append(
      el('room',
        el('span', state.name),
        el('span', state.rules.game),
        el('span', `${state.players.length}/${state.rules.size}`)
      )
    );
  }
}());
const rooms = (function() {
  const list = document.getElementById('room-list');
  return function rooms(rooms) {
    while (list.firstChild)
      list.removeChild(list.firstChild);
    if (rooms.length)
      list.append(...rooms.map(room));
    else
      list.append(el('span', 'No open rooms'));
  };
}());

// window.socket = io();
// window.socket.on('state', queue);
// window.socket.on('rooms', rooms);
// window.socket.on('chat', chat);
// window.socket.on('alert', (msg) => alert(msg));

// (function() {
//   const open = document.getElementById('room-form-open');
//   const game = document.getElementById('room-form-game');
//   const name = document.getElementById('room-form-name');
//   const size = document.getElementById('room-form-size');

//   open.onclick = () => window.socket.emit('open', {
//     game: game.value,
//     name: name.value,
//     size: +size.value,
//   });
// }());
// (function() {
//   const name = document.getElementById('user-name');
//   name.onchange = () => {
//     window.socket.emit('name', name.value);
//     window.localStorage.setItem('name', name.value);
//   };
//   if (name.value = window.localStorage.getItem('name'))
//     window.socket.on('connect', name.onchange);
// }());

// window.scene = new El();
// document.body.onload = () => window.scene.draw();
