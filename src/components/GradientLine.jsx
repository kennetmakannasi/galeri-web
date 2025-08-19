export default function GradientLine({ className }) {
  return (
    <div
      className={`mx-auto my-4 w-[400px] h-[2px] ${className}`}
      style={{
        background: '#FFD700',
      }}
    ></div>
  );
}
