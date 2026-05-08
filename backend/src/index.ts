import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import { Client } from '@notionhq/client';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const TOKENS_PATH = path.join(__dirname, '../tokens.json');

app.use(cors());
app.use(express.json());

// Clientes API
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

let tokenStore: Record<string, any> = {};
if (fs.existsSync(TOKENS_PATH)) {
  tokenStore = JSON.parse(fs.readFileSync(TOKENS_PATH, 'utf8'));
}

// ENDPOINTS GOOGLE...
app.get('/auth/google', (req, res) => {
  const { barberId } = req.query;
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar.events', 'https://www.googleapis.com/auth/calendar'],
    prompt: 'consent',
    state: barberId as string
  });
  res.json({ url });
});

app.get('/auth/google/callback', async (req, res) => {
  const { code, state } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code as string);
    tokenStore[state as string] = tokens;
    fs.writeFileSync(TOKENS_PATH, JSON.stringify(tokenStore, null, 2));
    res.redirect(`http://localhost:5173?auth=success&barberId=${state}`);
  } catch (error) { res.status(500).send('Error'); }
});

// NUEVO: CREAR CITA EN GOOGLE Y NOTION
app.post('/calendar/create-event', async (req, res) => {
  const { summary, description, startDateTime, endDateTime, barberId, customerName, serviceName, notionDbId } = req.body;

  try {
    // 1. Google Calendar Sync
    const tokens = tokenStore[barberId];
    if (tokens) {
      oauth2Client.setCredentials(tokens);
      const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
      await calendar.events.insert({
        calendarId: 'primary',
        requestBody: {
          summary, description,
          start: { dateTime: startDateTime },
          end: { dateTime: endDateTime },
        },
      });
    }

    // 2. Notion Sync (Si pasas el ID)
    if (notionDbId) {
      await notion.pages.create({
        parent: { database_id: notionDbId },
        properties: {
          'Cliente': { title: [{ text: { content: customerName } }] },
          'Servicio': { rich_text: [{ text: { content: serviceName } }] },
          'Fecha': { date: { start: startDateTime } },
          'BarberID': { select: { name: barberId } }
        }
      });
    }

    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => console.log(`🚀 Backend Notion listo en puerto ${port}`));
