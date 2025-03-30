
export default class AuthController {

  constructor(authService) {
    this.authService = authService; 
  }

  async register(request , reply) {
    try {
      const { name, email, password } = request.body;
      
      const user = await this.authService.register(name, password, email);

      if (user) return reply.code(400).send({ message: "User already exists" });

      return reply.code(200).send({ message: "Register successful" });
    } catch (error) {
      return reply.code(500).send({ message: "Register unauthorized" });
    }
  };
  
  async login(request, reply) {
    try {

      const { email, password } = request.body;
      const { user, token } = await this.authService.login(email, password);

      return reply.code(200).header("Authorization", `Bearer ${token}`).send({ user });
  
    } catch (error) {
      return reply.code(500).send({ message: error.message });
      
    }
  };
  
  logout(request, reply) {
    try {
      return reply.code(200).send({ message: "Logout successful" });
  
    } catch (error) {
      return reply.code(500).send({ message: "Logout unauthorized" });
      
    }  
  };
}
