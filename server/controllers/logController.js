import Log from '../models/logModel';

function load(req, res, next, id) {
	Log.get(id).then((log) => {
		req.log = log;// eslint-disable-line no-param-reassign
		return next();
	}).error((e) => next(e));
}

function list(req, res, next) {
	const { limit = 50, skip = 0 } = req.query;
	Log.list({ limit, skip }).then((logs) => res.json(logs))
        .error((e) => next(e));
}

function create(req, res, next) {
	const log = new Log({
                applicationCode: req.body.applicationCode,
                request: req.body.request,
                response: req.body.response,
                errorStatus: req.body.errorStatus,
                errorDescription: req.body.errorDescription,
                isResolved: req.body.isResolved,
                priority: req.body.priority,
                createdAt: req.body.createdAt,
                createdBy: req.body.createdBy,
	});

	log.saveAsync()
        .then((savedLog) => res.json(savedLog))
        .error((e) => next(e));
}

export default { load, create, list };
