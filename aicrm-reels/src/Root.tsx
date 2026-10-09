import { Composition } from "remotion";
import { DAVOMIYLIK, FPS, H, W } from "./brend";
import { Reels } from "./Reels";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Reels"
    component={Reels}
    durationInFrames={DAVOMIYLIK}
    fps={FPS}
    width={W}
    height={H}
  />
);
