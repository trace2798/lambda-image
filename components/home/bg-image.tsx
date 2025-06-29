"use client";

import { useWindowSize } from "@uidotdev/usehooks";

const BgImage = ({}) => {
  const size = useWindowSize();
  return (
    <>
      <img
        // src={`https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/image/qgGrRlgAtNYML3DLuez08/AO8uzgsAOttsUxZS5qTTX/w=${size.width},h=${size.height}`}
        // src={`https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/image/qgGrRlgAtNYML3DLuez08/ITWJAq_itaY1BESIngz7_/w=${size.width},h=${size.height}`}
        // src={`https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/image/qgGrRlgAtNYML3DLuez08/hSRZ79XDWJxgjq2YGm13W/w=${size.width},h=${size.height}`}
        src={`https://y0roytbax0.execute-api.ap-south-1.amazonaws.com/dev/image/qgGrRlgAtNYML3DLuez08/LFxLWRpo8CSp39hcp5nlJ/w=${size.width},h=${size.height}`}
        alt="The image depicts a breathtaking celestial scene, with vibrant purple and blue lightning illuminating the dark sky. The clouds are a deep, rich purple hue, while the lightning bolts radiate in bright, electric purple and blue tones. Against this dramatic backdrop, a multitude of stars twinkle like diamonds scattered across the velvety blackness of space. The overall effect is one of awe-inspiring beauty, as if the viewer has been transported to a distant realm where the laws of nature are pushed to their limits. The image exudes an otherworldly energy, inviting the viewer to step into its fantastical world and experience the raw power of the universe."
        className="w-full h-full"
      />
    </>
  );
};

export default BgImage;
