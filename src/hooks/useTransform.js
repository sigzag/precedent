import { useContext } from 'react';
import { mat4, vec3, quat } from 'gl-matrix';
import { context } from '../components/Transform';

mat4.removeRotation = function removeRotation(out, a) {
	const vec = vec3.create();
	mat4.getTranslation(vec, a);
	mat4.fromTranslation(out, vec);
	return out;
}

export default function useTransform(transforms = []) {
	const source = useContext(context) || mat4.create();
	const matrix = transforms.reduce(
		(matrix, [action, ...args]) => mat4[action](matrix, matrix, ...args),
		mat4.clone(source),
	);
	return [matrix, toSVGTransform(matrix)];
}

function toNativeTransform(matrix) {
	const translation = mat4.getTranslation(vec3.create(), matrix);
	const rotation = getEulerAngle(vec3.create(), mat4.getRotation(quat.create(), matrix));
	return [
		{ translateX: translation[0] },
		{ translateY: translation[1] },
		{ rotateX: rotation[0] },
		{ rotateY: rotation[1] },
		{ rotateZ: rotation[2] },
	];
}
function toSVGTransform(matrix) {
	const translation = mat4.getTranslation(vec3.create(), matrix);
	const rotation = getEulerAngle(vec3.create(), mat4.getRotation(quat.create(), matrix));
	return `
		translate(${round(translation[0])} ${round(translation[1])})
		rotate(${round(deg(rotation[0]))} 0 0)
	`;
}
function toCSSTransform(matrix) {
	return `
		translate(-50%, -50%)
		matrix3d(${matrix.map(round).join(',')})
	`;
}

function getEulerAngle(out, a) {
	out[0] = Math.atan2(
		2 * (a[0] * a[3] + a[1] * a[2]),
		1 - 2 * (a[0] * a[0] + a[1] * a[1]),
	);

	const sp = 2 * (a[1] * a[3] - a[0] * a[2]);
	out[1] =
		Math.abs(sp) >= 1
			? Math.PI / 2 * Math.sign(sp)
			: Math.asin(sp);

	out[0] = Math.atan2(
		2 * (a[2] * a[3] + a[0] * a[1]),
		1 - 2 * (a[1] * a[1] + a[2] * a[2]),
	);

	return out;
}

function round(value) {
	return Math.round(value * 100000) / 100000;
}

function deg(rad) {
	return 180 * rad / Math.PI;
}
