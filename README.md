# Argumently

A simple utility to build a CLI tool and invoke different functions based on arguments passed in at runtime.


## Example usage

### Check for presence of an argument

If running the following command:

```
$ cli-tool --somearg
```

Then we check for the argument as follows:

cli-tool:
```
const args = require('argumently');

if(args.has('--somearg'))
  console.log('--somearg is present');
else
  console.log('--somearg is not present');
```

### Key/Value pair arguments

If we want to pass in key/value pair arguments, here's an example:

```
$ cli-tool --name James
```

cli-tool:
```
const args = require('argumently');

if(args.has('--name'))
  console.log(`Hello ${args.get('--name')}`);
else
  console.log('--name argument missing');
```

### Multiple Key/Value pairs with parent flag argument

Here is a slightly more complex example where we check for --first and --last only if --name is present:

```
$ cli-tool --name --first James --last Mortensen
```

cli-tool:
```
const args = require('argumently');

if(args.has('--name')) {
  const first = args.get('--first');
  const last = args.get('--last');
  console.log(`Hello ${first} ${last}`);
} else
  console.log('--name argument missing');
```

Note that order only matters for key/value pairs. The --name flag can go anywhere, and the order of --last and --first can be changed, and the above code still produces the same output:

```bash
$ cli-tool --last Mortensen --name --first James
```

### Check if "Help" argument is present

To show help information, we can check for the presence of -h or --help with:

```
if(args.hasHelp())
  console.log('show help details here');
```

One way to do this is to create a file called help.js, like so:

```javascript
// help.js

console.log(`
Usage: 
    cli-tool [[-h|--help] | [--name | [--first {name}] | [--last {name}] ] | [--somearg]]

    -h -> Help (this output)
    --name -> Check for --first and --last names
    --somearg -> Enable XYZ
    
    Example usage:
    cli-tool --name --first James --last Mortensen

    Outputs:  Hello James Mortensen
    
    `);
process.exit(0);
```

Then load this file whenever --help is present:

```javascript
if (args.hasHelp())
    require('./help.js');  // prints help details and exits
```

### Track which arguments have been checked

The `has` method returns a boolean true if the argument is present and false if it's not, but we also keep track of which arguments are checked, so we can do something like this:

```bash
$ cli-tool --arg1 --arg2 --arg3
```

cli-tool:
```
const args = require('argumently');

args.has('--arg1');
args.has('--arg2');

if(args.hasNoMatchingArguments())  // resolves to false
  console.log('no arguments match');
else
  console.log('arguments found');  // outputs "arguments found"
```

cli-tool:
```
const args = require('argumently');

args.has('--arg4');
args.has('--arg5');

if(args.hasNoMatchingArguments())  // resolves to true
  console.log('no arguments match');  // outputs "no arguments match"
else
  console.log('arguments found');
```

This is useful for defaulting to showing the help page if no valid arguments are present:

```
if (args.hasNoMatchingArguments()) {
    console.warn('No matching arguments provided. See --help for instructions:');
    require('./help.js');
}
```


## Tests

Run `npm test` to run the tests, as well as to see some examples. We use node for testing so that the argv0 base is still node, instead of something like mocha or jest, etc.


## License

Copyright (c) James Mortensen, 2022 MIT License
