// Dependencies
// ======================================================./=======================
const createElms = require('../dist/create-elms');
const chai       = require('chai');
const jsdom      = require('jsdom');


// Constants & Variables
// =============================================================================
const expect    = chai.expect;
const { JSDOM } = jsdom;


// Suite
// =============================================================================
describe('Node environment', function() {
    const dom        = new JSDOM();
    const jsDocument = dom.window.document;

    // Tests
    // ---------------------------------------------------------------------
    it('Renders elms from mixed strings and objects', function() {
        const html = '<p></p>';
        const elms = createElms([html, { tag: 'p' }], { returnHtml: true }, jsDocument);

        expect(elms).to.deep.equal([html, html]);
    });
});
