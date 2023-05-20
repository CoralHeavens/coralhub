import Background from "../components/Background";
import Header from "../components/Header";
import AppWrapper from "../components/AppWrapper";
import Slider from "../components/Slider";
import PlayerCard from "../components/PlayerCard";
import {ClientOnly} from "remix-utils";
import Spinner from "../components/Spinner";
import {RedoOfHealerLinks} from "../constants/RedoOfHealerLinks";

export const meta = () => {
  return [{ title: "Coral Hub" }];
};

export default function Index() {
    const items = RedoOfHealerLinks.map((link, index) => (
        <PlayerCard url={link} />
    ))

    return (
      <>
          <Background />
          <AppWrapper>
              <ClientOnly fallback={<Spinner />}>
                  {() => <Slider items={items} saveKey={'sliderFocus'} />}
              </ClientOnly>
          </AppWrapper>
      </>
  );
}
