import { ApiProperty } from "@nestjs/swagger";
export class User {
    id?: string;
    email: string;
    password: string;
    role?: 'admin' | 'superadmin' | 'user';
}

export class CreateUserDto implements Omit<User, "id"> {
    @ApiProperty({ name: 'User email', type: String }) email: string;
    password: string;
    role?: 'admin' | 'superadmin' | 'user';
}
