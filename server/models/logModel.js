import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

const LogSchema = new mongoose.Schema({
	applicationCode: {
		type: String
	},
	request: {
        type: String
    },
	response: {
        type: String
    },
	errorStatus: {
        type: String
    },
	errorDescription: {
        type: String
    },
	isResolved: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String
    },
    createdAt: {
		type: Date
    },
    createdBy: {
        type: String
    }
});

LogSchema.method({
});

LogSchema.statics = {
	get(id) {
        return this.findById(id)
            .execAsync().then((log) => {
                if (log) {
                    return log;
                }
                const err = new APIError('No such log exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
	},
	list({ skip = 0, limit = 50 } = {}) {
        return this.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .execAsync();
	}
};

export default mongoose.model('Log', LogSchema);