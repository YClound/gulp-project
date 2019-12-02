// 类
class classTest {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name
  }
}

const dog = new classTest('dog')
console.log(dog.name)