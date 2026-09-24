import { promises as fs } from 'fs';
import path from 'path';

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']);
const priorityRecentFiles = ['lounga.png', 'succi.jpg', 'mochoco.jpg', 'kokies.png', 'saja.png'];
const recentTitleOverrides: Record<string, string> = {
  'lounga.png': 'Exposition Regards Croisés',
  'succi.jpg': 'Lavesol : Shield & Cleans',
  'mochoco.jpg': 'MooChoco',
  'kokies.png': 'Coockies',
};

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const files = await fs.readdir(publicDir, { withFileTypes: true });

    const images = files
      .filter((entry) => entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase()))
      .map((entry) => ({
        id: entry.name,
        title: recentTitleOverrides[entry.name] || entry.name.replace(/\.[^/.]+$/, '').replace(/[_-]+/g, ' '),
        category: 'Recent Work',
        image: `/${encodeURIComponent(entry.name)}`,
      }))
      .sort((a, b) => {
        const priorityA = priorityRecentFiles.indexOf(a.id);
        const priorityB = priorityRecentFiles.indexOf(b.id);

        if (priorityA !== -1 || priorityB !== -1) {
          if (priorityA === -1) return 1;
          if (priorityB === -1) return -1;
          return priorityA - priorityB;
        }

        return a.title.localeCompare(b.title);
      });

    return Response.json(images.slice(0, 8));
  } catch (error) {
    return Response.json([], { status: 500 });
  }
}
