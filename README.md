# newman-reporter-customxray
A Newman Custom Xray reporter is designed to easily import your result of end to end test into XRAY.
It display the result of the test on xray for 1 test for a complete collection, with all errors related to a collection.

It's a fork of [newman Junit XRAY](https://www.npmjs.com/package/newman-reporter-junitxray) reporter.

# example

The generation of the xml look like :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<testsuites tests="1">
  <testsuite name="COLLECTION-NAME" tests="11" timestamp="2022-09-06T10:14:11.848" failures="1">
    <testcase classname="CollectionName" name="COLLECTION-NAME">
      <failure type="AssertionFailure" message="expected response to have status code 302 but got 200">
        <![CDATA[Error message: expected response to have status code 302 but got 200.]]>
        <![CDATA[Stacktrace: AssertionError: expected response to have status code 302 but got 200
   at Object.eval sandbox-script.js:1:11).]]>
      </failure>
    </testcase>
  </testsuite>
</testsuites>
```


## Install
> The installation should be global if newman is installed globally, local otherwise. (Replace -g from the command below with -S for a local installation)

```console
$ npm install -g newman-reporter-customxray
```

## Usage
In order to enable this reporter, specify `customxray` in Newman's `-r` or `--reporters` option.

In order to enable this reporter, specify `customxray` in Newman's `-r` or `--reporters` option.

```console
newman run https://www.getpostman.com/collections/631643-f695cab7-6878-eb55-7943-ad88e1ccfd65-JsLv -r customxray --reporter-customxray-export './examples/xray/result.xml' -n 2
```

### Options

#### With Newman CLI

| CLI Option  | Description       |
|-------------|-------------------|
| `--reporter-customxray-export <path>` | Specify a path where the output XML file will be written to disk. If not specified, the file will be written to `newman/` in the current working directory. |

#### With Newman as a Library
The CLI functionality is available for programmatic use as well.

```javascript
const newman = require('newman');

newman.run({
    collection: require('https://www.getpostman.com/collections/631643-f695cab7-6878-eb55-7943-ad88e1ccfd65-JsLv'), // can also provide a URL or path to a local JSON file.
    reporters: 'customxray',
    reporter: {
        junitxray: {
            export: './examples/xray/result.xml', // If not specified, the file will be written to `newman/` in the current working directory.
        }
    },
	iterationCount: 2
}, function (err) {
	if (err) { throw err; }
    console.log('collection run complete!');
});
```

## Compatibility

| **newman-reporter-customxray** | **newman** | **node** |
|:-----------------------------:|:----------:|:--------:|
|            v1.0.0             | >= v4.0.0  | >= v6.x  |

## Troubleshooting

### Reporter not found
The reporter and newman must be installed at the same level, the installation should be global if newman is installed globally, local otherwise.


## License
This software is licensed under Apache-2.0. Copyright Postdot Technologies, Inc. See the [LICENSE](LICENSE) file for more information.