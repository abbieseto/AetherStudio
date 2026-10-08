import React, { useState } from 'react';
import {
  Cpu,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  Terminal,
  ShieldCheck,
  Zap,
  Play,
  Copy,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const McpToolboxView: React.FC = () => {
  const { mcpTools, handleGenerate, setWizardStep, setCurrentTab, setPromptText } = useApp();

  const [activeToolId, setActiveToolId] = useState<string>('seedance2-video-gen');
  const [testPrompt, setTestPrompt] = useState<string>(
    'Hyper-kinetic electric hypercar drift shot through neon Tokyo rain, anamorphic lens, 60fps'
  );
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const activeTool = mcpTools.find(t => t.id === activeToolId) || mcpTools[0];

  const handleTestCall = async () => {
    setIsTesting(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/mcp/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolId: activeTool.id,
          prompt: testPrompt,
          aspectRatio: '9:16',
          duration: 6
        })
      });
      const data = await res.json();
      setTestResult(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setTestResult(JSON.stringify({ error: err.message, status: 'offline-fallback' }, null, 2));
    } finally {
      setIsTesting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Top Header */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-mono text-[#8B5CF6] mb-1">
          <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
          <span>MODEL CONTEXT PROTOCOL (MCP) INFRASTRUCTURE</span>
        </div>
        <h2 className="text-2xl font-black text-white font-['Plus_Jakarta_Sans'] tracking-tight">
          MCP Toolbox Hub
        </h2>
        <p className="text-xs text-[#94A3B8] mt-0.5">
          Live connection to <code className="text-[#d0bcff] font-mono">https://mcp.smithery.ai/abigail-seto</code> and registered generative microservices.
        </p>
      </div>

      {/* Hub Banner */}
      <div className="glass-card p-5 rounded-2xl border border-[#8B5CF6]/30 bg-gradient-to-r from-[#1A1824] via-[#121118] to-[#1A1824]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] p-0.5 shrink-0">
              <div className="w-full h-full bg-[#0B0B0F] rounded-[14px] flex items-center justify-center">
                <Cpu className="w-6 h-6 text-[#d0bcff]" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold text-white font-['Plus_Jakarta_Sans']">
                  Smithery MCP Client Endpoint
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] font-mono text-[10px]">
                  Online &amp; Synced
                </span>
              </div>
              <p className="text-xs font-mono text-[#94A3B8] mt-1 select-all break-all">
                https://mcp.smithery.ai/abigail-seto
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => copyToClipboard('https://mcp.smithery.ai/abigail-seto')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#1A1824] border border-white/10 hover:border-[#8B5CF6] text-white text-xs font-bold transition-all cursor-pointer"
            >
              {copiedUrl === 'https://mcp.smithery.ai/abigail-seto' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#94A3B8]" />
                  <span>Copy Hub URL</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3 Registered Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {mcpTools.map(tool => {
          const isSelected = activeToolId === tool.id;
          return (
            <div
              key={tool.id}
              onClick={() => setActiveToolId(tool.id)}
              className={`glass-card p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-[#8B5CF6] ring-1 ring-[#8B5CF6] shadow-[0_0_20px_rgba(139,92,246,0.25)]'
                  : 'border-white/[0.08] hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-[#06B6D4] uppercase font-bold">
                    {tool.type}
                  </span>
                  <span className="flex items-center space-x-1 text-[10px] font-mono text-[#4edea3]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]" />
                    <span>{tool.latencyMs}ms</span>
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mb-1.5 font-['Plus_Jakarta_Sans']">
                  {tool.name}
                </h4>

                <p className="text-[11px] font-mono text-[#94A3B8] break-all mb-3 bg-[#121118] p-2 rounded-lg border border-white/[0.04]">
                  {tool.endpoint}
                </p>

                <div className="space-y-1 mb-4">
                  <span className="text-[10px] font-mono text-[#94A3B8] uppercase block">
                    Capabilities:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {tool.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#1A1824] border border-white/[0.06] text-[#d0bcff]"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-[10px] text-[#94A3B8]">Status: Connected</span>
                <span className="font-bold text-[#8B5CF6]">
                  {isSelected ? 'Selected Inspector' : 'Inspect Tool →'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Tool Live Testing & JSON-RPC Console */}
      <div className="glass-card p-5 rounded-2xl border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-[#06B6D4]" />
            <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
              Tool Live Inspector &amp; Dispatcher: {activeTool.name}
            </h4>
          </div>
          <span className="text-[10px] font-mono text-[#4edea3]">Ready for JSON-RPC</span>
        </div>

        {/* Endpoint details */}
        {activeTool.directEndpoint && (
          <div className="bg-[#121118] p-3 rounded-xl border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono text-[#94A3B8] block">DIRECT SEEDANCE ENDPOINT:</span>
              <span className="text-xs font-mono text-white select-all break-all">
                {activeTool.directEndpoint}
              </span>
            </div>
            <button
              onClick={() => copyToClipboard(activeTool.directEndpoint!)}
              className="px-2.5 py-1 rounded bg-[#1A1824] hover:bg-[#242233] text-[10px] font-mono text-[#94A3B8] hover:text-white shrink-0 cursor-pointer"
            >
              Copy
            </button>
          </div>
        )}

        {/* Test Prompt Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-white font-mono uppercase">
            Test Prompt Payload
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={testPrompt}
              onChange={e => setTestPrompt(e.target.value)}
              className="flex-1 bg-[#121118] text-white text-xs px-3.5 py-2.5 rounded-xl border border-white/[0.08] focus:border-[#8B5CF6] focus:outline-none font-mono"
            />
            <button
              onClick={handleTestCall}
              disabled={isTesting}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#9d71ff] text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(139,92,246,0.35)] cursor-pointer disabled:opacity-50 shrink-0"
            >
              {isTesting ? 'Calling MCP...' : 'Invoke Tool'}
            </button>
          </div>
        </div>

        {/* Response JSON Output */}
        {testResult && (
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#4edea3] font-mono uppercase">
                Tool Output (JSON Response)
              </label>
              <button
                onClick={() => {
                  setPromptText(testPrompt);
                  setCurrentTab('studio');
                  setWizardStep(2);
                }}
                className="text-[11px] font-bold text-[#06B6D4] hover:underline cursor-pointer"
              >
                Send to AI Studio Viewport →
              </button>
            </div>
            <pre className="bg-[#0B0B0F] p-4 rounded-xl border border-white/[0.08] text-[11px] font-mono text-[#d0bcff] overflow-x-auto max-h-60 leading-relaxed">
              {testResult}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
