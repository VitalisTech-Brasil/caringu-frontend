import React from "react";

const Label = ({
    id,
    nomeLabel,
    fontSize,
    fontWeight
}) => {
    return(
        <>
        <label htmlFor={id} className="text-[var(--cor-primaria)]"
        style={{
            fontSize: fontSize,
            fontWeight: fontWeight}}>
            {nomeLabel}
        </label>
        </>
    );
}

export default Label;