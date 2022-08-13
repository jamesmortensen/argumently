// args.spec.js

process.env.TESTING = true;

const Args = require('../args');

const Tester = new (function () {

    function beforeEach() {

    }

    var testCases = this;
    const failures = [];

    testCases.checkHelpArg = function () {
        const args = new Args(['-h']);
        if (args.has('-h'))
            console.log('pass');
        else {
            console.error('FAIL!');
            failures[new Error().stack.match('testCases\.(.+?) ')[1]] = 'Expected to find -h argument';
        }
    }

    testCases.checkGetHelpArgumentMethodForTrue = function () {
        const args = new Args(['-h']);
        if (args.hasHelp())
            console.log('pass');
        else {
            console.error('FAIL!');
            failures[new Error().stack.match('testCases\.(.+?) ')[1]] = 'Expected getHelpArgument to be true';
        }
    }

    testCases.checkGetHelpArgumentMethodForFalse = function () {
        const args = new Args(['-k', '-j']);
        if (!args.hasHelp())
            console.log('pass');
        else {
            console.error('FAIL!');
            failures[new Error().stack.match('testCases\.(.+?) ')[1]] = 'Expected getHelpArgument to be false';
        }
    }

    testCases.checkForStart = function () {
        const args = new Args(['--start']);
        if (args.has('--start'))
            console.log('pass');
        else {
            console.error('FAIL!');
            failures[new Error().stack.match('testCases\.(.+?) ')[1]] = 'Expected to find --start argument';
        }
    }

    testCases.checkForAddRevision = function () {
        const args = new Args(['--edit-url', '--add-revision']);
        if (args.has('--add-revision') && args.has('--edit-url'))
            console.log('pass');
        else {
            console.error('FAIL!');
            failures[new Error().stack.match('testCases\.(.+?) ')[1]] = 'Expected to find --add-revision and --edit-url args';
        }
    }

    testCases.checkForMissing = function () {
        const args = new Args(['--edit-url', '--add-revision']);
        if (!args.has('--add-revisio'))
            console.log('pass');
        else {
            console.error('FAIL!');
            failures[new Error().stack.match('testCases\.(.+?) ')[1]] = 'Expected to NOT find --add-revisio'
        }
    }

    testCases.trueIfNoArgsPresent = function () {
        const args = new Args(['--missing', '--not-valid']);
        args.has('--edit');
        args.has('--done1');
        args.has('--done2');
        args.has('--done3');
        args.has('--done4');

        const noMatches = args.hasNoMatchingArguments();
        if (noMatches)
            console.log('pass');
        else {
            console.error('FAIL!');
            failures[new Error().stack.match('testCases\.(.+?) ')[1]] = 'Expected no arguments to match';
        }
    }

    testCases.falseIfArgsPresent = function () {
        const args = new Args(['--edit', '--not-valid']);
        args.has('--edit');
        args.has('--done1');
        args.has('--done2');
        args.has('--done3');
        args.has('--done4');

        const hasMatches = !args.hasNoMatchingArguments();
        if (hasMatches)
            console.log('pass');
        else {
            console.error('FAIL!');
            failures[new Error().stack.match('testCases\.(.+?) ')[1]] = 'Expected at least one argument to match';
        }
    }

    testCases.falseIfArgsPresentAgain = function () {
        const args = new Args(['--missing', '--done3', '--not-here']);
        args.has('--edit');
        args.has('--done1');
        args.has('--done2');
        args.has('--done3');
        args.has('--done4');

        const hasMatches = !args.hasNoMatchingArguments();
        if (hasMatches)
            console.log('pass');
        else {
            console.error('FAIL!');
            failures[new Error().stack.match('testCases\.(.+?) ')[1]] = 'Expected at least one argument to match';
        }
    }

    testCases.checkForValueOfLongFormArgument = function () {
        const args = new Args(['--name', 'value']);
        if (args.get('--name') === 'value')
            console.log('pass');
        else {
            console.error('FAIL!');
            failures[new Error().stack.match('testCases\.(.+?) ')[1]] = 'Expected to retrieve "value" for --name arg';
        }
    }

    testCases.checkForValueOfShortFormArgument = function () {
        const args = new Args(['-n', 'value']);
        if (args.get('-n') === 'value')
            console.log('pass');
        else {
            console.error('FAIL!');
            failures[new Error().stack.match('testCases\.(.+?) ')[1]] = 'Expected to retrieve "value" for -n arg';
        }
    }

    testCases.checkForNamesExample = function () {
        const args = new Args(['--name', '--first', 'James', '--last', 'Mortensen']);
        if (checkMultipleArgsTestCase(args))
            console.log('pass');
        else {
            console.error('FAIL!');
            failures[new Error().stack.match('testCases\.(.+?) ')[1]] = 'Expected to retrieve multiple values';
        }
    }

    testCases.checkForNamesExampleWhereOrderDoesNotMatter = function () {
        const args = new Args(['--last', 'Mortensen', '--name', '--first', 'James']);
        if (checkMultipleArgsTestCase(args))
            console.log('pass');
        else {
            console.error('FAIL!');
            failures[new Error().stack.match('testCases\.(.+?) ')[1]] = 'Expected to retrieve multiple values';
        }
    }

    function checkMultipleArgsTestCase(args) {
        if (args.has('--name')) {
            const first = args.get('--first');
            const last = args.get('--last');
            return (first === 'James' && last === 'Mortensen');
        }
    }


    for (var testCase in testCases) {
        console.log('Running testCase ' + testCase);
        testCases[testCase]();
    }

    if (Object.entries(failures).length > 0) {
        console.error('Failed test cases: ');
        Object.entries(failures).forEach((failure) => {
            console.error(`${failure[0]}: ${failure[1]}`);
        });
        process.exitCode = 1;
    }
})();
