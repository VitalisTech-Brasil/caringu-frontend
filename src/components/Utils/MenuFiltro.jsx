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

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                onClick={handleToggle}
                className={`flex items-center justify-center w-8 h-8 rounded-[5px] bg-gray-200 hover:bg-gray-300 transition duration-200 ${buttonClass}`}
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
                    className="bg-white border border-gray-200 rounded-md shadow-lg p-2 z-[9999]"
                >
                    <div className="flex flex-col gap-2">
                        {options.map((opt) => {
                            if (opt.type === "dropdown") {
                                return (
                                    <div key={opt.id} className="border-[2px] gap-2 flex items-center p-3 h-[55px]"
                                        style={{
                                            borderColor: "rgba(29, 45, 68, 0.11)",
                                            width: opt.width
                                        }}>
                                        {opt.icon}
                                        <Dropdown label={opt.label} inline>
                                            {opt.items.map((item) => (
                                                <DropdownItem
                                                    key={item.value}
                                                    onClick={() => opt.onSelect(item.value)}
                                                >
                                                    {item.label}
                                                </DropdownItem>
                                            ))}
                                        </Dropdown>
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
                                        cor={opt.active ? "#748CAB" : "#ffffff"}
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
