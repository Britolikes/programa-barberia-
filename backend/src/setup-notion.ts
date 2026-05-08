import { Client } from '@notionhq/client';
import dotenv from 'dotenv';

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });

async function createDatabases(parentPageId: string) {
  try {
    console.log('⏳ Creando bases de datos en Notion...');

    // 1. Tabla de Clientes
    const customersDb = await notion.databases.create({
      parent: { type: 'page_id', page_id: parentPageId },
      title: [{ type: 'text', text: { content: '💈 Clientes Registrados' } }],
      properties: {
        'Nombre': { title: {} },
        'Email': { email: {} },
        'Rol': { select: { options: [{ name: 'Cliente', color: 'blue' }, { name: 'Barbero', color: 'purple' }] } }
      }
    });
    console.log('✅ Tabla Clientes creada. ID:', customersDb.id);

    // 2. Tabla de Barberos
    const barbersDb = await notion.databases.create({
      parent: { type: 'page_id', page_id: parentPageId },
      title: [{ type: 'text', text: { content: '✂️ Plantilla de Barberos' } }],
      properties: {
        'Nombre': { title: {} },
        'Especialidad': { rich_text: {} },
        'Google Sync': { checkbox: {} }
      }
    });
    console.log('✅ Tabla Barberos creada. ID:', barbersDb.id);

    // 3. Tabla de Reservas
    const bookingsDb = await notion.databases.create({
      parent: { type: 'page_id', page_id: parentPageId },
      title: [{ type: 'text', text: { content: '📅 Agenda de Citas' } }],
      properties: {
        'Cliente': { title: {} },
        'Servicio': { select: { options: [
          { name: 'Corte Clásico', color: 'green' },
          { name: 'Afeitado Real', color: 'red' },
          { name: 'Perfilado', color: 'yellow' }
        ] } },
        'Fecha': { date: {} },
        'Barbero': { select: { options: [{ name: 'Marco', color: 'blue' }, { name: 'Elena', color: 'pink' }] } }
      }
    });
    console.log('✅ Tabla Reservas creada. ID:', bookingsDb.id);

    console.log('\n🚀 ¡Todo listo!');
  } catch (error: any) {
    console.error('❌ Error creando las tablas:', error.body || error.message);
  }
}

createDatabases('35aede28a41c802685e2f3f1904ec981');
