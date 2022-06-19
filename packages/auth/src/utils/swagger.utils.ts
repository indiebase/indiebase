import { resolve } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { readJsonSync } from 'fs-extra';
import { writeOpenApiDoc } from '@letscollab/helper';
import { AuthModule } from '../auth/auth.module';
import { RbacModule } from '../rbac/rbac.module';

const pkg = readJsonSync(resolve(process.cwd(), './package.json'));

export const setupAuthApiDoc = (app: INestApplication) =>
  new Promise(async (resolve) => {
    try {
      const authOptions = new DocumentBuilder()
        .setTitle('Auth Api')
        .setDescription('Authz and authn interface')
        .setVersion(pkg.version)
        .addBearerAuth(
          {
            type: 'http',
            scheme: '',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'Enter JWT token',
            in: 'Header',
          },
          'jwt',
        )
        .build();

      const authDoc = SwaggerModule.createDocument(app, authOptions, {
        include: [AuthModule, RbacModule],
      });
      SwaggerModule.setup('auth/openapi', app, authDoc, {
        uiConfig: {
          persistAuthorization: true,
        },
      });
      await writeOpenApiDoc({
        name: 'auth',
        pkgName: pkg.name,
        pkgVersion: pkg.version,
        content: authDoc,
      });
    } catch (e) {
      console.log(e);
    } finally {
      resolve(null);
    }
  });
