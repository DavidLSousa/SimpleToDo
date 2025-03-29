
export default class AuthController {

  constructor(authService) {
    this.authService = authService; 
  }

  async register(request , reply) {
    try {
      const { name, email, password } = request.body;
      
      await this.authService.register(name, password, email);

      return reply.code(200).send({ message: "Register successful" });
    } catch (error) {
      return reply.code(500).send({ message: "Register unauthorized" });
    }
  };
  
  login(rquest, reply) {
    try {
      return reply.code(200).send({ message: "Login successful" });
  
    } catch (error) {
      return reply.code(500).send({ message: "Login unauthorized" });
      
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
