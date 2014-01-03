# grunt-kinvey

> A Grunt plugin that wraps the [kinvey] (http://devcenter.kinvey.com/rest/tutorials/business-logic-revisions) command line tool for managing business logic.

*Note:* This plugin does NOT include the `kinvey` command line tool.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-kinvey --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-kinvey');
```

Additionally, the `kinvey` command line tool must be installed seperately and available to Grunt from within your path.

## The "kinvey" task

### Overview
In your project's Gruntfile, add a section named `kinvey` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  kinvey: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.app
Type: `String`

The kinvey application to operate on.

#### options.email
Type: `String`
Default value: `process.env['KINVEY_EMAIL']`

The email address used to login to Kinvey. By default the `KINVEY_EMAIL` environment variable is read.

#### options.password
Type: `String`
Default value: `process.env['KINVEY_PASSWORD']`

The password used to login to Kinvey. By default the `KINVEY_PASSWORD` environment variable is read.

#### options.quiet
Type: `boolean`
Default value: true

Avoids interactive mode and additional data on the console.

#### options.debug
Type: `boolean`
Default value: false

Enables debug mode of the kinvey script which results in debug info being printed to the console.

### Target specific properties

#### target.environment
Type: `String`

The Kinvey environment that this target should be run against (eg: 'development', 'production').

#### target.command
Type: `String`

The command to execute for this target. Currently supported commands are `refresh` and `deploy`. For documentation on these commands, please run `kinvey --help` from the command line.

### Usage Examples

#### Real-time editing of business logic

In this example, you could use the [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch) plugin to automatically deploy your locally modified code to kinvey whenever a file is saved.

```js
grunt.initConfig({

  kinvey: {
    options: {
      app: 'myapp'
    },
    pushdev: {
      command: "deploy",
      environment: "development"
    }
  },
  
  watch: {
    businesslogic:{
      files: 'business-logic/**/*.js',
      tasks: ['kinvey:pushdev'],
      options: {
        event: ['changed']
       }
     }
   }

});
```


#### Deploying from one environment to another

In this example, there are two targets present. One for 'pulling' down the latest version of the code from an environment called 'development' and another for 'pushing' the code to an environment called 'production'.

```js
grunt.initConfig({
  kinvey: {
    options: {
      app: 'myapp'
    },
    pulldev: {
      command: "refresh",
      environment: "development"
    },
    pushprod: {
      command: "deploy",
      environment: "production"
    }
  }
});
```

Now if you wanted to deploy code from the development environment to the production environment, you would simply run:

```
grunt kinvey:pulldev kinvey:pushprod:"optional commit message"
```

Targets that use the `deploy` command can accept an optional commit message for the deploy which is specified after the target name.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

