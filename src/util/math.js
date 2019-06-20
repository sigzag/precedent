const { cos, sin, PI, floor, round } = Math;

const transform = (m) => `translate(-50%, -50%) matrix3d(${Array(16).fill(null).map((_, i) => round(m[i % 4 * 4 + floor(i / 4)] * 100000) / 100000).join(',')})`;

const multiply = ([
  a11, a21, a31, a41,
  a12, a22, a32, a42,
  a13, a23, a33, a43,
  a14, a24, a34, a44,
], [
  b11, b21, b31, b41,
  b12, b22, b32, b42,
  b13, b23, b33, b43,
  b14, b24, b34, b44,
]) => [
  a11 * b11 + a21 * b12 + a31 * b13 + a41 * b14, a11 * b21 + a21 * b22 + a31 * b23 + a41 * b24, a11 * b31 + a21 * b32 + a31 * b33 + a41 * b34, a11 * b41 + a21 * b42 + a31 * b43 + a41 * b44,
  a12 * b11 + a22 * b12 + a32 * b13 + a42 * b14, a12 * b21 + a22 * b22 + a32 * b23 + a42 * b24, a12 * b31 + a22 * b32 + a32 * b33 + a42 * b34, a12 * b41 + a22 * b42 + a32 * b43 + a42 * b44,
  a13 * b11 + a23 * b12 + a33 * b13 + a43 * b14, a13 * b21 + a23 * b22 + a33 * b23 + a43 * b24, a13 * b31 + a23 * b32 + a33 * b33 + a43 * b34, a13 * b41 + a23 * b42 + a33 * b43 + a43 * b44,
  a14 * b11 + a24 * b12 + a34 * b13 + a44 * b14, a14 * b21 + a24 * b22 + a34 * b23 + a44 * b24, a14 * b31 + a24 * b32 + a34 * b33 + a44 * b34, a14 * b41 + a24 * b42 + a34 * b43 + a44 * b44,
];
// const translate = (dist, axis) => [1, 0, 0, axis === 0 ? dist : 0, 0, 1, 0, axis === 1 ? dist : 0, 0, 0, 1, axis === 2 ? dist : 0, 0, 0, 0, 1];
const rotate = (rad, axis) => {
  const c = cos(rad * PI);
  const s = sin(rad * PI);
  return [
    axis === 0 ? 1 : c,   axis === 2 ? -s : 0,  axis === 1 ? s : 0,   0,
    axis === 2 ? s : 0,   axis === 1 ? 1 : c,   axis === 0 ? -s : 0,  0,
    axis === 1 ? -s : 0,  axis === 0 ? s : 0,   axis === 2 ? 1 : c,   0,
    0,                    0,                    0,                    1,
  ];
};
const translate = ([dx, dy, dz], [x, y, z], [r11, r21, r31, r41, r12, r22, r32, r42, r13, r23, r33]) => [
  x + r11 * dx + r21 * dy + r31 * dz,
  y + r12 * dx + r22 * dy + r32 * dz,
  z + r13 * dx + r23 * dy + r33 * dz,
];

const v3 = () => [0, 0, 0];
const m4 = (p, r) => {
  const m = r ? [...r] : [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  if (p) {
    m[3] += p[0];
    m[7] += p[1];
    m[11] += p[2];
  }
  return m;
}
