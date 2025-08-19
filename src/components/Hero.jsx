export default function Hero() {
  return (
    <div 
    className="relative rounded-2xl overflow-hidden h-[480px] w-full">
      <img
        src="/src/assets/sawah2.jpeg"
        alt="hero"
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="relative inset-0 bg-gradient-to-t flex items-end p-6">
        <h1 className="text-3xl md:text-4xl font-light text-white mt-[180px] ml-[68px] space-y-1 leading-snug">
          Your <span className="text-bright-yellow">creative</span> 
          <div>
            <p className="text-bright-yellow font-light">Journey <span className="text-white">starts</span> here</p> 
          </div>
        </h1>
      </div>
    </div>
  );
}
