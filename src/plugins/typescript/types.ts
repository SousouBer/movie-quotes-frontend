export type ValidationSchemaAuth = {
  username_or_email?: string;
  username?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  remember?: string;
};

export type SchemaProfile = {
  avatar?: file;
  username?: string;
  password?: string;
  password_confirmation?: string;
};
