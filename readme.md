# About
This is a simple build process for static sites that I set up for myself. It uses gulp to:
- watch files and inject updates automatically
- compile pug templates to HTML
- compile and compress SASS
- optimize images
- automatically add vendor prefixes
- transpile (using Babel) and uglify Javascript

## Usage
- Run `npm install` to install dev dependencies
- Use `npm start` or `gulp` to create a build and watch files during development.
- Use `gulp clear` to clear compressed images from the cache

CAUTION: The dist folder will be wiped each time the gulp task is started to prevent stale files from hanging around.
