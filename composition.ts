/**
 *  composition allows us to build functional pipe lines
 * Composition allows us to create point-free functions
 * point-free functions are those that don't need to state the arguments / data
 * they need, they are usually created out of partially applied functions
 */
import {  pipe } from 'fp-ts/lib/pipeable';
import { flow } from 'fp-ts/lib/function';
import { compose } from 'ramda';

type Fn = (a: any) => any;

 // simple compose function
const compose1 = (f: Fn, g: Fn) => (x: any) => f (g (x));

// variadic function are those that accept that accept n number (variable) of arguments
// variadic compose function

const compose2 = (...fns: Fn[]) => (arg: any) => {
  return fns.reduce((res, fn) => {
   return res ? fn(res) : fn(arg);
  }, null);
};

const toUpperCase = (x: string) => x.toUpperCase();
const exclaim = (x: string) => `${x}!`;
const addName =  (x: string) => `allan ${x}`;

// point free functions, created out of composition
const shout = compose1(exclaim, toUpperCase);
// point free functions, created out of composition
const shoutAllan = compose2(exclaim, toUpperCase, addName);

// application
function main() {
    shoutAllan('send in the clowns');
    shout('send in the clowns');
}

// FP-ts and ramda have inbuilt  compose functions

// compose from ramda
const shoutAllan2 = compose(exclaim, toUpperCase, addName);

// flow
const shoutAllan3 = flow(exclaim, toUpperCase, addName);

// while using pipe from fp-ts
const shoutAllan4 = (x: string) => pipe(x, exclaim, toUpperCase, addName);
