// 布尔类型
var isDone: boolean = false;
var hasDone = true;

// 数字
var decLiteral: number = 6;
var hexLiteral: number = 0xf00d;
var binaryLiteral: number = 0b1010;
var octalLiteral: number = 0o744;
// @ts-ignore
decLiteral = null;
// @ts-ignore
decLiteral = undefined;

// 数组
interface IArrayInter {
  name: string,
  age: number
}
var arrayNumber: number[] = [1, 2, 3],
  arrayString: string[] = ['1', '2', '3'],
  arrayObject: any[] = [{ name: '1', person: '2' }, 1, '2'],
  arrayDefined: IArrayInter[] = [{ name: 'Tome', age: 12 }];

// 对象
interface Person {
  name: string,
  person: string
}
var person: Person = { name: <string>'1', person: '2' as string };
var greeter = function (person: string, name?: string): Person {
  return { person, name: name || '' };
}
var user: string = `Jane User`;
let a1: {}; // Ok
let b2: object = { x: 1, y: 2 }; // Error
let c3: Object; // Ok

// @ts-nocheck
// user = 22;
console.log(greeter(user, 'json').name);

// 枚举
enum Color { Red = 2, Green = 1, Blue }
var colorNumber: Color = Color.Green;
var colorName: string = Color[2];
console.log(colorNumber, colorName, 'enmu');

const enum Month { Jan, Feb, Mar }
var month = [Month.Jan, Month.Feb, Month.Mar]

// 接口
interface SquareConfig {
  color?: string; // 可属性
  width?: number;
  readonly x?: number,
  [propName: string]: any; // 额外的属性检查
}

// 一个接口可以继承多个接口，创建出多个接口的合成接口。
interface SquareConfig1 extends SquareConfig {
  test?: string
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}


let p1: SquareConfig = { x: 10, y: 20 };
// @ts-ignore
p1.x = 5; // error!

console.log(createSquare({ color: "black" }), 'interface');


// 函数类型
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}

// 类 在构造函数的参数上使用public等同于创建了同名的成员变量 TypeScript里的类只是JavaScript里常用的基于原型面向对象编程的简写。
interface Person1 {
  firstName?: string,
  lastName: string,
  [propName: string]: any
}

var Student = class {
  fullName: string;
  constructor(public firstName: string, public middleInitial: string, public lastName: string) {
    this.fullName = `${firstName} ${middleInitial} ${lastName}`
  }
}
var greeter1 = function (person: Person1) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

var user1 = new Student('a', 'b', 'c');

console.log(greeter1(user1))

// 函数类型接口
// interface Add {
//   (x: number, y: number): number
// }

type Add = (x: number, y: number) => number
let add: Add = (a, b) => a + b
console.log(add(1, 2), '函数类型接口')


// 类
class PersonClass {
  // 构造函数参数添加修饰等同于在类中定义该属性，这样使代码更为简洁
  constructor(public name: string) {
    this.name = name
  }
  readonly type: 'person'
  private sex: 'F'
  protected age: 20
  run() {
    console.log(this.sex)
  }
}

class Man extends PersonClass {
  constructor(name: string, color: string) {
    super(name)
    this.color = color
  }
  color: string
  getAge() {
    console.log(this.age, '继承Person类')
  }
}

const man = new Man('Tome', 'white');
man.name = "J";
console.log(man.name, man.color, '类')

type Animal = {
  name: string,
  color: string,
  [key: string]: any
}

var animal = {} as Animal;

// 泛型接口
interface IIdentity {
  <T>(arg: T): T
}
// 把泛型参数当作整个接口的一个参数, 这样我们就能清楚的知道使用的具体是哪个泛型类型
interface IIdentity2<T> {
  (arg: T): T
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: IIdentity = identity;
let myIdentity2: IIdentity2<string> = identity;
console.log(myIdentity(2), identity('2'))

// 泛型类
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };

// 泛型约束
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

loggingIdentity({ length: 2 })

// 抽象类
abstract class Animal2 {
  public name: string
  public constructor(name: string) {
    this.name = name
  }
  abstract getName(): void
}

class Cat extends Animal2 {
  constructor(name: string) {
    super(name);
  }
  getName() {
    console.log('3333333')
  }
}

var cat: Animal2 = new Cat('cat');
cat.getName()
console.log(cat.name, '11111111')

// 泛型约束
interface Lengthwise {
  length: number;
}

function loggingIdentity2<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

loggingIdentity2({ length: 2 })


let a2: 'a' | 'b' | 'c';
let b1: 1 | 2 | 3;
a2 = 'c'
b1 = 2;

// 映射类型
interface Obj {
  a: string
  b: number
  c: boolean
}

// 接口所有属性设置成只读
type ReadonlyObj = Readonly<Obj>

let a3: ReadonlyObj = { a: '11111', b: 2, c: false };

// 条件类型
type TypeName<T> =
  T extends string ? 'string' :
  T extends number ? 'number' :
  T extends boolean ? 'boolean' :
  T extends undefined ? 'undefined' :
  T extends Function ? 'function' :
  'object'

type T1 = TypeName<string> // type T1 = "string"
type T2 = TypeName<string[]> // type T2 = "object"
type T3 = TypeName<string | number> // type T3 = "string" | "number"

var type1: T1 = 'string';
var type2: T2 = 'object';
var type3: T3 = 'string';
type3 = 'number'
console.log(type1, type2, type3)

// 函数类型校验
let myAdd = function (x: number, ...otherParams: number[]) {
  console.log(otherParams, '2222222')
  return x + otherParams[0];
}

myAdd(1, 2, 3, 4)

interface NumberArray {
  [index: number]: number
}
let fibonacci: NumberArray = [1, 2]


class Log<T> {
  run(value: T) {
    console.log(value)
    return value
  }
}

let log1 = new Log<number>()
log1.run(1) // 1

let log2 = new Log()
log2.run('1') // '1'

console.log('222222');

const objChoose = {
  obj: {

  }
}

// console.log(objChoose?.obj?.a?.b)

console.log(SomeType.number)