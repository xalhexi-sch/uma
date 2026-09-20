export default function RootLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6" role="status" aria-label="Loading content">
      <div className="flex flex-col items-center gap-4 max-w-sm w-full text-center">
        <div className="relative w-12 h-12">
          <div className="w-12 h-12 rounded-full border-4 border-muted animate-pulse" />
          <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        </div>
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          Loading harvest data...
        </p>
      </div>
    </div>
  );
}
