export function base64UrlEncode(buf: Buffer | string) {
	const s = typeof buf === 'string' ? Buffer.from(buf) : buf;

	return s.toString('base64url');
}

export function base64UrlDecode(str: string) {
	return Buffer.from(str, 'base64url').toString();
}
