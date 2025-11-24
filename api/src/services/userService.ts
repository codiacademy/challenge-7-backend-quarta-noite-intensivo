import { UserRepository } from "../repositories/userRepository";
import { CreateUserInput, UpdateUserInput } from "../schemas/userSchema";
import { hashPassword } from "../utils/hash";

const repo = new UserRepository();

export class UserService {
  async createUser(data: CreateUserInput) {
    const exists = await repo.findByEmail(data.email);
    if (exists) 
      throw Object.assign(new Error("Email already registered"), { statusCode: 409 });
    const hashed = await hashPassword(data.password);
    return repo.create({ ...data, password: hashed });
  }
  async listUsers()
   { return repo.findAll(); 
   }
  async getUser(id: number) {
     const u = await repo.findById(id); 
     if (!u) 
      throw Object.assign(new Error("User not found"), { statusCode: 404 });
       return u; 
  }     
  async updateUser(id: number, data: UpdateUserInput) {
    await this.getUser(id);
    if (data.password) data.password = await hashPassword(data.password);
    return repo.update(id, data);
  }
  async deleteUser(id: number) { 
    await this.getUser(id);
     return repo.delete(id); 
 }    
}
