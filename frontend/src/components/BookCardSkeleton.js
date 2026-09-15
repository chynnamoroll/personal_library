export default function BookCardSkeleton() {
  return (
    <div
      className="relative flex flex-col overflow-hidden rounded-[10px] border border-(--plib-border-soft)"
      style={{ background: 'var(--plib-surface)' }}
    >
      <div className="plib-skeleton absolute inset-y-0 left-0 w-[9px]" />

      <div className="flex flex-1 flex-col items-center justify-center gap-3 py-8 pl-8 pr-6" style={{ minHeight: '190px' }}>
        <div className="plib-skeleton h-5 w-3/4 rounded-md" />
        <div className="plib-skeleton h-5 w-1/2 rounded-md" />
      </div>

      <div
        className="flex items-center justify-between gap-2 border-t px-4 py-3 pl-8"
        style={{ borderColor: 'var(--plib-border-soft)' }}
      >
        <div className="plib-skeleton h-[14px] w-24 rounded-md" />
        <div className="plib-skeleton h-[20px] w-16 rounded-md" />
      </div>
    </div>
  );
}
