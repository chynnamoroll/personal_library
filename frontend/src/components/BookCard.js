export default function BookCard({ title, author, category, onDelete }) {
  return (
    <div
      className="plib-card relative flex flex-col gap-4 overflow-hidden rounded-[10px] border border-(--plib-border-soft) p-5"
      style={{ background: 'var(--plib-surface)' }}
    >
      <div
        className="absolute right-0 top-0 h-0 w-0"
        style={{ borderStyle: 'solid', borderWidth: '0 24px 24px 0', borderColor: 'transparent var(--plib-fold) transparent transparent' }}
      />

      <div className="flex items-start justify-between">
        <span
          className="inline-block -rotate-2 rounded-md border border-dashed border-(--plib-stamp-border) px-[11px] py-[4px] text-[11.5px] font-bold tracking-wide"
          style={{ color: 'var(--plib-accent)', background: 'var(--plib-stamp-bg)' }}
        >
          {category}
        </span>
        <button
          type="button"
          aria-label="ลบหนังสือ"
          onClick={onDelete}
          className="plib-icon-btn flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-lg"
          style={{ color: 'var(--plib-text-muted)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7h16" />
            <path d="M9 7V4.8c0-.44.36-.8.8-.8h4.4c.44 0 .8.36.8.8V7" />
            <path d="M6.5 7l.7 12.2c.03.5.45.8.95.8h7.7c.5 0 .92-.3.95-.8L18.5 7" />
            <path d="M10 11v6M14 11v6" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="plib-serif text-[17px] font-semibold leading-snug" style={{ color: 'var(--plib-text)' }}>
          {title}
        </h3>
        <span className="text-[13.5px]" style={{ color: 'var(--plib-text-muted)' }}>
          {author}
        </span>
      </div>
    </div>
  );
}
