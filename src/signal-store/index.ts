import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  url,
  template,
  mergeWith,
  move
} from '@angular-devkit/schematics';
import * as path from 'path';
import { strings } from '@angular-devkit/core';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function signalStore(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // Parse the "name" option (which might include a path, e.g., "path/to/MyComponent")
    const parsed = path.parse(_options.name);
    const targetDir = parsed.dir || '';
    const baseName = parsed.name; // e.g. "MyComponent"

    // Add properties to options for use in the templates.
    // Using a property like "baseName" allows you to reference it in your file names and file content.
    _options.baseName = baseName;

    // Create a template source from the files in our /files folder.
    const sourceTemplates = apply(url('./files'), [
      // Process template files and inject options and string helpers (like dasherize, classify, etc.)
      template({
        ..._options,
        ...strings
      }),
      // Move the generated files to the target directory
      move(targetDir)
    ]);

    return mergeWith(sourceTemplates)(tree, _context);
  };
}
