import { describe, it, expect } from 'vitest'
import * as userService from '../../services/unitService'


describe('User Service', () => {
it('should hash password correctly', async () => {
const user = await userService.register({
name: 'Test',
email: 'a@a.com',
password: '123456'
})


expect(user.password).not.toBe('123456')
})
})