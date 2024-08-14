// Ejemplo TDD

const agregarUsuario = () => {
  // ...
};

// Test
describe("Agregar usuario", () => {
  it("Agregar usuario", () => {
    // agregarUsuario(); // Falla
    agregarUsuario(); // Funciona
  });
});

// Ejemplo inyeccion de dependencias
class userService {
  // ...
}

// export const userService = new userService(); // ❌

class userController {
  constructor(userService) {}

  getAll() {
    this.userService.getAll();
  }
}
