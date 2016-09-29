'use strict';

let math = require('../src/lib/math');
let expect = require('chai').expect;

describe('Testing math.js lib.', function() {
  it('add should add to parameters', function(done) {
      let a = math.add(2, 1);
      expect(a).to.equal(3);
      done();
  });

  it('sub should substract parameters', function(done) {
    expect(math.sub(2, 1)).to.equal(1);
    done();
  });
});
