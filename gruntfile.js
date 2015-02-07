'use strict';

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-saucelabs');
    
    var browsers = [
        {
            browserName: 'android',
            platform: 'Linux',
            version: '4.4',
            deviceName: 'Samsung Galaxy S4 Emulator',
            'device-orientation': 'portrait'
        },
        {
            browserName: 'android',
            platform: 'Linux',
            version: '4.0',
            deviceName: 'Samsung Galaxy S2 Emulator',
            'device-orientation': 'portrait'
        },
        {
            browserName: 'iPhone',
            platform: 'OS X 10.10',
            version: '8.0',
            'device-orientation': 'portrait'
        },
        {
            browserName: 'iPhone',
            platform: 'OS X 10.9',
            version: '6.0',
            'device-orientation': 'portrait'
        },
        {
            browserName: 'iPad',
            platform: 'OS X 10.10',
            version: '8.0',
            'device-orientation': 'portrait'
        },
        {
            browserName: 'iPad',
            platform: 'OS X 10.9',
            version: '6.0',
            'device-orientation': 'portrait'
        },
        {
            browserName: 'safari',
            version: '8',
            platform: 'OS X 10.10'
        },
        {
            browserName: 'safari',
            version: '5',
            platform: 'OS X 10.6'
        },
        {
            browserName: 'chrome',
            platform: 'WIN8.1'
        },
        {
            browserName: 'chrome',
            version: '26',
            platform: 'XP'
        },
        {
            browserName: 'firefox',
            platform: 'WIN8.1'
        },
        {
            browserName: 'firefox',
            version: '4',
            platform: 'XP'
        },
        {
            browserName: 'opera',
            version: '11.64',
            platform: 'XP'
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
