import Background from "./components/Background";
import AppWrapper from "./components/AppWrapper";
import Slider from "./components/Slider";
import PlayerCard from "./components/PlayerCard";
import {RedoOfHealerLinks} from "./constants/RedoOfHealerLinks";

const title = 'RedoOfHealer-UA'

export default function App() {
  const items = RedoOfHealerLinks.map((link, index) => (
      <PlayerCard url={link} title={title} index={index} />
  ))

  return (
      <>
        <Background />
        <AppWrapper>
          <Slider items={items} saveKey={'sliderFocus'} />
        </AppWrapper>
      </>
  );
}

