import fs from 'fs';
import path from 'path';

export interface User {
  id: number;
  userId: string;
  password: string;
  name: string;
  role: 'General User' | 'Admin';
}

const usersFilePath =
  path.join(process.cwd(), 'users.xml');

const defaultUsers: User[] = [
  {
    id: 1,
    userId: 'user01',
    password: 'user123',
    name: 'Ananya Sharma',
    role: 'General User'
  },
  {
    id: 2,
    userId: 'admin01',
    password: 'admin123',
    name: 'Admin User',
    role: 'Admin'
  }
];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function loadUsers(): User[] {

  if (!fs.existsSync(usersFilePath)) {

    saveUsers(defaultUsers);

    return [...defaultUsers];
  }

  const xml =
    fs.readFileSync(
      usersFilePath,
      'utf-8'
    );

  const userMatches =
    xml.match(
      /<user>[\s\S]*?<\/user>/g
    );

  if (!userMatches) {
    return [];
  }

  return userMatches.map(
    (userXml): User => {

      const getValue =
        (tag: string): string => {

          const match =
            userXml.match(
              new RegExp(
                `<${tag}>([\\s\\S]*?)<\\/${tag}>`
              )
            );

          return match
            ? match[1]
            : '';
        };

      return {
        id: Number(
          getValue('id')
        ),

        userId:
          getValue('userId'),

        password:
          getValue('password'),

        name:
          getValue('name'),

        role:
          getValue('role') as
          'General User' | 'Admin'
      };
    }
  );
}

export function saveUsers(
  currentUsers: User[]
): void {

  const userXml =
    currentUsers
      .map(
        (user) => `
  <user>
    <id>${user.id}</id>
    <userId>${escapeXml(user.userId)}</userId>
    <password>${escapeXml(user.password)}</password>
    <name>${escapeXml(user.name)}</name>
    <role>${escapeXml(user.role)}</role>
  </user>`
      )
      .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>

<users>
${userXml}

</users>
`;

  fs.writeFileSync(
    usersFilePath,
    xml,
    'utf-8'
  );
}

export const users: User[] =
  loadUsers();