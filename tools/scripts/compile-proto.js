const { execSync } = require('child_process');
const glob = require('glob');
const path = require('path');
require('fs');

const reset = '\x1b[0m';
const red = '\x1b[31m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const blue = '\x1b[34m';

const PROTO_ROOT = path.join(
	__dirname,
	'..',
	'..',
	'libs/api/shared/utils/src/lib/proto'
);

const protoFiles = glob.sync(`${PROTO_ROOT}/**/*.proto`);

if (protoFiles.length === 0) {
	console.log(
		yellow + `There is no .proto files found in ${PROTO_ROOT}.` + reset
	);
	process.exit(0);
}

console.log(
	blue + `Files found for compilation: ${protoFiles.length}` + reset + '\n'
);

protoFiles.forEach(file => {
	const dirName = path.dirname(file);

	const relativeProtoPath = path.relative(process.cwd(), file);

	const command = [
		'protoc',
		'--plugin=protoc-gen-ts_proto=".\\node_modules\\.bin\\protoc-gen-ts_proto.cmd"',
		`-I ${dirName}`,
		`${relativeProtoPath}`,
		`--ts_proto_out=${dirName}`,
		'--ts_proto_opt=nestJs=true,package=omit',
	].join(' ');

	try {
		execSync(command, { stdio: 'inherit' });
		console.log(`Generated Typescript file for: ${path.basename(file)}`);
	} catch (e) {
		console.log(
			red +
				`Compilation dropped with an error. Filename: ${path.basename(file)}` +
				reset
		);
	}
});

console.log('\n' + green + 'All gRPC contracts successfully compiled!' + reset);
