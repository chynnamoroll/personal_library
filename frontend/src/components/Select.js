export default function Select({ id, value, onChange, children, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="plib-select-native w-full cursor-pointer appearance-none rounded-lg border border-(--plib-border) bg-transparent py-2.5 pl-4 pr-9 text-[13.5px] font-medium outline-none"
        style={{ background: 'var(--plib-surface)', color: 'var(--plib-text)' }}
      >
        {children}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--plib-text-muted)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}
