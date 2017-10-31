import {createSnapshot, deleteSnapshot, createConnection, bringOnline} from './testUtilities';
import databaseConfig from '../../src/databaseConfig';
import MssqlSnapshot from '../../src/MssqlSnapshot';

describe('when restoring and no snapshot name is supplied', function() {
	let target = new MssqlSnapshot(databaseConfig());
	it('throws an error indicating the issue', () => {
		const fn = () => target.restore();
		fn.should.throw('No snapshot name supplied.');
	});
});

describe('when restoring from a snapshot that exists', function() {
	let target = null;
	const snapshotName = 'mssql-snapshot-testdb-when-restoring';

	beforeEach(() => {
		target = new MssqlSnapshot(databaseConfig());
		return createSnapshot(snapshotName);
	});

	afterEach(() => deleteSnapshot(snapshotName));

	it('it restores successfully', () => {
		return target.restore(snapshotName).should.be.fulfilled;
	});
});

describe('when restoring from a snapshot that exists and active connections exist to the source db', function() {
	let target = null;
	const snapshotName = 'mssql-snapshot-testdb-when-restoring';

	beforeEach(() => {
		target = new MssqlSnapshot(databaseConfig());
		return Promise.all([createSnapshot(snapshotName), createConnection]);
	});

	afterEach(() => Promise.all([deleteSnapshot(snapshotName), bringOnline]));

	it('it restores successfully', () => {
		return target.restore(snapshotName).should.be.fulfilled;
	});
});
