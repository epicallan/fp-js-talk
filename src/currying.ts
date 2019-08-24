/**
 * Why we need currying
 * makes functional composition easier
 * makes code concise
 * code re-use
 */

interface IPerson {
    name: string;
    age: number;
}

const mkPerson = (name: string) => (age: number): IPerson => {
    return {name, age};
};

function fakePeople(): IPerson[] {
    const longNamePersonFactory = mkPerson("Some longName");
    return [
        longNamePersonFactory(23),
        longNamePersonFactory(45),
        longNamePersonFactory(69)
    ];
}

// example with map example
const setPersonName = (name: string) => (person: IPerson): IPerson => {
    return {...person, name };
};

function fakePeopleWithShortName(): IPerson[] {
    return fakePeople().map(setPersonName("shortName"));
}
