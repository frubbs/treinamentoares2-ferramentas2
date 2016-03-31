module.exports = function(grunt){
    grunt.initConfig({
        "stubby":{
            default:{
                options:{
                    persistent:false,
                    watch:"tmp/stub.yaml"
                },
                files:[{
                    src: ["tmp/stub.yaml"]
                }]
            }
        },
        concat:{
            default:{
                src:["stubs/*"],
                dest: "tmp/stub.yaml"
            }
        },
        watch:{
            default:{
                files:["stubs/*"],
                tasks:["concat"]
            }
        },
        connect: {
            default: {
                options: {
                    port: 9002,
                    middleware: function(connect, options, defaultMiddleware) {
                        var proxy = require("grunt-connect-proxy/lib/utils").proxyRequest
                        return [proxy].concat(defaultMiddleware);
                    }
                },
                proxies: [{
                    context: "/rest",
                    host: "localhost",
                    port: "8882"
                }]
            }
        }
    })
    grunt.loadNpmTasks("grunt-stubby")
    grunt.loadNpmTasks("grunt-contrib-concat")
    grunt.loadNpmTasks("grunt-contrib-watch")
    grunt.loadNpmTasks('grunt-contrib-connect')
    grunt.loadNpmTasks('grunt-connect-proxy')



    grunt.registerTask("default", ["concat", "stubby", "configureProxies:default","connect", "watch"])
}