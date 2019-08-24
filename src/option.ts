import { some, none, Option, fold, map, chain } from "fp-ts/lib/Option";
import {  pipe } from "fp-ts/lib/pipeable";

/**
 * why we need to work with options
 * avoid un-necessary conditional logic, making code simpler
 * make code more declarative, shows intent (self document)
 * forces you to think about error handling from the start
 * facilitates pattern matching
 */
interface IPerson {
  name: string;
  age: number;
}

function getPerson(_name: string): Option<IPerson> {
  // assume a DB fetch
  return some({name: "Allan", age: 28 });
}

// pattern matching example
function maybeGetName(maybePerson: Option<IPerson>): Option<string> {
  return pipe(
    maybePerson,
    // fold for pattern matching
    fold(() => none, (person) => some(person.name))
  );
}

// transformation
function upperCaseName(person: IPerson): IPerson {
  return {...person, name: "ALLAN"};
}

function makeMiddleAged(person: IPerson): IPerson {
  return {...person, age: 40};
}

// transformation pipeline
function transformPerson(): Option<IPerson> {
  return pipe(
    getPerson("allan"),
    map(upperCaseName),
    map(makeMiddleAged),
  );
}

function getPersonJob(person: IPerson): Option<string> {
  // assume a DB call
  return some("engineer");
}

// composition and code branching
function chainExample(): Option<string> {
  return pipe(
    getPerson("allan"),
    chain(getPersonJob)
  );
}
