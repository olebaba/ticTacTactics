import React, { ReactElement } from "react"
import Select, { StylesConfig } from "react-select"

export default function SelectGame(): ReactElement{
    const selectCommonStyles = {
        width: '50vw',
        margin: 'auto',
        cursor: 'pointer'
    }
    const selectStyle: StylesConfig = {
        menu: (styles) => {
            return {
                ...styles,
                ...selectCommonStyles
            }
        },
        container: (styles) => {
            return {
                ...styles,
                ...selectCommonStyles
            }
        },
        control: (styles) => {
            return {
                ...styles,
                ...selectCommonStyles,
            }
        },
        option: (styles) => {
            return {
                ...styles,
                ...selectCommonStyles,
                backgroundColor: '#bfc0c0ff',
                ':hover': {
                    backgroundColor: '#ef8354ff'
                }
            }
        },
    }

    const gameModes = [{value: 0, label:'Simple'}, {value: 1, label:'Advanced'}];

    

    return (
        <>
            <Select styles={selectStyle} defaultValue={gameModes[0]} options={gameModes} />
        </>
    )
}