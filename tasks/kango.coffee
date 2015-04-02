module.exports = (grunt) ->
    "use strict"

    {exec} = require "child_process"
    path = require "path"

    grunt.registerMultiTask "kango", "Kango extensions.", () ->
        done = @async()
        options = @options
            output: "app/output"
            pack: false

        command = [
            "python"
            path.resolve __dirname, "..", "kango/kango.py"
            "build"
            "--output-directory #{options.output}"
        ]

        command.push("--no-pack") unless options.pack
        command.push options.tmp or options.output

        exec command.join(" "), (error, stdout, stderr) ->
            if error?
                grunt.fail.fatal error
                false

            done()
