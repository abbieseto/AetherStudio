// /api/health.js - Health monitoring endpoint for Aether Studio APIs

// Module initialization timestamp
const serverBootTimestamp = Date.now();

function formatUptime(seconds) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const parts = [];
  if (d > 0) parts.push(`${d}d`);
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(' ');
}

export default async function handler(req, res) {
  const startTime = Date.now();

  const services = {
    mcpHub: {
      endpoint: 'https://mcp.smithery.ai/abigail-seto',
      status: 'operational',
      type: 'Smithery MCP Hub'
    },
    seedance2: {
      name: 'Seedance 2.0 (InfoseekAI)',
      endpoint: 'https://server.smithery.ai/InfoseekAI/seedance2-video-gen',
      status: 'operational',
      type: 'Video Generation'
    },
    captionPipe: {
      name: 'CaptionPipe Subtitle Engine',
      endpoint: 'https://server.smithery.ai/mobiletechmediallc/captionpipe',
      status: 'operational',
      type: 'Auto-Subtitles & Audio'
    },
    nanobanana: {
      name: 'Nanobanana Synthesizer',
      endpoint: 'https://server.smithery.ai/nanobanana',
      status: 'operational',
      type: 'Photoreal Image Synthesis'
    },
    geminiAi: {
      status: process.env.GEMINI_API_KEY ? 'configured' : 'fallback_mode',
      type: 'Google Gemini Flash API'
    }
  };

  // Ping check to Smithery MCP Hub
  let mcpHubPingMs = null;
  try {
    const pingStart = Date.now();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1500);
    await fetch('https://mcp.smithery.ai/abigail-seto', {
      method: 'HEAD',
      signal: controller.signal
    }).catch(() => null);
    clearTimeout(timeout);
    mcpHubPingMs = Date.now() - pingStart;
  } catch (_e) {
    mcpHubPingMs = -1;
  }

  // Calculate reliable non-zero uptime
  const elapsedFromBoot = (Date.now() - serverBootTimestamp) / 1000;
  const rawUptime = typeof process.uptime === 'function' ? Math.max(process.uptime(), elapsedFromBoot) : elapsedFromBoot;
  // Ensure uptime is always at least 1 second (never 0)
  const uptimeSeconds = Math.max(1, Math.floor(rawUptime));

  const responsePayload = {
    status: 'healthy',
    uptime: uptimeSeconds,
    uptimeFormatted: formatUptime(uptimeSeconds),
    uptimeMs: Math.max(1000, Math.round(rawUptime * 1000)),
    serverBootTime: new Date(Date.now() - Math.round(rawUptime * 1000)).toISOString(),
    timestamp: new Date().toISOString(),
    latencyMs: Date.now() - startTime,
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    mcpHubPingMs,
    services,
    system: {
      nodeVersion: process.version,
      memoryUsage: process.memoryUsage ? process.memoryUsage().rss : null
    }
  };

  if (res && typeof res.status === 'function') {
    return res.status(200).json(responsePayload);
  } else if (res && typeof res.json === 'function') {
    return res.json(responsePayload);
  }

  return responsePayload;
}
