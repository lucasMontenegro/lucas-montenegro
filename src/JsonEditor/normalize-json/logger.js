import normalize from './normalize';
import denormalize from './denormalize';
import * as stringifyObject from 'stringify-object';
import data from './data.json';

const stringifyOptions = {
  indent: '  ',
  singleQuotes: false
};
/**/
console.log('Raw:');
console.log(stringifyObject(data, stringifyOptions));
console.log();
/**
console.log('Normalized:');
console.log(stringifyObject(normalize(data), stringifyOptions));
console.log();
/**/
console.log('Normalized and then Denormalized:');
console.log(stringifyObject(denormalize(normalize(data)), stringifyOptions));
console.log();
/**/