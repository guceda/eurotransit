import theme from "../../src/theme.json";

const useColorSet = (transport) => {
    // keyvalue with all the colors
    let colorSet = {
        background: "black",
        UIAccent: "black",
        disabled: "black"
    }

    const isInDarkMode = () => {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    colorSet.background = isInDarkMode() ? theme.map.background.dark : theme.map.background.light;
    colorSet.UIAccent = (transport == 'plane') ? theme.UI.accent.plane_trips : theme.UI.accent.train_trips;
    colorSet.disabled = (() => {
        if (transport == 'plane') {
            if (isInDarkMode()) {
                return theme.map.plane_trips.disabled_dark;
            }
            else {
                return theme.map.plane_trips.disabled_light;
            }
        }
        else {
            if (isInDarkMode()) {
                return theme.map.train_trips.disabled_dark;
            }
            else {
                return theme.map.train_trips.disabled_light;
            }
        }
    })();

    return colorSet;
}

export default useColorSet;
