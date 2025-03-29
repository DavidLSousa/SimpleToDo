
export default class AuthMiddleware {
  constructor(authService) {
    this.authService = authService;
  }

  async verifyToken(request, reply, done) {
    try {
      const token = request.headers.authorization.split(" ")[1];

      if (!token) throw new Error("No token provided");

      const [ user ] = await this.authService.verifyToken(token);
      request.user = user;

      done();
    } catch (error) {
      console.log('error')
      console.log(error.message)
      return reply.code(401).send({ message: "Unauthorized" });
    }
  }
}