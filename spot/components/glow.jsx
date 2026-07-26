export function Glow({ children }) {
  return (
    <div>
        {/* Header */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-pink-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-orange-600/20 blur-3xl" />
      </div>

      <div className="relative z-10 ">
    
      </div>
    </div>
  );
}