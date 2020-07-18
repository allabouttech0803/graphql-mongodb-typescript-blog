import mongoose = require("mongoose");

export class MongoDB {

  public mongoUrl: string = 'mongodb://127.0.0.1:27017/next-universal-tutorial';

  constructor() {
    this.mongoSetup();
  }

  private mongoSetup(): void {
    (<any>mongoose).Promise = global.Promise;
    mongoose.connect(this.mongoUrl).then(() => {
      console.log('Connected to MongoDb');
    }).catch((err) => {
      console.log(`There is error in conneting Mongo DB ${err}`);
    });
  }

}
