const CardObjetivo = ({ image, titulo, subTitulo, descricao }) => {
    return (
        <div className="flex flex-col max-[1024px]:flex-row w-[400px] h-[500px] border-[#15171b46] border-2 gap-4 text-center rounded-[6px] max-[1350px]:w-[340px] max-[1350px]:h-[450px] max-[1150px]:w-[300px] max-[1150px]:h-[440px] max-[1025px]:w-[800px] max-[1025px]:h-[400px] max-[850px]:w-[650px] max-[850px]:h-[380px] max-[700px]:w-[550px] max-[700px]:h-[280px] max-[580px]:w-[390px] max-[580px]:h-[230px] max-[420px]:w-[320px] max-[420px]:h-[180px]">
            <img src={image} alt="Card" className="w-full h-full object-cover max-[1350px]:w-[340px] max-[1025px]:h-[172px] max-[700px]:w-[230px] max-[700px]:h-[150px] max-[850px]:gap-1 max-[580px]:w-[200px] max-[580px]:h-[140px] max-[420px]:w-[150px] max-[420px]:h-[130px]" />
            <div className="flex m-5 max-[700px]:m-2 max-[580px]:m-1 max-[420px]:m-1 max-[420px]:gap-[1px]">
                <div className="flex flex-col gap-4 max-[1024px]:gap-2 max-[850px]:gap-1 max-[420px]:gap-[2px]">
                    <p className="text-[20px] font-bold text-start max-[1350px]:text-[18px] max-[850px]:text-[16px] max-[580px]:text-[15px]">{titulo}</p>
                    <p className="text-[16px] text-start max-[1350px]:text-[13px] max-[850px]:text-[12.5px] max-[580px]:text-[12px]">
                        {subTitulo}
                        <span className="max-[580px]:hidden">
                            {descricao}        
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CardObjetivo;
