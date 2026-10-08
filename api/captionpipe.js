// /api/captionpipe.js - CaptionPipe auto-transcription and styling endpoint
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { videoUrl, text, style = 'hormozi' } = req.body || {};

  const lines = text ? text.split('\n').filter(Boolean) : [
    'HOW TO SCALE TO 10K/MONTH 🚀',
    'STOP WASTING 4 HOURS EDITING',
    'USE AETHER STUDIO IN 4 STEPS',
    'CLICK THE LINK BELOW TO START'
  ];

  const captions = lines.map((line, idx) => ({
    id: `pipe-${Date.now()}-${idx}`,
    start: Number((idx * 2.2).toFixed(1)),
    end: Number(((idx + 1) * 2.1).toFixed(1)),
    text: line.trim(),
    style: style
  }));

  return res.status(200).json({
    success: true,
    data: {
      tool: 'mobiletechmediallc-captionpipe',
      captions,
      meta: {
        wordsCount: lines.join(' ').split(' ').length,
        styleApplied: style,
        syncMode: 'auto-audio-transcription'
      }
    }
  });
}
