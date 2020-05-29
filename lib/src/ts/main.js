var isDone = false;
var hasDone = true;
var decLiteral = 6;
var hexLiteral = 0xf00d;
var binaryLiteral = 0b1010;
var octalLiteral = 0o744;
decLiteral = null;
decLiteral = undefined;
var arrayNumber = [1, 2, 3], arrayString = ['1', '2', '3'], arrayObject = [{ name: '1', person: '2' }, 1, '2'], arrayDefined = [{ name: 'Tome', age: 12 }];
var person = { name: '1', person: '2' };
var greeter = function (person, name) {
    return { person, name: name || '' };
};
var user = `Jane User`;
let a1;
let b2 = { x: 1, y: 2 };
let c3;
console.log(greeter(user, 'json').name);
var Color;
(function (Color) {
    Color[Color["Red"] = 2] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var colorNumber = Color.Green;
var colorName = Color[2];
console.log(colorNumber, colorName, 'enmu');
var Month;
(function (Month) {
    Month[Month["Jan"] = 0] = "Jan";
    Month[Month["Feb"] = 1] = "Feb";
    Month[Month["Mar"] = 2] = "Mar";
})(Month || (Month = {}));
var month = [0, 1, 2];
function createSquare(config) {
    let newSquare = { color: "white", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
let p1 = { x: 10, y: 20 };
p1.x = 5;
console.log(createSquare({ color: "black" }), 'interface');
let mySearch;
mySearch = function (source, subString) {
    let result = source.search(subString);
    return result > -1;
};
var Student = class {
    constructor(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = `${firstName} ${middleInitial} ${lastName}`;
    }
};
var greeter1 = function (person) {
    return "Hello, " + person.firstName + " " + person.lastName;
};
var user1 = new Student('a', 'b', 'c');
console.log(greeter1(user1));
let add = (a, b) => a + b;
console.log(add(1, 2), '函数类型接口');
class PersonClass {
    constructor(name) {
        this.name = name;
        this.name = name;
    }
    run() {
        console.log(this.sex);
    }
}
class Man extends PersonClass {
    constructor(name, color) {
        super(name);
        this.color = color;
    }
    getAge() {
        console.log(this.age, '继承Person类');
    }
}
const man = new Man('Tome', 'white');
man.name = "J";
console.log(man.name, man.color, '类');
var animal = {};
function identity(arg) {
    return arg;
}
let myIdentity = identity;
let myIdentity2 = identity;
console.log(myIdentity(2), identity('2'));
class GenericNumber {
}
let myGenericNumber = new GenericNumber();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };
function loggingIdentity(arg) {
    console.log(arg.length);
    return arg;
}
loggingIdentity({ length: 2 });
class Animal2 {
    constructor(name) {
        this.name = name;
    }
}
class Cat extends Animal2 {
    constructor(name) {
        super(name);
    }
    getName() {
        console.log('3333333');
    }
}
var cat = new Cat('cat');
cat.getName();
console.log(cat.name, '11111111');
function loggingIdentity2(arg) {
    console.log(arg.length);
    return arg;
}
loggingIdentity2({ length: 2 });
let a2;
let b1;
a2 = 'c';
b1 = 2;
let a3 = { a: '11111', b: 2, c: false };
var type1 = 'string';
var type2 = 'object';
var type3 = 'string';
type3 = 'number';
console.log(type1, type2, type3);
let myAdd = function (x, ...otherParams) {
    console.log(otherParams, '2222222');
    return x + otherParams[0];
};
myAdd(1, 2, 3, 4);
let fibonacci = [1, 2];
class Log {
    run(value) {
        console.log(value);
        return value;
    }
}
let log1 = new Log();
log1.run(1);
let log2 = new Log();
log2.run('1');
console.log('222222');
const objChoose = {
    obj: {}
};
console.log(SomeType.number);
//# sourceMappingURL=main.js.map