module.exports = class UserDto {
  name;
  email;
  id;
  role;
  isActive;
  settings;

  constructor(model) {
    this.name = model.name;
    this.email = model.email;
    this.id = model._id;
    this.role = model.roles;
    this.isActive = model.isActive;
    this.settings = { themeDark: model.settings?.themeDark || false };
  }
};
