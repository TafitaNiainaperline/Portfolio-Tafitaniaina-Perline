import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const file = await readFile(path.join(process.cwd(), 'public', 'CV_Perline.pdf'))
    return new Response(new Uint8Array(file), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="CV-Perline.pdf"',
        'Content-Length': String(file.byteLength),
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch {
    return Response.json(
      { error: 'Le CV est momentanément indisponible. Réessayez plus tard.' },
      { status: 503 }
    )
  }
}
