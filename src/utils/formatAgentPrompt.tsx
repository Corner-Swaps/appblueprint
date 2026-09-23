import React from 'react';

const promptCache = new Map<string, React.ReactNode>();

/**
 * Renders an AI agent prompt formatted with standard subsection typography,
 * clearly separated by sections and paragraphs. Memoized for high performance.
 */
const CACHE_VERSION = 'v3_standardized_';

export const renderFormattedPrompt = (rawPrompt: string, isDark = false): React.ReactNode => {
  if (!rawPrompt) return null;

  const cacheKey = `${CACHE_VERSION}${isDark ? '1' : '0'}_${rawPrompt}`;
  const cached = promptCache.get(cacheKey);
  if (cached) return cached;

  // Normalize line endings
  const normalized = rawPrompt.replace(/\r\n/g, '\n').trim();

  // Split into primary double-newline chunks
  const rawBlocks = normalized.split(/\n\s*\n/);
  const paragraphs: string[] = [];

  for (const block of rawBlocks) {
    const lines = block.split('\n');
    let currentChunk = '';

    for (const line of lines) {
      // If a line starts with a numbered item (e.g. "1. ", "2. ", "3. ", "4. ") and we already have accumulated lines
      if (/^\s*\d+\.\s+/.test(line) && currentChunk.trim()) {
        paragraphs.push(currentChunk.trim());
        currentChunk = line;
      } else if (
        /^\s*(TASK & OBJECTIVE|SPECIFIC EXECUTION REQUIREMENTS|EXECUTION PROTOCOL FOR THE AGENT|STORE GUIDELINE COMPLIANCE|PREREQUISITES|KEY VERIFICATION RULES):/i.test(line) && 
        currentChunk.trim()
      ) {
        paragraphs.push(currentChunk.trim());
        currentChunk = line;
      } else {
        currentChunk = currentChunk ? `${currentChunk}\n${line}` : line;
      }
    }
    if (currentChunk.trim()) {
      paragraphs.push(currentChunk.trim());
    }
  }

  const result = (
    <div className="space-y-2.5 select-text font-google">
      {paragraphs.map((para, idx) => {
        // 1. Check if paragraph starts with a major section header: e.g. "TASK & OBJECTIVE:" or "SPECIFIC EXECUTION REQUIREMENTS:"
        const headerMatch = para.match(/^(TASK & OBJECTIVE|SPECIFIC EXECUTION REQUIREMENTS|EXECUTION PROTOCOL FOR THE AGENT|STORE GUIDELINE COMPLIANCE|PREREQUISITES|KEY VERIFICATION RULES):?\s*([\s\S]*)$/i);

        if (headerMatch) {
          const headerTitle = headerMatch[1].toUpperCase();
          const rest = headerMatch[2].trim();
          return (
            <div key={idx} className="space-y-1 pt-0.5 font-google">
              <span className={`font-bold uppercase text-[11px] tracking-wider block font-google ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {headerTitle}
              </span>
              {rest && (
                <p className={`leading-relaxed text-[13.5px] sm:text-sm whitespace-pre-line font-google ${
                  isDark ? 'text-white/85' : 'text-slate-700'
                }`}>
                  {rest}
                </p>
              )}
            </div>
          );
        }

        // 2. Check if paragraph starts with a numbered step with a title: e.g. "1. CODEBASE INSPECTION: ..." or "2. IMPLEMENTATION: ..."
        const numberedStepMatch = para.match(/^(\d+\.\s+[^:]+:)\s*([\s\S]*)$/);
        if (numberedStepMatch) {
          return (
            <div key={idx} className="flex items-start space-x-1.5 text-[13.5px] sm:text-sm leading-relaxed font-google">
              <p className={`flex-1 min-w-0 font-google ${isDark ? 'text-white/85' : 'text-slate-700'}`}>
                <span className={`font-bold font-google text-[11.5px] sm:text-xs tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {numberedStepMatch[1]}
                </span>{' '}
                <span className="whitespace-pre-line font-google">{numberedStepMatch[2]}</span>
              </p>
            </div>
          );
        }

        // 3. Numbered step without colon (e.g. "1. Run command...")
        const simpleNumberedMatch = para.match(/^(\d+\.)\s+([\s\S]*)$/);
        if (simpleNumberedMatch) {
          return (
            <div key={idx} className="flex items-start space-x-2 text-[13.5px] sm:text-sm leading-relaxed font-google">
              <span className={`font-bold shrink-0 font-google text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {simpleNumberedMatch[1]}
              </span>
              <p className={`flex-1 min-w-0 whitespace-pre-line font-google ${isDark ? 'text-white/85' : 'text-slate-700'}`}>
                {simpleNumberedMatch[2]}
              </p>
            </div>
          );
        }

        // 4. Standard paragraph (intro role, context, etc.)
        return (
          <p key={idx} className={`leading-relaxed text-[13.5px] sm:text-sm whitespace-pre-line font-google ${
            isDark ? 'text-white/85' : 'text-slate-700'
          }`}>
            {para}
          </p>
        );
      })}
    </div>
  );

  promptCache.set(cacheKey, result);
  return result;
};
