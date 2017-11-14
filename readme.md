# About
This is a simple build process for static sites that I set up for myself. It uses gulp to:
- watch files and inject updates automatically
- compile pug templates to HTML
- compile and compress SASS
- automatically add vendor prefixes
- transpile (using Babel) and uglify Javascript

## Usage
- Run `npm install` to install dev dependencies
- Use `npm start` or `gulp watch` to watch files during development.
- Use `gulp` to create a build in the dist folder

## Potential Improvements
- Add clean-up task
- Image optimization
