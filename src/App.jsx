import Background from "./components/Background";
import AppWrapper from "./components/AppWrapper";
import Slider from "./components/Slider";
import PlayerCard from "./components/PlayerCard";
import { RedoOfHealerLinks } from "./constants/RedoOfHealerLinks";
import {useState} from "react";
import {load} from "./helpers/localStorage";
import {EPISODE_SAVE_KEY} from "./constants/globals";
import 'react-dropdown/style.css';
import CustomDropdown from "./components/CustomDropdown";

export default function App() {
    const items = RedoOfHealerLinks.map(({url, title}, index) => (
      {
          label: title,
          item: <PlayerCard url={url} title={title} index={index} />,
      }
    ))
    const [focusedEp, updateFocusedEp] = useState(load(EPISODE_SAVE_KEY) ?? 0)

    return (
      <>
        <Background />
        <AppWrapper>
            <CustomDropdown
                options={items.map(({label}, index) => (
                    {
                        label,
                        value: index
                    }
                ))}
                value={items[focusedEp].label}
                onSelect={(value) => updateFocusedEp(value)}
            />
            <Slider
                items={items}
                focus={focusedEp}
                updateFocus={(value) => updateFocusedEp(value)}
            />
        </AppWrapper>
      </>
);
}

