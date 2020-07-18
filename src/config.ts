export abstract class Config {
  public static mongoUrl = `mongodb+srv://${process.env.mongo_username}:${process.env.mongo_password}@${process.env.mongo_host_name}/${process.env.mongo_db_name}?retryWrites=true&w=majority`;
}

