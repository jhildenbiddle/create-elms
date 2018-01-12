// Dependencies
// =============================================================================
import createElms from '../src/create-elms';
import { expect } from 'chai';


// Suite
// =============================================================================
describe('Browser environment', function() {
    // Helpers
    // -------------------------------------------------------------------------
    function getHTML(elms) {
        const elmArray  = Array.isArray(elms) ? elms : typeof elms === 'string' ? [...document.querySelectorAll(elms)] : elms.length ? [...elms] : [elms];
        const outerHTML = elmArray.map(elm => elm.outerHTML).join('');

        return outerHTML;
    }

    function test(htmlOrElms, expectedHTML, assertionTitle) {
        const html = typeof htmlOrElms === 'string' ? htmlOrElms : getHTML(htmlOrElms);

        expect(html).to.equal(expectedHTML);
    }

    // Tests: Rendering
    // -------------------------------------------------------------------------
    describe('Rendering', function() {
        it('Renders elm from a string', function() {
            const html = '<p></p>';
            const elms = createElms(html);

            test(elms, html);
        });

        it('Renders elms from multiple string', function() {
            const html = '<p></p>'.repeat(2);
            const elms = createElms(html);

            test(elms, html);
        });

        it('Renders elm from an object', function() {
            const elms = createElms({ tag : 'p' });
            const exp  = '<p></p>';

            test(elms, exp);
        });

        it('Renders elms from multiple objects', function() {
            const elms = createElms([
                { tag : 'p' },
                { tag : 'p' }
            ]);
            const exp = '<p></p>'.repeat(2);

            test(elms, exp);
        });

        it('Renders elms from mixed strings and objects', function() {
            const html = '<p></p>';
            const elms = createElms([
                html,
                { tag : 'p' }
            ]);
            const exp = html.repeat(2);

            test(elms, exp);
        });
    });

    // Tests: Content
    // -------------------------------------------------------------------------
    describe('Content', function() {
        it('Inserts HTML content', function() {
            const html = '<p></p>';
            const exp  = '<p><a href="#">link</a></p>';

            let elms = createElms(html, { html: '<a href="#">link</a>' });

            test(elms, exp, 'string');

            elms = createElms({ tag: 'p', html: '<a href="#">link</a>' });

            test(elms, exp, 'object');

            elms = createElms({ tag: 'p' }, { html: '<a href="#">link</a>' });

            test(elms, exp, 'object (shared options)');

            elms = createElms({ tag: 'p', html: '<a href="#">link</a>' }, { html: 'XXX' });

            test(elms, exp, 'object (ignored shared options)');
        });

        it('Inserts text content', function() {
            const html = '<p></p>';
            const exp  = '<p>&lt;a href="#"&gt;link&lt;/a&gt;</p>';

            let elms = createElms(html, { text: '<a href="#">link</a>' });

            test(elms, exp, 'string');

            elms = createElms({ tag: 'p', text: '<a href="#">link</a>' });

            test(elms, exp, 'object');

            elms = createElms({ tag: 'p' }, { text: '<a href="#">link</a>' });

            test(elms, exp, 'object (shared options)');

            elms = createElms({ tag: 'p', text: '<a href="#">link</a>' }, { text: 'XXX' });

            test(elms, exp, 'object (ignored shared options)');
        });
    });

    // Tests: Attributes
    // -------------------------------------------------------------------------
    describe('Attributes', function() {
        // NOTE: Setting multiple attributes should be tested, but this is difficult
        // due to browsers not rendering attributes in the same order. To avoid
        // failing tests due to attribute order, only a single attribute is tested.
        it('Sets attributes on elements', function() {
            const html = '<p></p>';
            const exp  = '<p class="myclass"></p>';

            let elms = createElms(html, { attr: { class: 'myclass' } });

            test(elms, exp, 'string');

            elms = createElms({ tag: 'p', attr: { class: 'myclass' } });

            test(elms, exp, 'object');

            elms = createElms({ tag: 'p' }, { attr: { class: 'myclass' } });

            test(elms, exp, 'object (shared options)');

            elms = createElms({ tag: 'p', attr: { class: 'myclass' } }, { attr: { class: 'XXX' } });

            test(elms, exp, 'object (ignored shared options)');
        });

        it('Sets attributes only on top-level elements', function() {
            const html = '<p><b>Text</b></p>';
            const elms = createElms(html, { attr: { class: 'myclass' } });
            const exp  = '<p class="myclass"><b>Text</b></p>';

            test(elms, exp);
        });
    });

    // Tests: Insert elements
    // -------------------------------------------------------------------------
    describe('Inserting', function() {
        const html = '<li data-test="true"></li>';

        let rootElm;
        let firstElm;
        let lastElm;

        // Hooks
        // ---------------------------------------------------------------------
        before(function() {
            rootElm = document.body.appendChild(document.createElement('ul'));
            firstElm = rootElm.appendChild(document.createElement('li'));
            lastElm = rootElm.appendChild(document.createElement('li'));
            // => <ul><li></li><li></li></ul>
        });

        // Remove previous test elements
        beforeEach(function() {
            const testNodes = document.querySelectorAll('[data-test]');

            for (let i = 0; i < testNodes.length; i++) {
                testNodes[i].parentNode.removeChild(testNodes[i]);
            }
        });

        // Tests
        // ---------------------------------------------------------------------
        it('Appends to element', function() {
            const exp = `<ul><li></li><li></li>${html}</ul>`;

            createElms(html, { appendTo: rootElm });
            test(rootElm, exp);
        });

        it('Appends to multiple elements', function() {
            const exp = `<ul><li>${html}</li><li>${html}</li></ul>`;

            createElms(html, { appendTo: rootElm.children });
            test(rootElm, exp);
        });

        it('Prepends to elements', function() {
            const exp = `<ul>${html}<li></li><li></li></ul>`;

            createElms(html, { prependTo: rootElm });
            test(rootElm, exp);
        });

        it('Prepends to multiple elements', function() {
            const exp = `<ul><li>${html}</li><li>${html}</li></ul>`;

            createElms(html, { prependTo: rootElm.children });
            test(rootElm, exp);
        });

        it('Inserts before elements', function() {
            const exp = `<ul><li></li>${html}<li></li></ul>`;

            createElms(html, { insertBefore: lastElm });
            test(rootElm, exp);
        });

        it('Inserts before multiple elements', function() {
            const exp = `<ul>${html}<li></li>${html}<li></li></ul>`;

            createElms(html, { insertBefore: rootElm.children });
            test(rootElm, exp);
        });

        it('Inserts after elements', function() {
            const exp = `<ul><li></li>${html}<li></li></ul>`;

            createElms(html, { insertAfter: firstElm });
            test(rootElm, exp);
        });

        it('Inserts after multiple elements', function() {
            const exp = `<ul><li></li>${html}<li></li>${html}</ul>`;

            createElms(html, { insertAfter: rootElm.children });
            test(rootElm, exp);
        });
    });

    // Tests: Return values
    // -------------------------------------------------------------------------
    describe('Return values', function() {
        it('Returns array of elements (default)', function() {
            const html = '<p></p>';
            const elms = createElms(html);

            expect(elms).to.be.an('array');
        });

        it('Returns array of HTML strings', function() {
            const html = '<p></p>';
            const elms = createElms(html, { returnHtml: true });

            expect(elms[0]).to.be.a('string');
            expect(elms.join('')).to.equal(html);
        });
    });
});
