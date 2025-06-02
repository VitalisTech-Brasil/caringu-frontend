import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Label from "../../components/Utils/Label";
import InputPosLogin from "../../components/Utils/InputPosLogin";
import ButtonInterno from "../../components/Utils/Button";

const perguntas = [
  { id: 'fumante', label: 'É fumante?' },
  { id: 'dorArticulacao', label: 'Dor ou desconforto em alguma articulação?', placeholder: "Descreva a dor ou desconforto" },
  { id: 'lesao', label: 'Possui alguma lesão?', placeholder: "Descreva a lesão" },
  { id: 'experienciaMusculacao', label: 'Possui experiência com musculação?', placeholder: "Descreva a sua experiência com musculação" },
  { id: 'pinosPlacasProteses', label: 'Possui pinos, placas ou próteses?', placeholder: "Descreva os pinos, placas ou próteses" },
  { id: 'doencaMetabolica', label: 'Possui alguma doença metabólica?', placeholder: "Descreva a(s) doenças metabólicas" },
  { id: 'deficiencia', label: 'Possui alguma deficiência?', placeholder: "Descreva a deficiência" },
];

const FormularioAnamnese = ({ aluno, onSubmit, respostasBack, onCancelar }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (aluno && respostasBack) {
      const valores = {
        peso: aluno.peso || '',
        altura: aluno.altura || '',
        objetivo: aluno.objetivoTreino || '',
        frequencia: aluno.frequenciaTreino || '',
        nivelAtividade: aluno.nivelAtividade || '',
        nivelExperiencia: aluno.nivelExperiencia || '',
        ...respostasBack
      };
      reset(valores);
    }
  }, [aluno, respostasBack, reset]);

  return (
    <form className="overflow-y-auto max-h-full pb-5 flex-1" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mb-4 gap-2">
        {/* Campos padrão */}
        <Label id="peso" nomeLabel="Peso (KG)" />
        <InputPosLogin id="peso" inputType="number" placeholder="Ex.: 60"
          {...register('peso', { required: 'Peso obrigatório', min: 20, max: 300 })}
          isError={!!errors.peso} errorMessage={errors.peso?.message}
        />

        <Label id="altura" nomeLabel="Altura (m)" />
        <InputPosLogin id="altura" inputType="number" placeholder="Ex.: 1.60"
          {...register('altura', { required: 'Altura obrigatória', min: 1, max: 2.5 })}
          isError={!!errors.altura} errorMessage={errors.altura?.message}
        />

        <Label id="objetivo" nomeLabel="Objetivo com o treino" />
        <InputPosLogin id="objetivo" inputType="text" placeholder="Ex.: Saúde"
          {...register('objetivo', { required: 'Objetivo obrigatório', minLength: 3 })}
          isError={!!errors.objetivo} errorMessage={errors.objetivo?.message}
        />

        <Label id="frequencia" nomeLabel="Frequência semanal" />
        <select {...register("frequencia", { required: 'Obrigatório' })}
          className="border-b-2 border-[var(--cor-primaria)] outline-none">
          <option value="">Selecione</option>
          {[1, 2, 3, 4, 5, 6, 7].map((dia) => (
            <option key={dia} value={dia}>{dia}</option>
          ))}
        </select>
        {errors.frequencia && <p className="text-red-500 text-sm">{errors.frequencia.message}</p>}

        <Label id="nivelAtividade" nomeLabel="Nível de atividade atual" />
        <select {...register("nivelAtividade", { required: 'Obrigatório' })}
          className="border-b-2 border-[var(--cor-primaria)] outline-none">
          <option value="">Selecione</option>
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
          <option value="">Selecione</option>
          <option value="INICIANTE">Iniciante</option>
          <option value="INTERMEDIARIO">Intermediário</option>
          <option value="AVANCADO">Avançado</option>
        </select>
        {errors.nivelExperiencia && <p className="text-red-500 text-sm">{errors.nivelExperiencia.message}</p>}
      </div>

      {/* Perguntas com radios */}
      <div className="flex flex-col gap-4 mt-6">
        {perguntas.map((pergunta) => (
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
            {errors[pergunta.id] && <span className="text-[#D45C56] text-sm mt-1">{errors[pergunta.id]?.message}</span>}
            {pergunta.placeholder && (
              <input type="text" placeholder={pergunta.placeholder} className="mt-3 p-2 border-b-2 outline-none"
                {...register(`${pergunta.id}Descricao`, { required: false })}
              />
            )}
          </div>
        ))}
      </div>

      {/* Botões */}
      <div className="flex justify-center gap-4 mt-6">
        <ButtonInterno texto="Cancelar" corTexto="#B41F1F" cor="var(--cor-secundaria)" width="13rem" onClick={onCancelar} />
        <ButtonInterno texto="Salvar" corTexto="white" cor="#46982B" width="9rem" type="submit" />
      </div>
    </form>
  );
};

export default FormularioAnamnese;