import svgPaths from "./svg-dmd4nkycdz";
import imgImageRedeD1000 from "figma:asset/d6754dfbde50ea97a075ec4e9d3e03a86b0264a9.png";

function ImageRedeD() {
  return (
    <div className="h-[170.492px] relative shrink-0 w-[255.997px]" data-name="Image (Rede d1000)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageRedeD1000} />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[191.989px] relative shrink-0 w-[255.997px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ImageRedeD />
      </div>
    </div>
  );
}

function Loader() {
  return (
    <div className="relative size-[31.987px]" data-name="Loader2">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.9867 31.9867">
        <g id="Loader2">
          <path d={svgPaths.pdf560c0} id="Vector" stroke="var(--stroke-0, #0066CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66556" />
        </g>
      </svg>
    </div>
  );
}

function P() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-[122.719px]" data-name="p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Lato:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] top-[0.11px]">Verificando acesso...</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[199.986px] relative shrink-0 w-[122.719px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[10.144px] items-center justify-center pb-[5.866px] relative size-full">
        <div className="flex items-center justify-center relative shrink-0 size-[43.685px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
          <div className="flex-none rotate-[29.95deg]">
            <Loader />
          </div>
        </div>
        <P />
      </div>
    </div>
  );
}

export default function RefatoracaoDoAppConnect() {
  return (
    <div className="bg-[#f7f9fc] content-stretch flex flex-col gap-[31.987px] items-center justify-center relative size-full" data-name="Refatoração do app Connect">
      <Container />
      <Container1 />
    </div>
  );
}