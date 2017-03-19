// Load Module Dependencies
var EventEmitter = require('events').EventEmitter;
var remedyDal = require('../dal/remedy');
var debug = require('debug')('tenadam-api');

/**
 * post remedy
 */
exports.createRemedy = function createRemedy(req, res, next) {
    debug('creating remedies..');

    var workflow = new EventEmitter();
    var body =req.body;

    workflow.on('createRemedy', function createRemedy(){
        req.checkBody('name','name is empty').notEmpty();

        var errs = req.validationErrors();
        if(errs){
            res.status(404);
            res.json(errs);
        }else{
            workflow.emit('remedy');
        }
    });
    workflow.on('remedy', function remedy(){
        remedyDal.create({ name: body.name}, function createcb(err, remedy){
            if(err){ return next(err);}

            res.json(remedy);
        });
    });
    workflow.emit('createRemedy');
};

/**
 * Get remedy
 */
exports.getremedy = function getremedy(req, res, next) {
    debug('getting a remedy:', req.params._id);

    var remedyId = req.params.remedyId;
    remedyDal.get(remedyId, function cb(err, remedy) {
        if (err) {
            return next(err);
        }
        if (remedy) {
            res.json(remedy);

        } else {
            res.status(404);
            res.json({
                error: true,
                message: 'remedy Not Found!',
                status: 404
            });

        }
    });
};


// /**
//  * Update a remedy by id
//  */
// exports.updateremedy = function updateremedy(req, res, next) {
//     debug('updating remedy:', req.params._id);

//     var body = req.body;
//     var _id = req.params._id;

//     remedyDal.update({ _id: remedy._id }, function cb(err, remedy) {
//         if (err) {
//             return next(err);
//         }
//         if (!remedy._id) {
//             res.status(404);
//             res.json({
//                 message: 'remedy not found'
//             });
//         }

//         res.json(remedy);
//     });
// };



/**
 * Get remedys
 */
exports.getremedys = function getremedys(req, res, next) {
    debug('getting remedys');

    remedyDal.getCollection({}, function getremedys(err, remedys) {
        if (err) {
            return next(err);
        }
        res.json(remedys);
    });
};

// /**
//  * delete remedy
//  */
// exports.removeremedy = function removeremedy(req, res, next) {
//     debug('deletting a remedy:', req.params._id);

//     var query = { _id: req.params._id };
//     remedyDal.delete(query, function deletecb(err, remedy) {
//         if (err) {
//             return next(err);
//         }
//         res.json(remedy || {});
//     });
// };

// no operation(noop) function
exports.noop = function noop(req, res, next) {
    res.json({
        message: 'To Implemented!'
    });
};