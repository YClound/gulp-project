function create(Con, ...args) {
    var obj = {};
    Object.setPrototypeOf(obj, Con.prototype);
    var result = Con.apply(obj, args);
    return result instanceof Object ? result : obj;
}
function Test(name, age) {
    this.name = name;
    this.age = age;
}
Test.prototype.sayName = function () {
    console.log(this.name, this.age);
};
var t = create(Test, 'yarn', 20);
t.sayName();
//# sourceMappingURL=prototype.js.map