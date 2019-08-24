/**
 * Functors are data types that can be mapped
 * Functor mapping takes a function a -> b and a factor f a and returns f b
 * Functors laws are Identity and Composition
 */

type MapFn <A, B> = (a: A) => B;

class Maybe<T> {
    public static nothing<T>() {
       return new Maybe<T>(null);
    }

    public static just<T>(val: T) {
        return new Maybe<T>(null);
     }

    private value: T;

    constructor(x: T) {
        this.value = x;
    }

    public isNothing() {
        return this.value === null;
    }

    public map<B>(fn: MapFn<T, B>): Maybe<B>  {
      return this.value ? new Maybe(fn(this.value)) : new Maybe(null);
    }

    public fromMaybe(defaultValue: T): T  {
        return this.value ? this.value : defaultValue;
    }
}

interface IPerson {
    name: string;
    age: number;
}

// transformation
function upperCaseName(person: IPerson): IPerson {
    return {...person, name: "ALLAN"};
}

function makeMiddleAged(person: IPerson): IPerson {
    return {...person, age: 40};
}

function transformPerson(maybePerson: Maybe<IPerson>): Maybe<IPerson> {
  return maybePerson
      .map(upperCaseName)
      .map(makeMiddleAged);
}

function getPerson(_name: string): Promise<Maybe<IPerson>> {
    // assume db call
    return Promise.resolve(Maybe.just({age: 28, name: "allan"}));
}

function getOldPerson(person: IPerson): Maybe<IPerson> {
    return person.age < 18 ? Maybe.nothing() : Maybe.just(person);
}

// separation of pure and impure to illustrate code purity
async function main() {
    const person = await getPerson("allan");
    return transformPerson(person);
}
