import React from "react";

const Label = ({
    id,
    nomeLabel,
    fontSize,
    fonrWeight
}) => {
    return(
        <>
        <label htmlFor={id} className="text-[var(--cor-primaria)]"
        style={{
            fontSize: fontSize,
            fontWeight: fonrWeight}}>
            {nomeLabel}
        </label>
        </>
    );
}

export default Label;