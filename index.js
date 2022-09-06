var _ = require("lodash"),
    xml = require("xmlbuilder"),
    moment = require("moment"),
    CustomXrayReporter;

const SEPARATOR = " / ";

/**
 * A function that creates raw XML to be written to Newman JUnit reports.
 *
 * @param {Object} newman - The collection run object, with a event handler setter, used to enable event wise reporting.
 * @param {Object} reporterOptions - A set of JUnit reporter run options.
 * @param {String=} reporterOptions.export - Optional custom path to create the XML report at.
 * @returns {*}
 */
CustomXrayReporter = function(newman, reporterOptions) {
    newman.on("beforeDone", function() {
        var report = _.get(newman, "summary.run.executions"),
            collection = _.get(newman, "summary.collection"),
            cache,
            collName;
        var date = moment(new Date())
            .local()
            .format("YYYY-MM-DDTHH:mm:ss.SSS");

        if (!report) {
            return;
        }
        
        let xmlContent = xml.create("testsuites", { version: "1.0", encoding: "UTF-8" });
        //xmlContent.att("name", collection.name);
        xmlContent.att("tests", "1");


        var testSuite = xmlContent.ele("testsuite");

        testSuite.att("name",collection.name);
        testSuite.att("className",collName);
        testSuite.att("tests", _.get(newman, "summary.run.stats.tests.total", "unknown"));
        testSuite.att("timestamp", date);

        var testCase = testSuite.ele("testcase");
        collName = _.upperFirst(_.camelCase(collection.name).replace(/\W/g, ""));
        testCase.att("classname", collName);
        testCase.att("name", collection.name);

        var failures = _.get(newman, "summary.run.failures")
        var countFailure = 0;
        _.forEach(failures,function (err){
            var failure = testCase.ele("failure");
            failure.att("type","AssertionFailure");
            failure.att("message", err.error.message);
            failure.dat("Error message: " + err.error.message + ".");
            failure.dat("Stacktrace: " + err.error.stack + ".");
            countFailure++;
        });
        testSuite.att("failures",countFailure);

        newman.exports.push({
            name: "custom-reporter-customxray",
            default: "newman-run-report-xray.xml",
            path: reporterOptions.export,
            content: xmlContent.end({
                pretty: true,
                indent: "  ",
                newline: "\n",
                allowEmpty: false,
            }),
        });
    });
};

module.exports = CustomXrayReporter;
