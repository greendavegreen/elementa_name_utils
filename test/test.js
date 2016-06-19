var assert = require('chai').assert;
var nu = require('../nameUtils.js');

describe('nameUtils', function() {

  describe('#isValidAsset()', function () {
    it('should return true for the standard components', function () {
      assert.equal(true, nu.isValidAsset("elementa.000001.xml"));
      assert.equal(true, nu.isValidAsset("elementa.000001.pdf"));
      assert.equal(true, nu.isValidAsset("elementa.000001.mobi"));
      assert.equal(true, nu.isValidAsset("elementa.000001.epub"));
      assert.equal(true, nu.isValidAsset("elementa.000001.json"));
    });

    it('should return true for revisions of the standard components', function () {
      assert.equal(true, nu.isValidAsset("elementa.000001_r1.xml"));
      assert.equal(true, nu.isValidAsset("elementa.000001_r0.pdf"));
      assert.equal(true, nu.isValidAsset("elementa.000001_r2.mobi"));
      assert.equal(true, nu.isValidAsset("elementa.000001_r7.epub"));
      assert.equal(true, nu.isValidAsset("elementa.000001_r3.json"));
    });
    it('should return false for the others', function () {
      assert.equal(false, nu.isValidAsset("elementa.000001.doc"));
      assert.equal(false, nu.isValidAsset("elementa.0000001.xml"));

      assert.equal(false, nu.isValidAsset("elementa"));
      assert.equal(false, nu.isValidAsset("000001"));
      assert.equal(false, nu.isValidAsset("xml"));

      assert.equal(false, nu.isValidAsset('elementa.000001'));
      assert.equal(false, nu.isValidAsset('elementa.xml'));
      assert.equal(false, nu.isValidAsset('000001.xml'));

      assert.equal(false, nu.isValidAsset(""));
      assert.equal(false, nu.isValidAsset(null));
    });
  });

  describe('#reverse()', function () {
    it('should reverse the string', function () {
      assert.equal('123456', nu.reverse('654321'));
    });
    it('should avoid crashing with bad input', function() {
      assert.equal('', nu.reverse(''));
      assert.equal('', nu.reverse(null));
    });
  });

  describe('#pref()', function () {
    it('should reverse the article number and maintain the journal tag', function () {
      assert.equal('123456.blarf', nu.pref("blarf.654321.xml"));
    });
    it('if first two tags are not proper, return empty string', function () {
      assert.equal('', nu.pref(""));
      assert.equal('', nu.pref("a.1234567.xml"));
    });
  });


  describe('#suff()', function () {
    it('handle valid article format names', function () {
      assert.equal('xml', nu.suff("a.000001.xml"));
      assert.equal('pdf', nu.suff("a.000001.pdf"));
      assert.equal('mobi', nu.suff("a.000001.mobi"));
      assert.equal('epub', nu.suff("a.000001.epub"));
      assert.equal('json', nu.suff("a.000001.json"));
    });

    it('handles revisions', function() {
      assert.equal('xml', nu.suff("a.000001_r1.xml"));
      assert.equal('pdf', nu.suff("a.000001_r4.pdf"));
    });

    it('handle valid article figure names', function () {
      assert.equal('f001.tif', nu.suff("a.000001.f001.tif"));
    });

    it('handle valid article supplemental item names', function () {
      assert.equal('s001.graffle', nu.suff('a.000001.s001.graffle'));
    });

    it('should avoid crashing with bad input', function() {
      assert.equal('', nu.suff(''));
      assert.equal('', nu.suff(null));
    });

  });

  describe('#journalTag()', function () {
    it('should return true for the standard components', function () {
      assert.equal('elementa', nu.journalTag("elementa.000001.xml"));
    });

    it('should return true for revisions of the standard components', function () {
      assert.equal('elementa', nu.journalTag("elementa.000001_r1.xml"));
    });

    it('should return true for revisions of the standard components', function () {
      assert.equal('', nu.journalTag("elementa"));
    });

  });


  describe('#articleNumber()', function () {
    it('should return true for the standard components', function () {
      assert.equal(1, nu.articleNumber("elementa.000001.xml"));
    });

    it('should return true for revisions of the standard components', function () {
      assert.equal(1, nu.articleNumber("elementa.000001_r1.xml"));
    });

    it('should return true for revisions of the standard components', function () {
      assert.equal(0, nu.articleNumber("elementa"));
    });
  });

});
