const User = require('../models/mongo/users');

export class MongoHelper {

  public async validateUser(req: any) {
    const token = req.headers.authorization || '';
    try {
      return await User.find({ email: token }).then((response: any) => {
        if (response.length > 0) {
          return { isUserLogged: true };
        }
        return { isUserLogged: false };
      });
    } catch (error) {
      return { isUserLogged: false };
    }
  }

}
