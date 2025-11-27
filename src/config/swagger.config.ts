import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/user/user.module";
import { BranchModule } from "src/branch/branch.module";
import { FloorModule } from "src/floor/floor.module";
import { RoomModule } from "src/room/room.module";

export function setupSwagger(app: INestApplication) {

    const usersConfig = new DocumentBuilder()
        .setTitle('Users API')
        .setDescription('API documentation for the Users project')
        .setVersion('1.0')
        .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        }, 'access-token')
        .build();
    const usersDocument = SwaggerModule.createDocument(app, usersConfig, { include: [UserModule] });
    SwaggerModule.setup('users/docs', app, usersDocument);

    const authConfig = new DocumentBuilder()
        .setTitle('Auth API')
        .setDescription('API documentation for the Auth project')
        .setVersion('1.0')
        .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        }, 'access-token')
        .build();
    const authDocument = SwaggerModule.createDocument(app, authConfig, { include: [AuthModule] });
    SwaggerModule.setup('auth/docs', app, authDocument);

    const branchesConfig = new DocumentBuilder()
        .setTitle('Branches API')
        .setDescription('API documentation for the Branches project')
        .setVersion('1.0')
        .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        }, 'access-token')
        .build();
    const branchesDocument = SwaggerModule.createDocument(app, branchesConfig, { include: [BranchModule] });
    SwaggerModule.setup('branches/docs', app, branchesDocument);

    const floorsConfig = new DocumentBuilder()
        .setTitle('Floors API')
        .setDescription('API documentation for the Floors project')
        .setVersion('1.0')
        .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        }, 'access-token')
        .build();
    const floorsDocument = SwaggerModule.createDocument(app, floorsConfig, { include: [FloorModule] });
    SwaggerModule.setup('floors/docs', app, floorsDocument);

    const roomsConfig = new DocumentBuilder()
        .setTitle('Rooms API')
        .setDescription('API documentation for the Rooms project')
        .setVersion('1.0')
        .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        }, 'access-token')
        .build();
    const roomsDocument = SwaggerModule.createDocument(app, roomsConfig, { include: [RoomModule] });
    SwaggerModule.setup('rooms/docs', app, roomsDocument);
}