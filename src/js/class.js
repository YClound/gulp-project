// ES5中的仿类
const PersonType = function (name) {
  this.name = name;
}

PersonType.prototype.getName = function () {
  return this.name
}

const person = new PersonType("Tom");
console.log(person.name, person instanceof PersonType, person instanceof Object)

// ES6 class类
class PersonClass {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name
  }
}

const personCl = new PersonClass('Tom')
console.log(personCl.name, typeof PersonClass, typeof PersonClass.prototype.getName)