import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import PrimaryButton from "../../ui/PrimaryButton/PrimaryButton.jsx";
import { optionsSchema } from "../../logic/optionsSchema.js";

function SettingsScreen({ initialOptions, onSave, onBack }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialOptions,
    resolver: yupResolver(optionsSchema),
    mode: "onSubmit",
  });

  const submit = (data) => {
    onSave({
      playerName: data.playerName.trim(),
      speedMs: Number(data.speedMs),
      soundOn: Boolean(data.soundOn),
    });
    onBack();
  };

  return (
    <div style={{ maxWidth: 520, margin: "0 auto", padding: 16 }}>
      <h2>Settings</h2>

      <form onSubmit={handleSubmit(submit)} style={{ display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span>Player name</span>
          <input
            {...register("playerName")}
            placeholder="e.g. Alex"
            style={{ padding: 8 }}
          />
          {errors.playerName && (
            <span style={{ color: "crimson" }}>{errors.playerName.message}</span>
          )}
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Speed (ms)</span>
          <input
            {...register("speedMs")}
            type="number"
            step="50"
            style={{ padding: 8 }}
          />
          {errors.speedMs && (
            <span style={{ color: "crimson" }}>{errors.speedMs.message}</span>
          )}
        </label>

        <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input type="checkbox" {...register("soundOn")} />
          <span>Sound</span>
        </label>

        <div style={{ display: "flex", gap: 10 }}>
          <PrimaryButton type="submit" disabled={isSubmitting}>
            Save
          </PrimaryButton>

          <button type="button" onClick={onBack}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default SettingsScreen;
