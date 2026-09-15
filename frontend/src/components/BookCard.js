function hueFromString(value) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) % 360;
  }
  return hash;
}

export default function BookCard({ title, author, category, onDelete }) {
  const hue = hueFromString(category || 'ทั่วไป');

  return (
    <div className="plib-card group relative flex flex-col overflow-hidden rounded-[10px] border border-(--plib-border-soft)">
      <div
        className="absolute inset-y-0 left-0 w-[9px]"
        style={{ background: 'linear-gradient(to right, oklch(0.4 0.11 55), oklch(0.52 0.12 55))' }}
      />

      <div
        className="relative flex flex-1 flex-col items-center justify-center gap-3 py-8 pl-8 pr-6"
        style={{ background: `oklch(0.95 0.03 ${hue})`, minHeight: '190px' }}
      >
        <div
          className="absolute right-0 top-0 h-0 w-0"
          style={{
            borderStyle: 'solid',
            borderWidth: '0 22px 22px 0',
            borderColor: 'transparent var(--plib-fold) transparent transparent',
          }}
        />

        <div className="absolute inset-y-4 right-3 flex gap-[3px] opacity-50">
          <span className="w-[2px] rounded-full" style={{ background: `oklch(0.55 0.04 ${hue})` }} />
          <span className="w-[2px] rounded-full opacity-70" style={{ background: `oklch(0.55 0.04 ${hue})` }} />
        </div>

        <button
          type="button"
          aria-label="ลบหนังสือ"
          onClick={onDelete}
          className="plib-icon-btn absolute right-2.5 top-2.5 flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg opacity-0 transition-opacity group-hover:opacity-100"
          style={{ color: 'var(--plib-text-muted)', background: 'var(--plib-surface)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7h16" />
            <path d="M9 7V4.8c0-.44.36-.8.8-.8h4.4c.44 0 .8.36.8.8V7" />
            <path d="M6.5 7l.7 12.2c.03.5.45.8.95.8h7.7c.5 0 .92-.3.95-.8L18.5 7" />
            <path d="M10 11v6M14 11v6" />
          </svg>
        </button>

        <h3
          className="plib-serif px-2 text-center text-[19px] font-bold leading-snug"
          style={{ color: `oklch(0.32 0.09 ${hue})` }}
        >
          {title}
        </h3>
      </div>

      <div
        className="flex items-center justify-between gap-2 border-t px-4 py-3 pl-8"
        style={{ borderColor: 'var(--plib-border-soft)', background: 'var(--plib-surface)' }}
      >
        <span className="truncate text-[13px]" style={{ color: 'var(--plib-text-muted)' }}>
          {author}
        </span>
        <span
          className="shrink-0 rounded-md border border-dashed px-2 py-[3px] text-[10.5px] font-bold tracking-wide"
          style={{
            color: `oklch(0.4 0.13 ${hue})`,
            borderColor: `oklch(0.5 0.1 ${hue} / 0.5)`,
            background: `oklch(0.97 0.02 ${hue})`,
          }}
        >
          {category}
        </span>
      </div>
    </div>
  );
}
