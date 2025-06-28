import { Slider } from "../slider";

const HeroMessage = ({}) => {
  return (
    <>
      <div className="flex flex-col w-full max-w-7xl mx-auto px-[5vw] space-y-5 justify-center items-center">
        <div className="flex flex-col justify-center items-center space-y-5 w-full mx-auto backdrop-blur-xs p-5">
          <h1 className="text-3xl md:text-6xl font-bold">
            Image Optimization That Converts
          </h1>
          <h2 className="text-lg text-primary/80">
            Deliver optimized, responsive images instantly. Designed for
            business-critical applications.
          </h2>
        </div>
        <div className="flex flex-col justify-center w-full">
          <Slider
            optimizedImage="https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/image/qgGrRlgAtNYML3DLuez08/PRUCIodOQTxtF0_CnNCGA"
            originalImage="https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/image/qgGrRlgAtNYML3DLuez08/PRUCIodOQTxtF0_CnNCGA/og"
          />
          <div className="mt-5">
            <div className="flex justify-between w-full max-w-3xl mx-auto">
              <div className="flex flex-col">
                <p className="text-sm">0.06 mb</p>
                <p className="text-xs text-primary/80">Optimized</p>
              </div>
              <div className="flex flex-col text-center">
                <p className="text-base md:text-lg text-green-400">
                  0.14 MB (71.2%)
                </p>
                <p className="text-xs text-primary/80">Size Reduction</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm">0.20 mb</p>
                <p className="text-xs text-primary/80">Original</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroMessage;
