import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Label from "../Label";
import InputAnamnese from "./InputAnamnese";
import ButtonInterno from "../Button";
import info2 from '../../../assets/images/info-2.svg';

const FormularioAnamnese = ({ aluno, onSubmit, respostasBack, onCancelar }) => {

  const perguntas = [
    { id: 'fumante', label: 'É fumante?' },
    { id: 'desconforto', label: 'Dor ou desconforto em alguma articulação?', placeholder: "Descreva a dor ou desconforto" },
    { id: 'lesao', label: 'Possui alguma lesão?', placeholder: "Descreva a lesão" },
    { id: 'experiencia', label: 'Possui experiência com musculação?', placeholder: "Descreva a sua experiência com musculação" },
    { id: 'proteses', label: 'Possui pinos, placas ou próteses?', placeholder: "Descreva os pinos, placas ou próteses" },
    { id: 'doencaMetabolica', label: 'Possui alguma doença metabólica?', placeholder: "Descreva a(s) doenças metabólicas" },
    { id: 'deficiencia', label: 'Possui alguma deficiência?', placeholder: "Descreva a deficiência" },
  ];

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    mode: "onChange"
  });

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

        fumante: aluno.fumante === true ? 'true' : aluno.fumante === false ? 'false' : '',
        desconforto: aluno.desconforto === true ? 'true' : aluno.desconforto === false ? 'false' : '',
        lesao: aluno.lesao === true ? 'true' : aluno.lesao === false ? 'false' : '',
        experiencia: aluno.experiencia === true ? 'true' : aluno.experiencia === false ? 'false' : '',
        proteses: aluno.proteses === true ? 'true' : aluno.proteses === false ? 'false' : '',
        doencaMetabolica: aluno.doencaMetabolica === true ? 'true' : aluno.doencaMetabolica === false ? 'false' : '',
        deficiencia: aluno.deficiencia === true ? 'true' : aluno.deficiencia === false ? 'false' : '',

        desconfortoDescricao: aluno.desconfortoDescricao || '',
        lesaoDescricao: aluno.lesaoDescricao || '',
        experienciaDescricao: aluno.experienciaDescricao || '',
        protesesDescricao: aluno.protesesDescricao || '',
        doencaMetabolicaDescricao: aluno.doencaMetabolicaDescricao || '',
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
            <InputAnamnese
              id="peso"
              inputType="number"
              placeholder="Ex.: 60"
              step="any"
              maxLength={3}
              {...register('peso', {
                required: 'Campo Obrigatório',
                min: { value: 20, message: 'Peso mínimo é 20kg' },
                max: { value: 300, message: 'Peso máximo é 300kg' },
                valueAsNumber: true
              })}
              isError={!!errors.peso} errorMessage={errors.peso?.message}
            />

            <Label id="altura" nomeLabel="Altura (m)" />
            <InputAnamnese
              id="altura"
              inputType="number"
              placeholder="Ex.: 1.60"
              step="any"
              {...register('altura', {
                required: 'Campo Obrigatório',
                min: { value: 1, message: 'Altura mínima é 1 metro' },
                max: { value: 2.5, message: 'Altura máxima é 2 metros e meio' },
                valueAsNumber: true
              })}
              isError={!!errors.altura} errorMessage={errors.altura?.message}
            />

            <Label id="objetivo" nomeLabel="Objetivo com o treino" />
            <InputAnamnese
              id="objetivo"
              inputType="text"
              placeholder="Ex.: Saúde"
              {...register('objetivo', { required: 'Campo Obrigatório', minLength: 3 })}
              isError={!!errors.objetivo} errorMessage={errors.objetivo?.message}
            />

            <Label id="frequencia" nomeLabel="Frequência semanal" />
            <select {...register("frequencia", { required: 'Campo Obrigatório' })}
              className="border-b-2 border-[var(--cor-primaria)] outline-none">
              <option value="" disabled={true}>Selecione</option>
              {[1, 2, 3, 4, 5, 6, 7].map((dia) => (
                <option key={dia} value={dia}>{dia}</option>
              ))}
            </select>
            {errors.frequencia && (
              <div className="flex gap-2 items-center">
                <img
                  src={info2}
                  alt="Erro"
                  className="w-4 h-4"
                />
                <p className="text-red-500">{errors.frequencia.message}</p>
              </div>
            )}

            <Label id="nivelAtividade" nomeLabel="Nível de atividade atual" />
            <select {...register("nivelAtividade", { required: 'Campo Obrigatório' })}
              className="border-b-2 border-[var(--cor-primaria)] outline-none">
              <option value="" disabled={true}>Selecione</option>
              <option value="SEDENTARIO">Sedentário</option>
              <option value="LEVEMENTE_ATIVO">Levemente Ativo</option>
              <option value="MODERADAMENTE_ATIVO">Moderadamente Ativo</option>
              <option value="MUITO_ATIVO">Muito Ativo</option>
              <option value="EXTREMAMENTE_ATIVO">Extremamente Ativo</option>
            </select>
            {errors.nivelAtividade && (
              <div className="flex gap-2 items-center">
                <img
                  src={info2}
                  alt="Erro"
                  className="w-4 h-4"
                />
                <p className="text-red-500">{errors.nivelAtividade.message}</p>
              </div>
            )}

            <Label id="nivelExperiencia" nomeLabel="Nível de experiência atual" />
            <select {...register("nivelExperiencia", { required: 'Campo Obrigatório' })}
              className="border-b-2 border-[var(--cor-primaria)] outline-none">
              <option value="" disabled={true}>Selecione</option>
              <option value="INICIANTE">Iniciante</option>
              <option value="INTERMEDIARIO">Intermediário</option>
              <option value="AVANCADO">Avançado</option>
            </select>

            {errors.nivelExperiencia && (
              <div className="flex gap-2 items-center">
                <img
                  src={info2}
                  alt="Erro"
                  className="w-4 h-4"
                />
                <p className="text-red-500">{errors.nivelExperiencia.message}</p>
              </div>
            )}
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
                      <input type="radio" value="true" {...register(pergunta.id, { required: 'Campo Obrigatório' })} />
                      Sim
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" value="false" {...register(pergunta.id, { required: 'Campo Obrigatório' })} />
                      Não
                    </label>
                  </div>

                  {errors[pergunta.id] && (
                    <div className="flex gap-2 items-center">
                      <img
                        src={info2}
                        alt="Erro"
                        className="w-4 h-4"
                      />
                      <span className="text-[#D45C56] mt-1">{errors[pergunta.id]?.message}</span>
                    </div>
                  )}
                  {pergunta.placeholder && respostaSelecionada && (
                    <input
                      type="text"
                      placeholder={pergunta.placeholder}
                      className="mt-3 p-2 border-b-2 outline-none"
                      {...register(`${pergunta.id}Descricao`, {
                        validate: (value) =>
                          respostaSelecionada ? (value?.trim() ? true : 'Campo obrigatório') : true
                      })}
                    />
                  )}
                  {errors[`${pergunta.id}Descricao`] && (
                    <div className="flex gap-2 items-center">
                      <img
                        src={info2}
                        alt="Erro"
                        className="w-4 h-4"
                      />
                      <span className="text-[#D45C56] mt-1">{errors[`${pergunta.id}Descricao`]?.message}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Botões fixos no fim */}
        <div className="flex justify-center gap-4 bg-[var(--cor-secundaria)] pt-4 pb-6 sticky bottom-0 z-20 ">
          <ButtonInterno
            texto="Cancelar"
            corTexto="var(--cor-secundaria)"
            cor="#B41F1F"
            height="2.75rem"
            width="13.25rem"
            fontWeight="500"
            aria-label="Botão de Cancelar"
            type="button"
            onClick={() => onCancelar(true)}
          />
          <ButtonInterno
            texto="Salvar"
            corTexto="var(--cor-secundaria)"
            cor="#46982B"
            height="2.75rem"
            width="9.2rem"
            fontWeight="600"
            aria-label={"Botão de Salvar"}
          />
        </div>
      </form >
    </div >
  );
};

export default FormularioAnamnese;