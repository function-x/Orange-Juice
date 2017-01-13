const co = require('co');

const UserRetrieveHelper = require('../helpers/user_retrieve');

function UserRetrieveSpec() {
    it('Normally Retrieve', function(done) {
        co(function*(){
            let res = yield UserRetrieveHelper();
            res.body.code.should.equal(0);
            done();
        }).catch(done);
    });
}

module.exports = UserRetrieveSpec;