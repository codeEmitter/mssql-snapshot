import sql from 'seriate';
import databaseConfig from './databaseConfig';

const config = databaseConfig();

export function sourceDbName(value) {
	return {
		val: value,
		type: sql.NVARCHAR(50)
	};
}

export const query = {
    val: '',
    type: sql.VARCHAR(300)
};

export function snapshotName(snapshotName) {
    return {
        val: snapshotName,
        type: sql.VARCHAR(100)
    };
}

export function logicalName(logicalName) {
	return {
		val: logicalName,
		type: sql.VARCHAR(100)
	};
}

export function snapshotPath(snapshotStoragePath) {
    return {
        val: snapshotStoragePath,
        type: sql.VARCHAR(200)
    };
}
