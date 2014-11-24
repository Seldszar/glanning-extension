var exec = require('child_process').exec;
var path = require('path');

module.exports = function (grunt) {

    grunt.registerMultiTask('kango', 'Kango extensions.', function () {
        var done = this.async();
        var options = this.options({
            output: 'app/output',
            pack: false
        });

        var command = [
            'python',
            path.resolve(__dirname, '..', 'kango/kango.py'),
            'build',
            '--output-directory ' + options.output
        ];

        if (!options.pack) {
            command.push('--no-pack');
        }

        command.push(options.tmp || options.output);

        exec(command.join(' '), function (error, stdout, stderr) {
            if (error !== null) {
                grunt.fail.fatal(error);
                return false;
            }
            done();
        });
    });

};
