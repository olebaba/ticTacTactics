import React, { ReactElement } from "react";
import Select, { StylesConfig } from "react-select";

export class GameMode {
    value: number;
    label: string;

    constructor(value: number, label: string) {
        this.value = value;
        this.label = label;
    }

    static isGameMode(object: any): boolean {
        return (
            object &&
            typeof object === "object" &&
            "value" in object &&
            "label" in object
        );
    }
}
interface SelectGameProps {
    currentGameMode: GameMode;
    labelId: string;
    onGameModeChange: (gameMode: GameMode) => void;
}

export default function SelectGame({
    currentGameMode,
    onGameModeChange,
}: SelectGameProps): ReactElement {
    const selectCommonStyles = {
        width: "50vw",
        margin: "auto",
        cursor: "pointer",
    };
    const selectStyle: StylesConfig = {
        menu: (styles) => {
            return {
                ...styles,
                ...selectCommonStyles,
            };
        },
        container: (styles) => {
            return {
                ...styles,
                ...selectCommonStyles,
            };
        },
        control: (styles) => {
            return {
                ...styles,
                ...selectCommonStyles,
            };
        },
        option: (styles) => {
            return {
                ...styles,
                ...selectCommonStyles,
                // backgroundColor: "#bfc0c0ff",
                // ":hover": {
                //     backgroundColor: "#ef8354ff",
                // },
            };
        },
    };

    const gameModes: GameMode[] = [
        { value: 0, label: "Simple" },
        { value: 1, label: "Advanced" },
    ];

    const changeGameMode = (gameMode: any) => {
        if (GameMode.isGameMode(gameMode)) {
            const newGameMode: GameMode = {
                value: gameMode.value,
                label: gameMode.label,
            };
            onGameModeChange(newGameMode);
        }
    };

    return (
        <>
            <label id="gameModeLabel" htmlFor="gameModeSelector">
                <h2>Choose game mode</h2>
            </label>
            <Select
                styles={selectStyle}
                defaultValue={currentGameMode}
                options={gameModes}
                onChange={(newValue) => changeGameMode(newValue)}
                aria-labelledby="gameModeLabel"
                isSearchable={false}
                inputId="gameModeSelector"
            />
        </>
    );
}
