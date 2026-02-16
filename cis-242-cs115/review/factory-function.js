function createUser(name, role) {
  return {
    name,
    role,
    greet() { return `Hi, I'm ${name}, a ${role}`; }
  };
}

const u1 = createUser('Ana', 'admin');
const u2 = createUser('Luis', 'student');
// Two independent objects from the same "factory"
console.log(u1.greet());
console.log(u2.greet()); 

// instead of using new : delegate creation to a specialized function