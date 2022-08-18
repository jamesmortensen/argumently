// args.js

class Args {

    #checkedArgs = [];
    #argsArr;

    constructor(argsArr) {
        if (argsArr === undefined)
            throw new Error('Must pass process.argv or an array of arguments to the Args constructor...');
        this.#argsArr = argsArr;
    }

    hasHelp() {
        return this.#argsArr.includes('-h') || this.#argsArr.includes('--help');
    }

    has(arg) {
        this.#checkedArgs.push(arg);
        return this.#argsArr.includes(arg);
    }

    get(arg) {
        return this.#argsValue(this.#argsArr, arg, arg, '');
    }

    #argsValue(argsArr, shortForm, longForm, defaultValue) {
        return argsArr.reduce((acc, elem, index, array) => {
            if ((array[index - 1] === shortForm || array[index - 1] === longForm))
                acc = elem;
            return acc;
        }, defaultValue);
    }

    hasNoMatchingArguments() {
        return this.#checkedArgs.reduce((acc, arg, index, arr) => {
            if(this.#argsArr.includes(arg))
                acc = false;
            return acc;
        }, true);
    }

    getAll() {
        return this.#argsArr.map((arg) => arg);
    }
}

module.exports = Args;
