export default function BookCardSkeleton() {
  return (
    <div
      className="flex flex-col gap-4 rounded-[10px] border border-(--plib-border-soft) p-5"
      style={{ background: 'var(--plib-surface)' }}
    >
      <div className="flex items-start justify-between">
        <div className="plib-skeleton h-[22px] w-[78px] rounded-md" />
        <div className="h-[30px] w-[30px]" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="plib-skeleton h-[18px] w-[82%] rounded-md" />
        <div className="plib-skeleton h-[14px] w-[52%] rounded-md" />
      </div>
    </div>
  );
}
