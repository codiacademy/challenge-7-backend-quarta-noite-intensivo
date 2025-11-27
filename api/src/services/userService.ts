import { UserRepository } from "../repositories/userRepository";
import { CreateUserDTO, UpdateUserDTO } from "../schemas/userSchema";
import { hashPassword } from "../utils/hash";

const repo = new UserRepository();

export class UserService {
  async createUser(data: CreateUserDTO) {
    const exists = await repo.findByEmail(data.email);
    if (exists) 
      throw Object.assign(new Error("E-mail já registrado"), { statusCode: 409 });
      const hashed = await hashPassword(data.password);
      return repo.create({ ...data, password: hashed });
  }
  async listUsers(){
    return repo.findAll(); 
   }
  async getUser(id: number) {
     const u = await repo.findById(id); 
     if (!u) 
      throw Object.assign(new Error("Usuário não encontrado"), { statusCode: 404 });
       return u; 
  }     
  async updateUser(id: number, data: UpdateUserDTO) {
    await this.getUser(id);
      if (data.password) data.password = await hashPassword(data.password);
        return repo.update(id, data);
  }
  async deleteUser(id: number) { 
    await this.getUser(id);
     return repo.delete(id); 
 }    
}
