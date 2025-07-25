import React, { useRef, useState, useEffect } from "react";
import Botton from "./Button";
import { Dropdown, DropdownItem } from "flowbite-react";

const MenuFiltro = ({
    options = [],
    buttonIcon = null,
    buttonClass = "",
    menuWidth = "200px",
}) => {
    const [open, setOpen] = useState(false);
    const [rect, setRect] = useState(null);
    const buttonRef = useRef(null);
    const labelRefs = useRef({}); // refs por id de dropdown

    const [dynamicWidths, setDynamicWidths] = useState({});

    const handleToggle = (e) => {
        e.stopPropagation();
        const rect = buttonRef.current.getBoundingClientRect();
        setRect(rect);
        setOpen((prev) => !prev);
    };

    const handleClickOutside = (e) => {
        if (buttonRef.current && !buttonRef.current.contains(e.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        if (open) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [open]);

    useEffect(() => {
        const widths = {};
        Object.entries(labelRefs.current).forEach(([id, ref]) => {
            if (ref && ref.offsetWidth) {
                widths[id] = ref.offsetWidth + 60;
            }
        });
        setDynamicWidths(widths);
    }, [options]);

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                onClick={handleToggle}
                className={`flex items-center justify-center w-10 h-10 rounded-[5px]  hover:bg-gray-300 transition duration-200 ${buttonClass}`}
            >
                {buttonIcon}
            </button>

            {open && rect && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        position: "fixed",
                        top: rect.top + rect.height + 8,
                        left: rect.left + rect.width - parseInt(menuWidth),
                        width: menuWidth,
                    }}
                    className=" bg-[var(--cor-secundaria)] border border-gray-200 rounded-md shadow-lg p-2 z-[9999]"
                >
                    <div className="flex flex-col gap-2">
                        {options.map((opt) => {
                            if (opt.type === "dropdown") {
                                const labelText = opt.selected
                                    ? opt.items.find((item) => item.value === opt.selected)?.label
                                    : opt.label;

                                return (
                                    <div
                                        key={opt.id}
                                        className="border-[2px] flex items-center p-3 h-[55px] min-w-[120px] gap-2"
                                        style={{
                                            borderColor: "rgba(29, 45, 68, 0.11)",
                                            width: dynamicWidths[opt.id] || "fit-content",
                                            maxWidth: "100%",
                                        }}
                                    >
                                        <div className="flex-shrink-0">
                                            {opt.icon}
                                        </div>
                                        <div className="flex-grow">
                                            <Dropdown
                                                label={labelText}
                                                inline
                                                className="!w-auto !bg-[var(--cor-secundaria)]"
                                            >
                                                {opt.items.map((item) => (
                                                    <DropdownItem
                                                        className="filter bg-[var(--cor-secundaria)] !text-[var(--cor-primaria)] hover:!bg-gray-200 hover:!text-[var(--cor-primaria)]"
                                                        key={item.value}
                                                        onClick={() => opt.onSelect(item.value)}
                                                    >
                                                        {item.label}
                                                    </DropdownItem>
                                                ))}
                                            </Dropdown>
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <Botton
                                        key={opt.id}
                                        texto={opt.label}
                                        logoSvg={opt.icon}
                                        borderWidth={"2px"}
                                        borderStyle={"solid"}
                                        borderColor={"rgba(29, 45, 68, 0.11)"}
                                        height={"55px"}
                                        width={opt.width || "100%"}
                                        cor={opt.active ? "#748CAB" : "#fffdf6"}
                                        corTexto={opt.active ? "#ffffff" : "#000000"}
                                        onClick={opt.onClick}
                                        classNameExtra={opt.className || ""}
                                    />
                                );
                            }
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuFiltro;