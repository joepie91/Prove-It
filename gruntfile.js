'use strict';

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-saucelabs');
    
    var browsers = [
        {
            browserName: 'android',
            platform: 'Linux',
            version: '4.0',
            deviceName: 'Samsung Galaxy S2 Emulator',
            'device-orientation': 'portrait'
        },
        {
            browserName: 'iPhone',
            platform: 'OS X 10.9',
            version: '7.0',
            'device-orientation': 'portrait'
        },
        {
            browserName: 'safari',
            version: '5',
            platform: 'OS X 10.6'
        },
        {
            browserName: 'firefox',
            version: '19',
            platform: 'XP'
        },
        {
            browserName: 'chrome',
            platform: 'XP'
        },
        {
            browserName: 'chrome',
            platform: 'linux'
        },
        {
            browserName: 'internet explorer',
            platform: 'WIN8.1',
            version: '11'
        },
        {
            browserName: 'internet explorer',
            platform: 'WIN8',
            version: '10'
        }
    ];

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    base: '',
                    port: 9999
                }
            }
        },
        
        'saucelabs-mocha': {
            all: {
                options: {
                    urls: ['http://127.0.0.1:9999/test/run.html'],
                    tunnelTimeout: 5,
                    build: process.env.TRAVIS_JOB_ID,
                    concurrency: 3,
                    browsers: browsers,
                    testname: 'Prove-It',
                    tags: ['master']
                }
            }
        }
    });

    grunt.registerTask('sauce', ['connect', 'saucelabs-mocha']);
};
