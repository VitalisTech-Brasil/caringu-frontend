import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Label from "../../components/Utils/Label";
import InputAnamnese from "../../pages/GerenciarAlunos/InputAnamnese";
import ButtonInterno from "../../components/Utils/Button";

const FormularioAnamnese = ({ aluno, onSubmit, respostasBack, onCancelar }) => {

  const perguntas = [
    { id: 'fumante', label: 'É fumante?' },
    { id: 'dorArticulacao', label: 'Dor ou desconforto em alguma articulação?', placeholder: "Descreva a dor ou desconforto" },
    { id: 'lesao', label: 'Possui alguma lesão?', placeholder: "Descreva a lesão" },
    { id: 'experienciaMusculacao', label: 'Possui experiência com musculação?', placeholder: "Descreva a sua experiência com musculação" },
    { id: 'pinosPlacasProteses', label: 'Possui pinos, placas ou próteses?', placeholder: "Descreva os pinos, placas ou próteses" },
    { id: 'doencaMetabolica', label: 'Possui alguma doença metabólica?', placeholder: "Descreva a(s) doenças metabólicas" },
    { id: 'deficiencia', label: 'Possui alguma deficiência?', placeholder: "Descreva a deficiência" },
  ];

  const [modalConfirmarCancelarVisivel, setModalConfirmarCancelarVisivel] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm();

  const respostas = watch();

  useEffect(() => {
    if (aluno && respostasBack) {
      const valores = {
        peso: aluno.peso || '',
        altura: aluno.altura || '',
        objetivo: aluno.objetivoTreino || '',
        frequencia: aluno.frequenciaTreino || '',
        nivelAtividade: aluno.nivelAtividade || '',
        nivelExperiencia: aluno.nivelExperiencia || '',

        fumante: aluno.fumante || '',
        desconforto: aluno.desconforto || '',
        desconfortoDescricao: aluno.desconfortoDescricao || '',
        lesao: aluno.lesao || '',
        experiencia: aluno.experiencia || '',
        experienciaDescricao: aluno.experienciaDescricao || '',
        proteses: aluno.proteses || '',
        protesesDescricao: aluno.protesesDescricao || '',
        doencaMetabolica: aluno.doencaMetabolica || '',
        doencaMetabolicaDescricao: aluno.doencaMetabolicaDescricao || '',
        deficiencia: aluno.deficiencia || '',
        deficienciaDescricao: aluno.deficienciaDescricao || '',


        ...respostasBack
      };
      reset(valores);
    }
  }, [aluno, respostasBack, reset]);

  return (
    <div className="flex flex-col overflow-y-auto max-h-full"> {/* Container principal de altura cheia */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1">

        {/* Conteúdo com scroll */}
        <div className="overflow-y-auto h-full flex-1 pr-2">
          <div className="flex flex-col overflow-y-auto mb-4 gap-2">
            {/* Campos padrão */}
            <Label id="peso" nomeLabel="Peso (KG)" />
            <InputAnamnese id="peso" inputType="text" placeholder="Ex.: 60" maxLength={3}
              {...register('peso', { required: 'Peso obrigatório', min: 20, max: 300 })}
              isError={!!errors.peso} errorMessage={errors.peso?.message}
            />

            <Label id="altura" nomeLabel="Altura (m)" />
            <InputAnamnese id="altura" inputType="number" placeholder="Ex.: 1.60"
              {...register('altura', { required: 'Altura obrigatória', min: 1, max: 2.5 })}
              isError={!!errors.altura} errorMessage={errors.altura?.message}
            />

            <Label id="objetivo" nomeLabel="Objetivo com o treino" />
            <InputAnamnese
              id="objetivo"
              inputType="text"
              placeholder="Ex.: Saúde"
              className="w-full pb-1 pt-2 border-[#333] border-solid border-b-2 p-0 bg-transparent shadow-none outline-none peer text-[var(--cor-primaria)] placeholder:text-[#15171B87]"
              {...register('objetivo', { required: 'Objetivo obrigatório', minLength: 3 })}
              isError={!!errors.objetivo} errorMessage={errors.objetivo?.message}
            />

            <Label id="frequencia" nomeLabel="Frequência semanal" />
            <select {...register("frequencia", { required: 'Obrigatório' })}
              className="border-b-2 border-[var(--cor-primaria)] outline-none">
              <option value="" disabled={true}>Selecione</option>
              {[1, 2, 3, 4, 5, 6, 7].map((dia) => (
                <option key={dia} value={dia}>{dia}</option>
              ))}
            </select>
            {errors.frequencia && <p className="text-red-500 text-sm">{errors.frequencia.message}</p>}

            <Label id="nivelAtividade" nomeLabel="Nível de atividade atual" />
            <select {...register("nivelAtividade", { required: 'Obrigatório' })}
              className="border-b-2 border-[var(--cor-primaria)] outline-none">
              <option value="" disabled={true}>Selecione</option>
              <option value="SEDENTARIO">Sedentário</option>
              <option value="LEVEMENTE_ATIVO">Levemente Ativo</option>
              <option value="MODERADAMENTE_ATIVO">Moderadamente Ativo</option>
              <option value="MUITO_ATIVO">Muito Ativo</option>
              <option value="EXTREMAMENTE_ATIVO">Extremamente Ativo</option>
            </select>
            {errors.nivelAtividade && <p className="text-red-500 text-sm">{errors.nivelAtividade.message}</p>}

            <Label id="nivelExperiencia" nomeLabel="Nível de experiência atual" />
            <select {...register("nivelExperiencia", { required: 'Obrigatório' })}
              className="border-b-2 border-[var(--cor-primaria)] outline-none">
              <option value="" disabled={true}>Selecione</option>
              <option value="INICIANTE">Iniciante</option>
              <option value="INTERMEDIARIO">Intermediário</option>
              <option value="AVANCADO">Avançado</option>
            </select>
            {errors.nivelExperiencia && <p className="text-red-500 text-sm">{errors.nivelExperiencia.message}</p>}
          </div>

          {/* Perguntas com radios */}
          <div className="flex flex-col gap-4 mt-6">
            {perguntas.map((pergunta) => {

              const respostaSelecionada = respostas[pergunta.id] === 'true';

              return (
                <div key={pergunta.id} className="flex flex-col">
                  <label className="text-[18px] font-medium mb-2" htmlFor={pergunta.id}>{pergunta.label}</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input type="radio" value="true" {...register(pergunta.id, { required: 'Campo obrigatório' })} />
                      Sim
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" value="false" {...register(pergunta.id, { required: 'Campo obrigatório' })} />
                      Não
                    </label>
                  </div>
                  {errors[pergunta.id] && (
                    <span className="text-[#D45C56] text-sm mt-1">{errors[pergunta.id]?.message}</span>
                  )}
                  {pergunta.placeholder && respostaSelecionada && (
                    <input
                      type="text"
                      placeholder={pergunta.placeholder}
                      className="mt-3 p-2 border-b-2 outline-none"
                      {...register(`${pergunta.id}Descricao`, { required: false })}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Botões fixos no fim */}
        <div className="flex justify-center gap-4 bg-white pt-4 pb-6 sticky bottom-0 z-20 shadow-[0_-2px_10px_-2px_rgba(0,0,0,0.1)]">
          <ButtonInterno
            texto="Cancelar"
            corTexto="#B41F1F"
            cor="var(--cor-secundaria)"
            height="2.75rem"
            width="13.25rem"
            corHover="#1D2D4417"
            fontWeight="500"
            aria-label={"Botão de Cancelar"}
            onClick={() => setModalConfirmarCancelarVisivel(true)}
          />
          <ButtonInterno
            texto="Salvar"
            corTexto="var(--cor-secundaria)"
            cor="#46982B"
            height="2.75rem"
            width="9.2rem"
            corHover="#46982BE5"
            fontWeight="600"
            aria-label={"Botão de Salvar"}
          />
        </div>
      </form>
    </div>
  );
};

export default FormularioAnamnese;